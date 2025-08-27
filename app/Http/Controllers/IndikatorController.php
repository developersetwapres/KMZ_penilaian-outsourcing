<?php

namespace App\Http\Controllers;

use App\Models\Indikator;
use Illuminate\Http\Request;

class IndikatorController extends Controller
{
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
}
