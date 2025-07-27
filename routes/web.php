<?php

use App\Http\Controllers\EvaluasiController;
use App\Http\Controllers\KriteriaController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PenugasanPeerController;
use Illuminate\Support\Facades\Route;


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

    Route::post('dashboard', [EvaluasiController::class, 'scoredetail'])->name('evaluasi.scoredetail');

    Route::post('dashboard/kriteria', [KriteriaController::class, 'store'])->name('kriteria.store');
    Route::put('dashboard/kriteria/{kriteria}', [KriteriaController::class, 'update'])->name('kriteria.update');

    Route::post('dashboard/user/store', [PagesController::class, 'storeUser'])->name('user.store');
    Route::put('dashboard/user/update/{user}', [PagesController::class, 'updateUser'])->name('user.update');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
