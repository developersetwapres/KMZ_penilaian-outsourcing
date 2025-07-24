<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEvaluasiRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EvaluasiController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('penilaian/evaluator/page');
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
