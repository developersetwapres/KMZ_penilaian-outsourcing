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
            ['name' => 'Ferry Ardiyansyah', 'jabatan' => 'Teknisi Jaringan', 'lokasi_kerja' => 'Kediaman Diponegoro - Merdeka Selatan - Merdeka Utara', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Muhammad Iqbal', 'jabatan' => 'Teknisi Jaringan', 'lokasi_kerja' => 'Kediaman Diponegoro - Merdeka Selatan - Merdeka Utara', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Catur Hadi Gunawan', 'jabatan' => 'Teknisi Komputer', 'lokasi_kerja' => 'Kediaman Diponegoro - Merdeka Selatan - Merdeka Utara', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Muhammad Ashin Fahmi', 'jabatan' => 'Teknisi Komputer', 'lokasi_kerja' => 'Merdeka Utara', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Sesaryanto Utomo', 'jabatan' => 'Teknisi Komputer', 'lokasi_kerja' => 'Merdeka Utara', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Eko Prasetyo', 'jabatan' => 'Teknisi Komputer', 'lokasi_kerja' => 'Merdeka Selatan', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Rizky Halim Saputra', 'jabatan' => 'Teknisi Komputer', 'lokasi_kerja' => 'Merdeka Selatan', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Rizki Pinandoko', 'jabatan' => 'Juru Kamera', 'lokasi_kerja' => 'Perbantuan BPMI (Dokumentasi)', 'unit_kerja' => 'Biro Pers, Media, dan Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Jeri Wongiyanto', 'jabatan' => 'Fotografer', 'lokasi_kerja' => 'Perbantuan BPMI (Dokumentasi)', 'unit_kerja' => 'Biro Pers, Media, dan Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Didi Fauzi', 'jabatan' => 'Juru Kamera', 'lokasi_kerja' => 'Perbantuan BPMI (Dokumentasi)', 'unit_kerja' => 'Biro Pers, Media, dan Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Christian Ananta Putra', 'jabatan' => 'Desainer Grafis dan Multimedia', 'lokasi_kerja' => 'Perbantuan BPMI (Desain Grafis)', 'unit_kerja' => 'Biro Pers, Media, dan Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Kevin Akbar Prabowo', 'jabatan' => 'Desainer Grafis dan Multimedia', 'lokasi_kerja' => 'Perbantuan BPMI (Desain Grafis)', 'unit_kerja' => 'Biro Pers, Media, dan Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Hanindita Basmatulhana', 'jabatan' => 'Desainer Grafis dan Multimedia', 'lokasi_kerja' => 'Perbantuan BPMI (Desain Grafis)', 'unit_kerja' => 'Biro Pers, Media, dan Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Muhammad Hilman', 'jabatan' => 'Programmer', 'lokasi_kerja' => 'Merdeka Selatan', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Khaeril Maswal Zaid', 'jabatan' => 'Programmer / Desainer Grafis', 'lokasi_kerja' => 'Merdeka Selatan', 'unit_kerja' => 'ex Bagian Teknologi Informasi', 'phone' => '08123456789', 'role' => 'outsourcing', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
            ['name' => 'Exp. Admimin Jeanette', 'jabatan' => 'Admin', 'lokasi_kerja' => 'Merdeka Selatan', 'unit_kerja' => 'Kepegawaian', 'phone' => '08123456789', 'role' => 'admin', 'perusahaan' => 'PT. Miftah Bahtera Mandiri'],
        ];

        foreach ($users as $user) {
            $names = explode(' ', $user['name']);
            $firstTwoNames = strtolower($names[0] . (isset($names[1]) ? $names[1] : ''));

            User::create([
                'name' => $user['name'],
                'email' => "{$firstTwoNames}@setwapres.go.id",
                'jabatan' => $user['jabatan'],
                'lokasi_kerja' => $user['lokasi_kerja'],
                'unit_kerja' => $user['unit_kerja'],
                'perusahaan' => $user['perusahaan'],
                'phone' => $user['phone'],
                'role' => $user['role'],
                'status' => 'active',
                'image' => '/image/user.png',
                'email_verified_at' => now(),
                'password' => static::$password ??= Hash::make('password'),
                'remember_token' => Str::random(10),
            ]);
        }
    }
}
