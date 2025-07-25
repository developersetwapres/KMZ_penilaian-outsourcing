<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PenugasanPeer extends Model
{
    protected $fillable = [
        'outsourcing_id',
        'penilai_id',
        'type_penilai',
        'catatan',
        'status',
    ];

    // siapa yang sedang dinilai
    public function outsourcing(): BelongsTo
    {
        return $this->belongsTo(User::class, 'outsourcing_id');
    }

    // siapa yang menilai
    public function penilai(): BelongsTo
    {
        return $this->belongsTo(User::class, 'penilai_id');
    }
}
