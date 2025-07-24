<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Kriteria extends Model
{
    protected $fillable = [
        'slug',
        'jenis',
        'aspek',
        'nama',
        'deskripsi',
        'indikator',
    ];

    protected $casts = [
        'indikator' => 'array'
    ];
}
