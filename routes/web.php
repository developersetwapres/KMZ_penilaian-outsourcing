<?php

use App\Http\Controllers\EvaluasiController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PenugasanPeerController;
use App\Models\PenugasanPeer;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:outsourcing,penerima_layanan,atasan'])->group(function () {
    Route::get('/', [EvaluasiController::class, 'card'])->name('evaluator.card');

    Route::post('/evaluator', [EvaluasiController::class, 'create'])->name('evaluator.create');
    Route::get('/evaluator', function () {
        return to_route('evaluator.card');
    });

    Route::post('/penilaian-viewscore', [EvaluasiController::class, 'viewscore'])->name('penilaian.viewscore');
    Route::get('/penilaian-viewscore', function () {
        return to_route('evaluator.card');
    });

    Route::post('/penilaian-viewscore', [EvaluasiController::class, 'viewscore'])->name('penilaian.viewscore');

    Route::post('/penilaian-score',  [EvaluasiController::class, 'store'])->name('penilaian.store');
});

Route::middleware(['auth', 'verified', 'role:admin'])->group(function () {
    Route::get('dashboard', [PagesController::class, 'dashboard'])->name('dashboard');

    Route::post('dashboard/penugasan-peer', [PenugasanPeerController::class, 'store'])->name('penugasan.store');
    Route::post('dashboard/penugasan-peer/export', [PenugasanPeerController::class, 'importPenugasan'])->name('penugasan.export');

    Route::get('dashboard-detail/{user:slug}', [EvaluasiController::class, 'scoredetail'])->name('evaluasi.scoredetail');

    Route::post('dashboard/kriteria', [KriteriaController::class, 'store'])->name('kriteria.store');
    Route::put('dashboard/kriteria/{kriteria}', [KriteriaController::class, 'update'])->name('kriteria.update');

    Route::post('dashboard/user/store', [PagesController::class, 'store'])->name('user.store');
    Route::post('dashboard/user/export-store', [PagesController::class, 'importUsers'])->name('user.export');
    Route::put('dashboard/user/update/{user}', [PagesController::class, 'update'])->name('user.update');

    Route::post('/upload-temp-image', [PagesController::class, 'uploadTempImage'])->name('upload.temp');


    Route::get('dashboard/import-user-evaluator', [PenugasanPeerController::class, 'import'])->name('user.import');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
