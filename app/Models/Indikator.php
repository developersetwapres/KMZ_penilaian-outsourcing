<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Indikator extends Model
{
    protected $fillable = [
        'indikator',
        'jabatan',
        'kriteria_id',
    ];

    public function getIndikator(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class, 'kriteria_id');
    }
}
