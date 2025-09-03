<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kriteria extends Model
{
    protected $fillable = [
        'slug',
        'jenis',
        'aspek_id',
        'nama',
        // 'indikator',
    ];

    protected $casts = [
        'indikator' => 'array'
    ];

    public function getAspek(): BelongsTo
    {
        return $this->belongsTo(Aspek::class, 'aspek_id');
    }

    public function getIndikators(): HasMany
    {
        return $this->hasMany(Indikator::class);
    }
}
