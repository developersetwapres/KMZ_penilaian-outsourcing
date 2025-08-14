<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePenugasanPeerRequest;
use App\Models\PenugasanPeer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class PenugasanPeerController extends Controller
{
    public function store(StorePenugasanPeerRequest $request)
    {
        $data = $request->validated();

        $outsourcingId = $data['outsourcing']['id'];
        $penilai = $data['penilai'];

        $mapTipe = [
            'atasan' => 'atasan',
            'penerima_layanan' => 'penerima_layanan',
            'teman' => 'teman',
        ];

        $mapWeight = [
            'atasan' => 0.5,
            'penerima_layanan' => 0.3,
            'teman' => 0.2,
        ];

        foreach ($penilai as $tipe => $info) {
            PenugasanPeer::updateOrCreate(
                [
                    'outsourcing_id' => $outsourcingId,
                    'type_penilai' => $mapTipe[$tipe] ?? $tipe,
                ],
                [
                    'penilai_id' => $info['id'],
                    'weight' =>  $mapWeight[$tipe],
                    'catatan' => '',
                    'status' => 'incomplete'
                ]
            );
        }
    }

    public function import()
    {
        return Inertia::render('penilaian/admin/import-user-evaluator');
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

        $penugasan = [];

        foreach ($data as $value) {
            $penugasan[] =   [
                'outsourcing_id' => $value['idPegawai'],
                'type_penilai' => $value['type'],
                'penilai_id' => $value['idPenilai'],
                'weight' =>  weight($value['type']),
                'catatan' => '',
                'status' => 'incomplete',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        PenugasanPeer::insert($penugasan); // sekali query untuk semua data

    }
}
