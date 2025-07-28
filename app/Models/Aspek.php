<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Aspek extends Model
{
    protected $fillable = [
        'nama',
        'weight',
        'deskripsi',
    ];

    public function countKriteria(): HasMany
    {
        return $this->hasMany(Kriteria::class);
    }
}
