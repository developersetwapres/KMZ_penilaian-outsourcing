<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function evaluators()
    {
        return $this->hasMany(PenugasanPeer::class, 'outsourcing_id')->with('penilai');
    }


    // Sebagai outsourcing (yang dinilai)
    public function penilaianMasuk()
    {
        return $this->hasMany(PenugasanPeer::class, 'outsourcing_id');
    }

    // Penilai atasan
    public function penilaiAtasan()
    {
        return $this->hasOne(PenugasanPeer::class, 'outsourcing_id')->where('tipe', 'atasan')->with('penilai');
    }

    // Penilai teman
    public function penilaiTeman()
    {
        return $this->hasOne(PenugasanPeer::class, 'outsourcing_id')->where('tipe', 'teman')->with('penilai');
    }

    // Penilai bawahan
    public function penilaiBawahan()
    {
        return $this->hasOne(PenugasanPeer::class, 'outsourcing_id')->where('tipe', 'bawahan')->with('penilai');
    }
}
