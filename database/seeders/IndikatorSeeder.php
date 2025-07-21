<?php

namespace Database\Seeders;

use App\Models\Indikator;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class IndikatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            // Kriteria ID 1 - Inisiatif
            ['kriteria_id' => 1, 'quection' => 'Mampu memulai pemikiran maupun aktivitas yang tepat dalam rangka mencapai tujuan organisasi.'],

            // Kriteria ID 2 - Inovasi
            ['kriteria_id' => 2, 'quection' => 'Memiliki ide-ide baru dalam menyelesaikan masalah atau dalam melaksanakan tugas.'],
            ['kriteria_id' => 2, 'quection' => 'Mengerjakan sesuatu dengan cara yang lebih efektif dan efisien bagi organisasi.'],

            // Kriteria ID 3 - Komunikasi
            ['kriteria_id' => 3, 'quection' => 'Mampu menyampaikan ide, argumentasi, dan pendapat secara jelas kepada orang lain dengan baik, secara lisan.'],
            ['kriteria_id' => 3, 'quection' => 'Dapat berbicara/presentasi di depan umum dengan baik.'],
            ['kriteria_id' => 3, 'quection' => 'Mampu memberikan arahan/penjelasan kepada bawahan dan/atau rekan kerja tanpa menyebabkan kesalahpahaman.'],

            // Kriteria ID 4 - Kemampuan Adaptasi
            ['kriteria_id' => 4, 'quection' => 'Mampu menguasai dan menggunakan teknologi untuk meningkatkan efektivitas dan efisiensi kerja dalam mencapai tujuan organisasi.'],

            // Kriteria ID 5 - Motivasi
            ['kriteria_id' => 5, 'quection' => 'Menunjukkan kemauan untuk mengerjakan pekerjaan dengan secepat baik dan sebaik-baiknya.'],
            ['kriteria_id' => 5, 'quection' => 'Secara konsisten selalu dapat menjaga irama kerja dan semangat kerja baik untuk diri sendiri dan orang lain.'],

            // Kriteria ID 6 - Kerja Sama
            ['kriteria_id' => 6, 'quection' => 'Dapat membina hubungan kerja/berinteraksi dengan rekan kerja maupun atasan dengan baik (kooperatif).'],
            ['kriteria_id' => 6, 'quection' => 'Memberikan kontribusi positif dan produktif dalam setiap pekerjaan tim.'],

            // Kriteria ID 7 - Kemandirian
            ['kriteria_id' => 7, 'quection' => 'Dapat mengerjakan tugas dan tanggung jawab yang diberikan tanpa pengawasan langsung/terus-menerus dari atasan.'],
            ['kriteria_id' => 7, 'quection' => 'Memecahkan masalah dan membuat keputusan sesuai dengan wewenangnya tanpa pengawasan langsung/terus-menerus dari atasan.'],

            //Prilaku-----------------
            // Kriteria ID 8 - Kedisiplinan
            ['kriteria_id' => 8, 'quection' => 'Rendahnya frekuensi mangkir dan/atau izin dalam jam kerja untuk urusan non kedinasan.'],

            // Kriteria ID 9 - Komitmen
            ['kriteria_id' => 9, 'quection' => 'Menunjukkan komitmen yang tinggi terhadap pengembangan diri dan institusi.'],

            // Kriteria ID 10 - Penampilan
            ['kriteria_id' => 10, 'quection' => 'Penampilan fisik (cara berpakaian) yang selalu rapi dan sesuai aturan.'],

            // Kriteria ID 11 - Etika dan Kesopanan
            ['kriteria_id' => 11, 'quection' => 'Kemampuan dalam menyesuaikan standar perilaku yang sesuai dengan norma adat, agama, dan etika instansi dalam berinteraksi dengan semua pihak.'],

            // Kriteria ID 12 - Kejujuran
            ['kriteria_id' => 12, 'quection' => 'Menyampaikan segala sesuatu dan berperilaku secara apa adanya (truthfully).'],
            ['kriteria_id' => 12, 'quection' => 'Konsistensi antara ucapan dan tindakan.'],

            // Kriteria ID 13 - Loyalitas
            ['kriteria_id' => 13, 'quection' => 'Menjalankan perintah atasan dengan segala upaya.'],
            ['kriteria_id' => 13, 'quection' => 'Tidak membantah, menolak, atau melakukan pembangkangan terhadap perintah atasan.'],
            ['kriteria_id' => 13, 'quection' => 'Bangga dengan pekerjaannya dan bersungguh-sungguh penuh terhadap penyelesaian pekerjaannya.'],
        ];

        foreach ($data as $key => $value) {
            Indikator::create([
                'kriteria_id' => $value['kriteria_id'],
                'quection' => $value['quection']
            ]);
        }
    }
}
