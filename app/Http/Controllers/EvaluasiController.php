<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEvaluasiRequest;
use App\Models\Evaluasi;
use App\Models\Kriteria;
use App\Models\PenugasanPeer;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class EvaluasiController extends Controller
{
    public function card(): Response
    {

        $data = [
            'penugasanPeer' => PenugasanPeer::where('penilai_id', Auth::id())
                ->select(['id', 'outsourcing_id', 'type_penilai', 'status'])
                ->with('outsourcing')
                ->get()
        ];

        return Inertia::render('penilaian/evaluator/page', $data);
    }

    public function create(Request $request): Response | RedirectResponse
    {
        $idPenugasanPeer = $request->idPenugasanPeer;
        $employee = User::select(['id', 'name', 'jabatan', 'image', 'unit_kerja'])->findOrFail($request->idOutsourching);

        //Kalau nama tidak sama dengan nama hasil query berdasarkan id
        if ($employee->name !== $request->nameOutsourching) {
            return redirect()->intended(route('evaluator.card', absolute: false));
        }

        //kalau evalator bukan untuk outcourching
        //if ()

        $kriterias = Kriteria::all();

        $evaluationData = [];

        foreach ($kriterias as $kriteria) {
            $groupKey = Str::slug($kriteria->aspek);

            if (!isset($evaluationData[$groupKey])) {
                $evaluationData[$groupKey] = [
                    'title' => $kriteria->aspek,
                    'criteria' => [],
                ];
            }

            $evaluationData[$groupKey]['criteria'][] = [
                'id' => $kriteria->id,
                'name' => $kriteria->nama,
                'indicators' => $kriteria->indikator,
            ];
        }

        $data = [
            'evaluationData' => $evaluationData,
            'evaluator' => Auth::user(),
            'employee' => $employee,
            'idPenugasanPeer' => $idPenugasanPeer,
        ];

        return Inertia::render('penilaian/evaluator/evaluation-form', $data);
    }

    public function store(StoreEvaluasiRequest $request)
    {
        $validated = $request->validate([
            'penugasan_peer_id' => ['required', 'exists:penugasan_peers,id'],
            'catatan'           => ['nullable', 'string'],
            'nilai'             => ['required', 'array'],
            'nilai.*.kriteria_id' => ['required', 'exists:kriterias,id'],
            'nilai.*.skor'        => ['required', 'integer', 'between:0,100'],
        ]);

        DB::transaction(function () use ($validated) {
            // 1. Update catatan umum di penugasan_peer
            PenugasanPeer::where('id', $validated['penugasan_peer_id'])
                ->update([
                    'catatan' => $validated['catatan'] ?? '',
                    'status' => 'completed',
                ]);

            // 2. Simpan atau update skor per kriteria
            foreach ($validated['nilai'] as $item) {
                Evaluasi::updateOrCreate(
                    [
                        'penugasan_peer_id' => $validated['penugasan_peer_id'],
                        'kriteria_id'       => $item['kriteria_id'],
                    ],
                    [
                        'skor' => $item['skor'],
                    ]
                );
            }
        });
    }

    public function show(): Response
    {
        return Inertia::render('penilaian/admin/results');
    }

    public function viewscore(Request $request): Response | RedirectResponse
    {
        $idPenugasanPeer = $request->idPenugasanPeer;
        $penugasanPeer = PenugasanPeer::findOrFail($idPenugasanPeer);

        //Police
        if ($penugasanPeer->status !== 'completed' || Auth::id() !== $penugasanPeer->penilai_id) {
            return redirect()->intended(route('evaluator.card', absolute: false));
        }

        $evaluations = Evaluasi::where('penugasan_peer_id', $idPenugasanPeer)
            ->with('kriteria')
            ->get();

        $evaluationData = [];

        foreach ($evaluations as $evaluation) {
            $kriteria = $evaluation->kriteria;

            // Lewati jika tidak ada relasi kriteria
            if (!$kriteria) continue;

            $groupKey = Str::slug($kriteria->aspek);

            if (!isset($evaluationData[$groupKey])) {
                $evaluationData[$groupKey] = [
                    'title' => $kriteria->aspek,
                    'criteria' => [],
                ];
            }

            $evaluationData[$groupKey]['criteria'][] = [
                'id' => $kriteria->id,
                'name' => $kriteria->nama,
                'indicators' => $kriteria->indikator,
                'score' => $evaluation->skor,
            ];
        }

        $employee = User::select(['id', 'name', 'jabatan', 'image', 'unit_kerja'])->findOrFail($penugasanPeer->outsourcing_id);

        $data = [
            'evaluationData' => $evaluationData,
            'evaluator' => Auth::user(),
            'employee' => $employee,
            'idPenugasanPeer' => $idPenugasanPeer,
        ];

        return Inertia::render('penilaian/evaluator/viewscore', $data);
    }

    public function scoredetail(Request $request): Response
    {
        $idPenugasanPeer = $request->idPenugasanPeer;
        $evaluations = Evaluasi::where('penugasan_peer_id', $idPenugasanPeer)
            ->with('kriteria')
            ->get();

        $evaluationData = [];

        foreach ($evaluations as $evaluation) {
            $kriteria = $evaluation->kriteria;

            // Lewati jika tidak ada relasi kriteria
            if (!$kriteria) continue;

            $groupKey = Str::slug($kriteria->aspek);

            if (!isset($evaluationData[$groupKey])) {
                $evaluationData[$groupKey] = [
                    'title' => $kriteria->aspek,
                    'criteria' => [],
                ];
            }

            $evaluationData[$groupKey]['criteria'][] = [
                'id' => $kriteria->id,
                'name' => $kriteria->nama,
                'indicators' => $kriteria->indikator,
                'score' => $evaluation->skor,
            ];
        }

        return Inertia::render('penilaian/admin/employee-detail-page', [
            'evaluationData' => $evaluationData,
        ]);
    }
}
