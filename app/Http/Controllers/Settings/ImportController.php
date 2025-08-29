<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\ImportUsersRequest;
use App\Models\PenugasanPeer;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\Indikator;
use Inertia\Inertia;
use Inertia\Response;


class ImportController extends Controller
{
    public function pageImport(): Response
    {
        return Inertia::render('settings/import');
    }

    public function importUsers(ImportUsersRequest $request)
    {
        set_time_limit(0); // hilangkan limit waktu eksekusi
        $data = $request->validated();

        $users = [];
        foreach ($data as $value) {
            $users[] = [
                'id'            => $value['id'],
                'name'         => $value['name'],
                'slug'         => Str::slug($value['name'] . '-' . Str::random(5)),
                'email'        => $value['email'],
                'jabatan'      => $value['jabatan'],
                'lokasi_kerja' => $value['lokasi_kerja'],
                'unit_kerja'   => $value['unit_kerja'],
                'perusahaan'   => $value['perusahaan'],
                'role'         => $value['role'],
                'phone'        => $value['phone'] ?? '62123456789',
                'status'       => $value['status'] ?? 'active',
                'image'        => $value['image'] ?? 'image/user.png',
                'password'     => Hash::make($value['nip']),
                'created_at'   => now(),
                'updated_at'   => now(),
            ];
        }

        // Bagi jadi batch 500 user sekali insert
        foreach (array_chunk($users, 100) as $chunk) {
            User::insert($chunk);
        }
    }

    public function importPenugasan(Request $request)
    {
        $data = $request->all();
        function weight($type)
        {
            switch ($type) {
                case 'atasan':
                    return 0.5;
                    break;

                case 'penerima_layanan':
                    return 0.3;
                    break;

                default:
                    return 0.2;
            }
        }
        foreach ($data as $value) {
            PenugasanPeer::create([
                'outsourcing_id' => $value['idPegawai'],
                'type_penilai' => $value['type'],
                'penilai_id' => $value['idPenilai'],
                'weight' =>  weight($value['type']),
                'catatan' => '',
                'status' => 'incomplete',
            ]);
        }
    }

    public function importIndikator(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            Indikator::create([
                'kriteria_id' => $value['id_kriteria'],
                'jabatan' => $value['jabatan'],
                'indikator' => $value['indikator'],
            ]);
        }
    }

    public function pageReset()
    {
        return Inertia::render('settings/resetdata');
    }
}
