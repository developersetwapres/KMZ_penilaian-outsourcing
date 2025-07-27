<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Aspek;
use App\Models\Kriteria;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        $user = new User();

        $data = [
            'outsourcing' => $user->outsourcings(),
            'users' => User::all(),
            'masterData' => [
                'aspects' => Aspek::select(['id', 'nama', 'deskripsi'])->withCount('countKriteria')->get(),
                'criteria' => Kriteria::select(['id', 'nama', 'indikator', 'aspek_id', 'jenis'])
                    ->where('jenis', 'umum')
                    ->with('getAspek')
                    ->get(),
                'criteriaKhusus' => Kriteria::select(['id', 'nama', 'indikator', 'aspek_id', 'jenis'])
                    ->whereNot('jenis', 'umum')
                    ->with('getAspek')
                    ->get()
            ],
        ];

        return Inertia::render('penilaian/admin/page', $data);
    }

    public function storeUser(StoreUserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'jabatan' => $request->jabatan,
            'lokasi_kerja' => $request->lokasi_kerja,
            'unit_kerja' => $request->unit_kerja,
            'perusahaan' => $request->perusahaan,
            'role' => $request->role,
            'phone' => $request->phone,
            'status' => $request->status,
            'image' => $request->image,
            'password' => Hash::make($request->password),
        ]);
    }

    public function updateUser(UpdateUserRequest $request, User $user)
    {
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'jabatan' => $request->jabatan,
            'lokasi_kerja' => $request->lokasi_kerja,
            'unit_kerja' => $request->unit_kerja,
            'perusahaan' => $request->perusahaan,
            'role' => $request->role,
            'phone' => $request->phone,
            'status' => $request->status,
            'image' => $request->image,
            'password' => Hash::make($request->password),
        ]);
    }
}
