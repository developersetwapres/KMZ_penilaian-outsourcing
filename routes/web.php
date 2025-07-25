<?php

use App\Http\Controllers\EvaluasiController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PenugasanPeerController;
use App\Models\PenugasanPeer;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PagesController::class, 'home'])->name('home');


Route::middleware(['auth', 'verified', 'role:outsourcing,penerima_layanan,atasan'])->group(function () {
    Route::get('/evaluator', [EvaluasiController::class, 'card'])->name('evaluator.card');

    Route::post('/evaluator', [EvaluasiController::class, 'create'])->name('evaluator.create');
    Route::post('/evaluator-viewscore', [EvaluasiController::class, 'viewscore'])->name('evaluator.viewscore');

    Route::post('/evaluator/post', [EvaluasiController::class, 'store'])->name('evaluator.store');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', [PagesController::class, 'dashboard'])->name('dashboard');

    Route::post('penugasan-peer', [PenugasanPeerController::class, 'store'])->name('penugasan.store');

    Route::get('dashboard/result', [EvaluasiController::class, 'show'])->name('evaluasi.show');
    Route::post('dashboard/result', [EvaluasiController::class, 'scoredetail'])->name('evaluasi.scoredetail');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
