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
        $users = [
            [
                'name' => 'Administrator',
                'jabatan' => 'Admin',
                'lokasi_kerja' => 'Merdeka Selatan',
                'unit_kerja' => 'Kepegawaian',
                'phone' => '08123456789',
                'role' => 'admin',
                'perusahaan' => 'PT. Miftah Bahtera Mandiri'
            ],
        ];

        foreach ($users as $user) {
            $names = explode(' ', $user['name']);
            $firstTwoNames = strtolower($names[0] . (isset($names[1]) ? $names[1] : ''));

            User::create([
                'name' => $user['name'],
                'slug' => Str::slug($user['name'] . '-' . Str::random(5)),
                'email' => "{$firstTwoNames}@setwapres.go.id",
                'jabatan' => $user['jabatan'],

                'lokasi_kerja' => $user['lokasi_kerja'],
                'unit_kerja' => $user['unit_kerja'],
                'perusahaan' => $user['perusahaan'],
                'phone' => $user['phone'],
                'role' => $user['role'],
                'status' => 'active',
                'image' => 'image/user.png',
                'email_verified_at' => now(),
                'password' => static::$password ??= Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
