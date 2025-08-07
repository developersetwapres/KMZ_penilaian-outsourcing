import { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
    const [transformedData, setTransformedData] = useState([]);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const transformed = [];

            for (let i = 1; i < rawData.length; i++) {
                const row = rawData[i];

                const no = row[0];
                const pegawai = row[1];
                const atasan = row[2];
                const user = row[3];
                const rekanKerja = row[4];

                if (atasan) {
                    transformed.push({ no, pegawai, type: 'Atasan', penilai: atasan });
                }

                if (user) {
                    transformed.push({ no, pegawai, type: 'User', penilai: user });
                }

                if (rekanKerja) {
                    transformed.push({ no, pegawai, type: 'Rekan Kerja', penilai: rekanKerja });
                }
            }

            setTransformedData(transformed);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleExport = () => {
        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'TransformedData');
        XLSX.writeFile(workbook, `Transformed-${fileName}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="mx-auto max-w-4xl space-y-6 rounded-xl bg-white p-6 shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Transform Excel Data</h1>

                <input
                    type="file"
                    accept=".xlsx"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />

                {transformedData.length > 0 && (
                    <>
                        <div className="text-sm text-gray-700">Showing {transformedData.length} transformed rows</div>

                        <div className="max-h-[400px] overflow-auto rounded-md border">
                            <table className="min-w-full border-collapse text-left text-sm">
                                <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                    <tr>
                                        <th className="border px-4 py-2">NO</th>
                                        <th className="border px-4 py-2">ID</th>
                                        <th className="border px-4 py-2">PEGAWAI</th>
                                        <th className="border px-4 py-2">TYPE</th>
                                        <th className="border px-4 py-2">PENILAI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transformedData.map((row, index) => (
                                        <tr key={index} className="hover:bg-gray-50">
                                            <td className="border px-4 py-2">{index + 1}</td>
                                            <td className="border px-4 py-2">{row.no}</td>
                                            <td className="border px-4 py-2">{row.pegawai}</td>
                                            <td className="border px-4 py-2">{row.type}</td>
                                            <td className="border px-4 py-2">{row.penilai}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <button onClick={handleExport} className="mt-4 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                            Download as Excel
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default App;
