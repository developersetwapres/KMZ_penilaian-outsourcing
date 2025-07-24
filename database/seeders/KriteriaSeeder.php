<?php

namespace Database\Seeders;

use App\Models\Kriteria;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

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
                'jenis' => 'umum',
                'nama' => 'Inisiatif',
                'deskripsi' => 'Kemampuan untuk mengambil tindakan proaktif tanpa harus menunggu perintah atau arahan.',
                'indikator' => [
                    'Mampu memulai pemikiran maupun aktivitas yang tepat dalam rangka mencapai tujuan organisasi.'
                ]
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'jenis' => 'umum',
                'nama' => 'Inovasi',
                'deskripsi' => 'Kemampuan menciptakan ide atau pendekatan baru yang meningkatkan efisiensi atau efektivitas kerja.',
                'indikator' => [
                    'Memiliki ide-ide baru dalam menyelesaikan masalah atau dalam melaksanakan tugas.',
                    'Mengerjakan sesuatu dengan cara yang lebih efektif dan efisien bagi organisasi.'
                ]
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'jenis' => 'umum',
                'nama' => 'Komunikasi',
                'deskripsi' => 'Kemampuan menyampaikan informasi secara jelas dan efektif baik lisan maupun tulisan.',
                'indikator' => [
                    'Mampu menyampaikan ide, argumentasi, dan pendapat secara jelas kepada orang lain dengan baik, secara lisan.',
                    'Dapat berbicara/presentasi di depan umum dengan baik.',
                    'Mampu memberikan arahan/penjelasan kepada bawahan dan/atau rekan kerja tanpa menyebabkan kesalahpahaman.'
                ]
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'jenis' => 'umum',
                'nama' => 'Kemampuan Adaptasi',
                'deskripsi' => 'Kemampuan menyesuaikan diri dengan perubahan tugas, lingkungan kerja, atau teknologi baru.',
                'indikator' => [
                    'Mampu menguasai dan menggunakan teknologi untuk meningkatkan efektivitas dan efisiensi kerja dalam mencapai tujuan organisasi.'
                ]
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'jenis' => 'umum',
                'nama' => 'Motivasi',
                'deskripsi' => 'Dorongan internal untuk menyelesaikan pekerjaan secara maksimal dan berorientasi pada hasil.',
                'indikator' => [
                    'Menunjukkan kemauan untuk mengerjakan pekerjaan dengan sepenuh hati dan sebaik-baiknya.',
                    'Secara konsisten selalu dapat menjaga irama kerja dan semangat kerja baik untuk diri sendiri dan orang lain.'
                ]
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'jenis' => 'umum',
                'nama' => 'Kerja sama',
                'deskripsi' => 'Kemampuan bekerja dengan orang lain secara harmonis dan produktif untuk mencapai tujuan bersama.',
                'indikator' => [
                    'Dapat membina hubungan kerja/berinteraksi dengan rekan kerja maupun atasan dengan baik (kooperatif).',
                    'Memberikan kontribusi positif dan produktif dalam setiap pekerjaan tim.'
                ]
            ],
            [
                'aspek' => 'Aspek teknis dan hasil kerja',
                'jenis' => 'umum',
                'nama' => 'Kemandirian',
                'deskripsi' => 'Kemampuan menyelesaikan pekerjaan tanpa bergantung secara berlebihan pada orang lain.',
                'indikator' => [
                    'Dapat mengerjakan tugas dan tanggung jawab yang diberikan tanpa pengawasan langsung/terus-menerus dari atasan.',
                    'Memecahkan masalah dan membuat keputusan sesuai dengan wewenangnya tanpa pengawasan langsung/terus-menerus dari atasan.'
                ]
            ],

            //-------------------------------------------------------------------

            [
                'aspek' => 'Aspek perilaku',
                'jenis' => 'umum',
                'nama' => 'Kedisiplinan',
                'deskripsi' => 'Kepatuhan terhadap aturan, waktu, dan prosedur yang telah ditetapkan dalam organisasi.',
                'indikator' => [
                    'Rendahnya frekuensi mangkir dan/atau izin dalam jam kerja untuk urusan non kedinasan.'
                ]
            ],
            [
                'aspek' => 'Aspek perilaku',
                'jenis' => 'umum',
                'nama' => 'Komitmen',
                'deskripsi' => 'Kesungguhan dalam menjalankan tugas dan tanggung jawab secara konsisten.',
                'indikator' => [
                    'Menunjukkan komitmen yang tinggi terhadap pengembangan diri dan institusi.'
                ]
            ],
            [
                'aspek' => 'Aspek perilaku',
                'jenis' => 'umum',
                'nama' => 'Penampilan',
                'deskripsi' => 'Sikap dan tampilan pribadi yang mencerminkan profesionalisme di lingkungan kerja.',
                'indikator' => [
                    'Penampilan fisik (cara berpakaian) yang selalu rapi dan sesuai aturan.'
                ]
            ],
            [
                'aspek' => 'Aspek perilaku',
                'jenis' => 'umum',
                'nama' => 'Etika dan Kesopanan',
                'deskripsi' => 'Sikap hormat dan sopan dalam berinteraksi dengan rekan kerja maupun pihak lain.',
                'indikator' => [
                    'Kemampuan dalam menerapkan standar perilaku yang sesuai dengan norma adat, agama, dan etika instansi dalam berinteraksi dengan semua pihak.'
                ]
            ],
            [
                'aspek' => 'Aspek perilaku',
                'jenis' => 'umum',
                'nama' => 'Kejujuran',
                'deskripsi' => 'Perilaku yang mencerminkan integritas dan tidak menyembunyikan kebenaran.',
                'indikator' => [
                    'Menyampaikan segala sesuatu dan berperilaku secara apa adanya (truthfully)',
                    'Konsistensi antara ucapan dan tindakan.'
                ]
            ],
            [
                'aspek' => 'Aspek perilaku',
                'jenis' => 'umum',
                'nama' => 'Loyalitas',
                'deskripsi' => 'Kesetiaan terhadap organisasi serta dukungan terhadap visi dan misi instansi.',
                'indikator' => [
                    'Menjalankan perintah atasan dengan segala upaya.',
                    'Tidak membantah, menolak, atau melakukan pembangkangan terhadap perintah atasan.',
                    'Bangga dengan pekerjaannya dan bersungguh-sungguh penuh terhadap penyelesaian pekerjaannya.'
                ]
            ],
        ];

        foreach ($data as $key => $value) {
            Kriteria::create([
                'slug' => Str::slug($value['aspek'] . '-' . $value['nama'], '-'),
                'jenis' => $value['jenis'],
                'aspek' => $value['aspek'],
                'nama' => $value['nama'],
                'deskripsi' => $value['deskripsi'],
                'indikator' => $value['indikator'],
            ]);
        }
    }
}
