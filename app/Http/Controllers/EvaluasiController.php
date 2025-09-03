<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEvaluasiRequest;
use App\Models\Aspek;
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
        $penugasan = PenugasanPeer::findOrFail($request->idOut);
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

        $kriterias = Kriteria::with('getAspek')
            ->with(['getIndikators' => function ($query) use ($employee) {
                $query->where('jabatan', $employee->jabatan)
                    ->orWhere('jabatan', 'Umum');
            }])
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
                'indicators' => $kriteria->getIndikators,
                // 'getIndikators' => $kriteria->getIndikators,
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
        DB::transaction(function () use ($request) {
            // 1. Update catatan umum di penugasan_peer
            PenugasanPeer::where('id', $request['penugasan_peer_id'])
                ->update([
                    'catatan' => $request['catatan'] ?? '',
                    'status' => 'completed',
                ]);

            // 2. Simpan atau update skor per kriteria
            foreach ($request['nilai'] as $item) {
                Evaluasi::updateOrCreate(
                    [
                        'penugasan_peer_id' => $request['penugasan_peer_id'],
                        'kriteria_id'       => $item['kriteria_id'],
                    ],
                    [
                        'skor' => $item['skor'],
                    ]
                );
            }
        });

        return to_route('evaluator.card');
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

        $employee = User::select(['id', 'name', 'jabatan', 'image', 'unit_kerja'])->findOrFail($penugasanPeer->outsourcing_id);

        $data = [
            'evaluationData' => $evaluationData,
            'evaluator' => Auth::user(),
            'employee' => $employee,
            'overallNotes' => $penugasanPeer->catatan,
        ];

        return Inertia::render('penilaian/evaluator/viewscore', $data);
    }

    //admin---------
    public function scoredetail(User $user): Response
    {
        $assignments = $user->evaluators()->with(['penilai'])->get();
        $aspekList = Aspek::all()->keyBy(fn($a) => Str::slug($a->nama, "-"));

        $evaluatorScores = [];
        $weightedAspectTotals = []; // aspekSlug => total skor berbobot

        foreach ($assignments as $assignment) {
            $evaluations = Evaluasi::with(['kriteria.getAspek'])
                ->where('penugasan_peer_id', $assignment->id)
                ->get();

            // criteriaScores dalam format per-aspek
            $criteriaScores = [];
            $aspectTemp = [];

            foreach ($evaluations as $evaluation) {
                $kriteria = $evaluation->kriteria;
                if (!$kriteria) continue;

                $aspek = $kriteria->getAspek;
                $aspekSlug = Str::slug($aspek->nama, "-");

                // Siapkan array aspek di criteriaScores jika belum ada
                if (!isset($criteriaScores[$aspekSlug])) {
                    $criteriaScores[$aspekSlug] = [
                        'title'    => $aspek->nama,
                        'criteria' => [],
                    ];
                }

                // Masukkan data kriteria seperti format contoh
                $criteriaScores[$aspekSlug]['criteria'][] = [
                    'id'         => $kriteria->id,
                    'name'       => $kriteria->nama,
                    'indicators' => $kriteria->indikator,
                    'score'      => $evaluation->skor,
                ];

                // Data untuk hitung rata-rata per aspek
                $aspectTemp[$aspekSlug][] = $evaluation->skor;
            }

            // Hitung rata-rata per aspek untuk evaluator ini
            $aspectScores = [];
            foreach ($aspekList as $slug => $aspek) {
                if (isset($aspectTemp[$slug])) {
                    $avg = round(array_sum($aspectTemp[$slug]) / count($aspectTemp[$slug]), 2);
                } else {
                    $avg = 0;
                }

                $aspectScores[$slug] = $avg;

                // Tambahkan ke total aspek berbobot
                $weightedAspectTotals[$slug] = ($weightedAspectTotals[$slug] ?? 0) + ($avg * $assignment->weight);
            }

            // Hitung total skor evaluator ini
            $overallScore = round(array_sum($aspectScores) / max(count($aspectScores), 1), 2);
            $weightedScore = round($overallScore * $assignment->weight, 3);

            $evaluatorScores[] = [
                'evaluatorName'   => $assignment->penilai->name,
                'type'            => $assignment->type_penilai,
                'weight'          => $assignment->weight,
                'criteriaScores'  => $criteriaScores,
                'aspectScores'    => $aspectScores,
                'overallScore'    => $overallScore,
                'weightedScore'   => $weightedScore,
                'notes'           => $assignment->catatan,
            ];
        }

        // Final nilai aspek (total skor berbobot per aspek evaluator)
        $finalAspectWithWeight = [];
        $overallFinalScore = 0;

        foreach ($aspekList as $slug => $aspek) {
            $average = round($weightedAspectTotals[$slug] ?? 0, 2);
            $score = round($average * $aspek->weight, 2); // Kalkulasi dengan bobot aspek

            $finalAspectWithWeight[$slug] = [
                'average' => $average,
                'score'   => $score,
                'weight'  => $aspek->weight,
            ];

            $overallFinalScore += $score;
        }

        $status = collect($assignments)->every(
            fn($assign) =>
            Evaluasi::where('penugasan_peer_id', $assign->id)->exists()
        ) ? 'completed' : 'in-progress';

        $evaluationData = [
            'id'                    => $user->id,
            'name'                  => $user->name,
            'unit_kerja'            => $user->unit_kerja,
            'jabatan'               => $user->jabatan,
            'image'                 => $user->image,
            'evaluatorScores'       => $evaluatorScores,
            'weightedOverallScore'  => $overallFinalScore,
            'weightedAspek'         => $finalAspectWithWeight,
            'status'                => $status,
        ];


        return Inertia::render('penilaian/admin/employee-detail-page', [
            'evaluationResults' => $evaluationData,
        ]);
    }
}
