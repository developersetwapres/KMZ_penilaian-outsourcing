<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PagesController extends Controller
{
    public function home(): Response
    {
        return Inertia::render('penilaian/page');
    }

    public function dashboard(): Response
    {
        $data = [
            'outsourcing' => User::whereNot('role', 'admin')
                ->with('evaluators.penilai')
                ->get()
                ->map(function ($user) {
                    $evaluators = $user->evaluators->mapWithKeys(function ($item) {
                        return [$item->tipe => $item->penilai];
                    });

                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'jabatan' => $user->jabatan,
                        'lokasi_kerja' => $user->lokasi_kerja,
                        'unit_kerja' => $user->unit_kerja,
                        'perusahaan' => $user->perusahaan,
                        'phone' => $user->phone,
                        'image' => $user->image,
                        'role' => $user->role,
                        'evaluators' => $evaluators,
                    ];
                })
        ];

        return Inertia::render('penilaian/admin/page', $data);
    }
}
