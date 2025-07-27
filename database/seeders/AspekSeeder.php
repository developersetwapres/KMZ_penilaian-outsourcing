<?php

namespace Database\Seeders;

use App\Models\Aspek;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AspekSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $datas = [
            [
                'name' => 'Aspek teknis dan hasil kerja',
                'deskripsi' => 'Penilaian terhadap kemampuan teknis dan profesional dalam menjalankan tugas.',
            ],
            [
                'name' => 'Aspek Perilaku',
                'deskripsi' => 'Penilaian terhadap sikap, disiplin, dan perilaku kerja sehari-hari.',
            ],
        ];

        foreach ($datas as $key => $value) {
            Aspek::create([
                'nama' => $value['name'],
                'deskripsi' => $value['deskripsi'],
            ]);
        }
    }
}
