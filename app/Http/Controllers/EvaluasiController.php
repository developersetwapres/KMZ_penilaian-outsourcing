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

    public function create(PenugasanPeer $penugasan, Request $request): Response | RedirectResponse
    {
        $penugasan->load(['penilai', 'outsourcing']);

        $employee = User::select(['id', 'name', 'jabatan', 'image', 'unit_kerja'])->findOrFail($penugasan->outsourcing->id);

        //---------------POLICE-----------------POLICE-------------------------------------
        //Kalau nama tidak sama dengan nama hasil query berdasarkan id
        if ($employee->name !== $request->nameOut) {
            return redirect()->intended(route('evaluator.card', absolute: false));
        }

        //kalau evalator bukan untuk outcourching
        if ($penugasan->penilai->id !== Auth::id()) {
            return redirect()->intended(route('evaluator.card', absolute: false));
        }
        //---------------POLICE END-----------------POLICE END-------------------------------

        $kriterias = Kriteria::where('jenis', 'umum')
            ->orWhere('jenis',  $employee->jabatan)
            ->with('getAspek')
            ->get();

        $evaluationData = [];

        foreach ($kriterias as $kriteria) {
            $groupKey = Str::slug($kriteria->getAspek->nama);

            if (!isset($evaluationData[$groupKey])) {
                $evaluationData[$groupKey] = [
                    'title' => $kriteria->getAspek->nama,
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
            'idPenugasanPeer' =>  $penugasan->id,
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

        $totalScore = 0;
        $totalCount = 0;
        $evaluationData = [];

        foreach ($evaluations as $evaluation) {
            $kriteria = $evaluation->kriteria;

            // Lewati jika tidak ada relasi kriteria
            if (!$kriteria) continue;

            $groupKey = Str::slug($kriteria->getAspek->nama);

            if (!isset($evaluationData[$groupKey])) {
                $evaluationData[$groupKey] = [
                    'title' => $kriteria->getAspek->nama,
                    'criteria' => [],
                ];
            }

            // Tambah skor dan counter
            $totalScore += $evaluation->skor;
            $totalCount++;

            $evaluationData[$groupKey]['criteria'][] = [
                'id' => $kriteria->id,
                'name' => $kriteria->nama,
                'indicators' => $kriteria->indikator,
                'score' => $evaluation->skor,
            ];
        }

        // Hitung rata-rata
        $averageScore = $totalCount > 0 ? round($totalScore / $totalCount, 2) : 0;


        $employee = User::select(['id', 'name', 'jabatan', 'image', 'unit_kerja'])->findOrFail($penugasanPeer->outsourcing_id);

        $data = [
            'evaluationData' => $evaluationData,
            'evaluator' => Auth::user(),
            'employee' => $employee,
            'overallNotes' => $penugasanPeer->catatan,
            'averageScore' => $averageScore
        ];

        return Inertia::render('penilaian/evaluator/viewscore', $data);
    }

    //admin---------
    public function scoredetail(User $user): Response
    {
        // Ambil semua penugasan evaluator untuk outsourcing ini
        $assignments = $user->evaluators()->with(['penilai', 'penilai'])->get();

        $evaluatorScores = [];
        $weightedTotal = 0;

        foreach ($assignments as $assignment) {
            $evaluations = Evaluasi::with(['kriteria.getAspek'])
                ->where('penugasan_peer_id', $assignment->id)
                ->get();

            $criteriaScores = [];
            $aspectTemp = [];

            foreach ($evaluations as $evaluation) {
                $kriteria = $evaluation->kriteria;
                $aspek = $kriteria->getAspek;
                $criteriaScores[$kriteria->slug] = $evaluation->skor;

                $aspectTemp[Str::slug($aspek->nama, "-")][] = $evaluation->skor;
            }

            //Rata-Rata Per Aspek
            $aspectScores = [];
            foreach ($aspectTemp as $aspekName => $scores) {
                $aspectScores[$aspekName] = round(array_sum($scores) / count($scores), 2);
            }

            // Hitung overall score evaluator
            $overallScore = round($evaluations->avg('skor'), 2);

            $weightedTotal += $overallScore * $assignment->weight;

            $evaluatorScores[] = [
                'evaluatorName'   => $assignment->penilai->name,
                'type'            => $assignment->type_penilai,
                'weight'          => $assignment->weight,
                'criteriaScores'  => $criteriaScores,
                'aspectScores'    => $aspectScores,
                'overallScore'    => $overallScore,
                'notes'           => $assignment->catatan,
            ];
        }

        // Cek status
        $status = collect($assignments)->every(function ($assign) {
            return Evaluasi::where('penugasan_peer_id', $assign->id)->exists();
        }) ? 'completed' : 'in-progress';

        $evaluationData = [
            'id'                   => $user->id,
            'name'                 => $user->name,
            'unit_kerja'           => $user->unit_kerja,
            'jabatan'              => $user->jabatan,
            'image'                => $user->image,
            'evaluatorScores'      => $evaluatorScores,
            'weightedOverallScore' => round($weightedTotal, 3),
            'status'               => $status,
        ];

        return Inertia::render('penilaian/admin/employee-detail-page', [
            'evaluationResults' => $evaluationData,
        ]);
    }
}
