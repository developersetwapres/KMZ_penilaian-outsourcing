<?php

namespace App\Http\Controllers;

use App\Models\Kriteria;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class KriteriaController extends Controller
{
    public function store(Request $request)
    {
        Kriteria::create(
            [
                'slug' => Str::slug($request->aspek_id . '-' . $request->name, '-'),
                'nama' => $request->name,
                'aspek_id' => $request->aspek_id,
            ]
        );
    }

    public function update(Request $request, Kriteria $kriteria)
    {
        $kriteria->update(
            [
                'slug' => Str::slug($request->aspek_id . '-' . $request->name, '-'),
                'nama' => $request->name,
                'aspek_id' => $request->aspek_id,
            ]
        );
    }
}
