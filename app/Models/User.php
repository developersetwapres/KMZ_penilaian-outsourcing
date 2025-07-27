<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
        'jabatan',
        'lokasi_kerja',
        'unit_kerja',
        'perusahaan',
        'role',
        'phone',
        'status',
        'image',
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

    public function evaluators(): HasMany
    {
        return $this->hasMany(PenugasanPeer::class, 'outsourcing_id')->with('penilai');
    }

    public function outsourcings()
    {
        return $this->whereNot('role', 'admin')
            ->with('evaluators.penilai')
            ->get()
            ->map(function ($user) {
                $evaluators = $user->evaluators->mapWithKeys(function ($item) {
                    return [$item->type_penilai => $item->penilai];
                });

                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'jabatan' => $user->jabatan,
                    'lokasi_kerja' => $user->lokasi_kerja,
                    'unit_kerja' => $user->unit_kerja,
                    'perusahaan' => $user->perusahaan,
                    'phone' => $user->phone,
                    'image' => $user->image,
                    'role' => $user->role,
                    'evaluators' => $evaluators,
                ];
            });
    }
}
