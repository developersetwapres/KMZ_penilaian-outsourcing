<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Indikator extends Model
{
    protected $fillable = [
        'indikator',
        'jabatan',
        'kriteria_id',
    ];
}
