<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePenugasanPeerRequest;
use App\Models\PenugasanPeer;
use Illuminate\Http\Request;

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

        foreach ($penilai as $tipe => $info) {
            PenugasanPeer::updateOrCreate(
                [
                    'outsourcing_id' => $outsourcingId,
                    'penilai_id' => $info['id'],
                    'type_penilai' => $mapTipe[$tipe] ?? $tipe,
                ],
                []
            );
        }
    }
}
