import * as XLSX from 'xlsx';

export default function exportToExcel(evaluationResults: any[]) {
    // 1. Transformasi data agar sesuai dengan kolom yang mau diexport
    const formattedData = evaluationResults.map((item: any) => {
        // Buka evaluatorScores jadi kolom terpisah
        const atasan = item.evaluatorScores.find((e: any) => e.type === 'atasan');
        const penerima = item.evaluatorScores.find((e: any) => e.type === 'penerima_layanan');
        const teman = item.evaluatorScores.find((e: any) => e.type === 'teman');

        return {
            ID: item.id,
            Nama: item.name,
            'Unit Kerja': item.unit_kerja,
            Jabatan: item.jabatan,
            // Atasan: atasan?.evaluatorName ?? '',
            // 'Nilai Atasan': atasan?.averageScore ?? 0,
            // 'Penerima Layanan': penerima?.evaluatorName ?? '',
            // 'Nilai Penerima': penerima?.averageScore ?? 0,
            // Teman: teman?.evaluatorName ?? '',
            // 'Nilai Teman': teman?.averageScore ?? 0,
            'Nilai Akhir': item.weightedOverallScore,
        };
    });

    // 2. Buat worksheet dari data
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // 3. Buat workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    // 4. Simpan sebagai file xlsx
    return XLSX.writeFile(workbook, 'hasil-penilaian.xlsx');
}
