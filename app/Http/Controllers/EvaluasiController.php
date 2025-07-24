<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEvaluasiRequest;
use App\Models\Kriteria;
use Illuminate\Http\RedirectResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class EvaluasiController extends Controller
{
    public function card(): Response
    {
        return Inertia::render('penilaian/evaluator/page');
    }

    public function create(Request $request): Response | RedirectResponse
    {
        $employee = User::select('name', 'jabatan', 'image', 'unit_kerja')->findOrFail($request->id);
        $evaluator = Auth::user();

        //Kalau nama tidak sama dengan nama hasil query berdasarkan id
        if ($employee->name !== $request->name) {
            // return redirect()->intended(route('evaluator.card', absolute: false));
        }

        //kalau evalator bukan untuk outcourching
        //if ()

        $kriterias = Kriteria::all();

        $evaluationData = [];

        foreach ($kriterias as $kriteria) {
            // ✅ Group berdasarkan aspek, bukan slug
            $groupKey = Str::slug($kriteria->aspek);

            if (!isset($evaluationData[$groupKey])) {
                $evaluationData[$groupKey] = [
                    'title' => $kriteria->aspek,
                    'criteria' => [],
                ];
            }

            $evaluationData[$groupKey]['criteria'][] = [
                'id' => $kriteria->slug, // slug per kriteria
                'name' => $kriteria->nama,
                'indicators' => $kriteria->indikator,
            ];
        }

        $data = [
            'evaluationData' => $evaluationData,
            'evaluator' => $evaluator,
            'employee' => $employee
        ];

        return Inertia::render('penilaian/evaluator/evaluation-form', $data);
    }

    public function store(StoreEvaluasiRequest $request)
    {
        dd($request->all());
    }

    public function show(): Response
    {
        return Inertia::render('penilaian/admin/results');
    }
}
