<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KriteriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Inisiatif',
                'deskripsi' => 'Kemampuan untuk mengambil tindakan proaktif tanpa harus menunggu perintah atau arahan.'
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Inovasi',
                'deskripsi' => 'Kemampuan menciptakan ide atau pendekatan baru yang meningkatkan efisiensi atau efektivitas kerja.'
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Komunikasi',
                'deskripsi' => 'Kemampuan menyampaikan informasi secara jelas dan efektif baik lisan maupun tulisan.'
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Kemampuan Adaptasi',
                'deskripsi' => 'Kemampuan menyesuaikan diri dengan perubahan tugas, lingkungan kerja, atau teknologi baru.'
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Motivasi',
                'deskripsi' => 'Dorongan internal untuk menyelesaikan pekerjaan secara maksimal dan berorientasi pada hasil.'
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Kerja sama',
                'deskripsi' => 'Kemampuan bekerja dengan orang lain secara harmonis dan produktif untuk mencapai tujuan bersama.'
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'nama' => 'Kemandirian',
                'deskripsi' => 'Kemampuan menyelesaikan pekerjaan tanpa bergantung secara berlebihan pada orang lain.'
            ],
            [
                'aspek' => 'Aspek perilaku',
                'nama' => 'Kedisiplinan',
                'deskripsi' => 'Kepatuhan terhadap aturan, waktu, dan prosedur yang telah ditetapkan dalam organisasi.'
            ],
            [
                'aspek' => 'Aspek perilaku',
                'nama' => 'Komitmen',
                'deskripsi' => 'Kesungguhan dalam menjalankan tugas dan tanggung jawab secara konsisten.'
            ],
            [
                'aspek' => 'Aspek perilaku',
                'nama' => 'Penampilan',
                'deskripsi' => 'Sikap dan tampilan pribadi yang mencerminkan profesionalisme di lingkungan kerja.'
            ],
            [
                'aspek' => 'Aspek perilaku',
                'nama' => 'Etika dan Kesopanan',
                'deskripsi' => 'Sikap hormat dan sopan dalam berinteraksi dengan rekan kerja maupun pihak lain.'
            ],
            [
                'aspek' => 'Aspek perilaku',
                'nama' => 'Kejujuran',
                'deskripsi' => 'Perilaku yang mencerminkan integritas dan tidak menyembunyikan kebenaran.'
            ],
            [
                'aspek' => 'Aspek perilaku',
                'nama' => 'Loyalitas',
                'deskripsi' => 'Kesetiaan terhadap organisasi serta dukungan terhadap visi dan misi instansi.'
            ],
        ];

        foreach ($data as $key => $value) {
            Kriteria::create([
                'aspek' => $value['aspek'],
                'nama' => $value['nama'],
                'deskripsi' => $value['deskripsi'],
            ]);
        }
    }
}
