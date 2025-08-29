<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    protected static $password;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $name = 'Administrator';
        $names = explode(' ', $name);
        $firstTwoNames = strtolower($names[0] . ($names[1] ?? ''));

        User::create([
            'name' => $name,
            'slug' => Str::slug($name . '-' . Str::random(5)),
            'email' => "{$firstTwoNames}@set.wapresri.go.id",
            'jabatan' => 'Admin',
            'lokasi_kerja' => 'Merdeka Selatan',
            'unit_kerja' => 'Kepegawaian',
            'perusahaan' => 'PT. Miftah Bahtera Mandiri',
            'phone' => '08123456789',
            'role' => 'admin',
            'status' => 'active',
            'image' => 'image/user.png',
            'email_verified_at' => now(),
            'password' => Hash::make('adm1n02'),
            'remember_token' => Str::random(10),
        ]);
    }
}
