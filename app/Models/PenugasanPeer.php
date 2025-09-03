<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PenugasanPeer extends Model
{
    protected $fillable = [
        'outsourcing_id',
        'penilai_id',
        'type_penilai',
        'weight',
        'catatan',
        'status',
    ];

    // siapa yang sedang dinilai
    public function outsourcing(): BelongsTo
    {
        return $this->belongsTo(User::class, 'outsourcing_id');
    }

    // siapa yang menilai
    public function penilai(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penilai_id');
    }

    public function EvaluationResults()
    {
        $assignments = PenugasanPeer::with(['outsourcing', 'penilai'])->get()->groupBy('outsourcing_id');
        $aspekList = Aspek::all()->keyBy(fn($a) => Str::slug($a->nama, '-'));

        $results = [];

        foreach ($assignments as $outsourcingId => $group) {
            $outsourcingUser = $group->first()->outsourcing;

            $evaluatorScores = [];
            $weightedAspectTotals = [];

            foreach ($group as $assignment) {
                $evaluations = Evaluasi::with(['kriteria.getAspek'])
                    ->where('penugasan_peer_id', $assignment->id)
                    ->get();

                $aspectTemp = [];

                foreach ($evaluations as $evaluation) {
                    $aspek = $evaluation->kriteria->getAspek;
                    $aspekSlug = Str::slug($aspek->nama, '-');
                    $aspectTemp[$aspekSlug][] = $evaluation->skor;
                }

                $aspectScores = [];

                foreach ($aspekList as $slug => $aspek) {
                    if (isset($aspectTemp[$slug])) {
                        $avg = round(array_sum($aspectTemp[$slug]) / count($aspectTemp[$slug]), 2);
                    } else {
                        $avg = 0;
                    }

                    $aspectScores[$slug] = $avg;

                    // Tambah ke total aspek berbobot
                    $weightedAspectTotals[$slug] = ($weightedAspectTotals[$slug] ?? 0) + ($avg * $assignment->weight);
                }

                // Rata-rata semua aspek (tanpa bobot aspek) untuk tampil di evaluatorScores saja
                $averageScore = round(array_sum($aspectScores) / max(count($aspectScores), 1), 2);
                $weight = $assignment->weight;
                $weightedScore = round($averageScore * $weight, 2);

                $evaluatorScores[] = [
                    'type'           => $assignment->type_penilai,
                    'evaluatorName'  => $assignment->penilai->name,
                    'averageScore'   => $averageScore,
                    'weight'         => $weight,
                    'weightedScore'  => $weightedScore,
                ];
            }

            // Total skor akhir keseluruhan orang ini = jumlah (rata aspek evaluator * bobot evaluator * bobot aspek)
            $overallFinalScore = 0;
            foreach ($aspekList as $slug => $aspek) {
                $average = round($weightedAspectTotals[$slug] ?? 0, 2);
                $score = round($average * $aspek->weight, 2);
                $overallFinalScore += $score;
            }

            // Status completed jika semua penugasan orang ini sudah dievaluasi
            $status = $group->every(
                fn($assignment) =>
                Evaluasi::where('penugasan_peer_id', $assignment->id)->exists()
            ) ? 'completed' : 'in-progress';

            $results[] = [
                'id'                   => $outsourcingUser->id,
                'name'                 => $outsourcingUser->name,
                'slug'                 => $outsourcingUser->slug,
                'unit_kerja'           => $outsourcingUser->unit_kerja,
                'jabatan'              => $outsourcingUser->jabatan,
                'image'                => $outsourcingUser->image,
                'evaluatorScores'      => $evaluatorScores,
                'weightedOverallScore' => round($overallFinalScore, 2),
                'status'               => $status,
            ];
        }

        return $results;
    }

    public function RankingSkor()
    {
        $assignments = PenugasanPeer::with(['outsourcing', 'penilai'])->get()->groupBy('outsourcing_id');
        $aspekList   = Aspek::all()->keyBy(fn($a) => Str::slug($a->nama, '-'));

        // Hasil akhir, dibungkus berdasarkan jabatan outsourcing (misal os-it, os-protokol, dst)
        $results = [];

        foreach ($assignments as $outsourcingId => $group) {
            $outsourcingUser = $group->first()->outsourcing;
            $jabatanSlug     = Str::slug($outsourcingUser->jabatan, '-');

            // Siapkan nilai default untuk tiap evaluator
            $scoresByEvaluator = [
                'atasan'            => 0,
                'penerima_layanan'  => 0,
                'teman_setingkat'   => 0,
            ];

            $weightedAspectTotals = [];

            foreach ($group as $assignment) {
                $evaluations = Evaluasi::with(['kriteria.getAspek'])
                    ->where('penugasan_peer_id', $assignment->id)
                    ->get();

                $aspectTemp = [];

                foreach ($evaluations as $evaluation) {
                    $aspek    = $evaluation->kriteria->getAspek;
                    $aspekSlug = Str::slug($aspek->nama, '-');
                    $aspectTemp[$aspekSlug][] = $evaluation->skor;
                }

                $aspectScores = [];
                foreach ($aspekList as $slug => $aspek) {
                    if (isset($aspectTemp[$slug])) {
                        $avg = round(array_sum($aspectTemp[$slug]) / count($aspectTemp[$slug]), 2);
                    } else {
                        $avg = 0;
                    }
                    $aspectScores[$slug] = $avg;

                    // Akumulasi berbobot per aspek
                    $weightedAspectTotals[$slug] = ($weightedAspectTotals[$slug] ?? 0) + ($avg * $assignment->weight);
                }

                // Rata-rata skor untuk evaluator ini (tanpa bobot aspek, hanya rata aspek × bobot evaluator)
                $averageScore = round(array_sum($aspectScores) / max(count($aspectScores), 1), 2);
                $weightedScore = round($averageScore * $assignment->weight, 2);

                // Masukkan ke skor evaluator sesuai type_penilai
                $scoresByEvaluator[$assignment->type_penilai] = $weightedScore;
            }

            // Hitung total akhir outsourcing ini (pakai bobot aspek juga)
            $overallFinalScore = 0;
            foreach ($aspekList as $slug => $aspek) {
                $average = round($weightedAspectTotals[$slug] ?? 0, 2);
                $score   = round($average * $aspek->weight, 2);
                $overallFinalScore += $score;
            }

            // Siapkan array sesuai format FE
            $item = [
                'name'             => $outsourcingUser->name,
                'Atasan'           => $scoresByEvaluator['atasan'],
                'Penerima Layanan' => $scoresByEvaluator['penerima_layanan'],
                'Teman Setingkat'  => $scoresByEvaluator['teman'],
                'total'            => round($overallFinalScore, 2),
            ];

            $results[$jabatanSlug][] = $item;
        }

        // Tambahkan ranking per jabatan
        foreach ($results as $jabatan => &$list) {
            // Urutkan descending berdasarkan total
            usort($list, fn($a, $b) => $b['total'] <=> $a['total']);
            foreach ($list as $i => &$item) {
                $item['rank'] = $i + 1;
            }
        }

        return $results;
    }
}
