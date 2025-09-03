<?php

use App\Http\Controllers\IndikatorController;
use App\Http\Controllers\PagesController;
use App\Http\Controllers\PenugasanPeerController;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Settings\ImportController;
use App\Models\PenugasanPeer;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', '/settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    Route::get('settings/import', [ImportController::class, 'pageImport'])->name('data.import');
    Route::post('settings/import-indikator-kriteria', [ImportController::class, 'importIndikator'])->name('indikator.import');
    Route::post('settings/user/import-store', [ImportController::class, 'importUsers'])->name('user.postimport');
    Route::post('settings/penugasan-peer/import', [ImportController::class, 'importPenugasan'])->name('penugasan.import');
    Route::get('settings/data-reset', [ImportController::class, 'pageReset'])->name('data.reset');

    Route::delete('settings/user-reset', [PagesController::class, 'resetUser'])->name('user.reset');
    Route::delete('settings/penugasan-reset', [PenugasanPeerController::class, 'reset'])->name('penugasan.reset');
    Route::delete('settings/indikator-reset', [IndikatorController::class, 'reset'])->name('indikator.reset');
});
