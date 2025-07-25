<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evaluasi extends Model
{
    /** @use HasFactory<\Database\Factories\AvaluasiFactory> */
    use HasFactory;

    protected $fillable = [
        'penugasan_peer_id',
        'kriteria_id',
        'skor',
    ];

    // Relasi ke penugasan_peer
    public function penugasanPeer(): BelongsTo
    {
        return $this->belongsTo(PenugasanPeer::class, 'penugasan_peer_id');
    }

    // Relasi ke kriteria
    public function kriteria(): BelongsTo
    {
        return $this->belongsTo(Kriteria::class, 'kriteria_id');
    }
}
