import { Button } from '@/components/ui/button';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useToast } from '@/hooks/use-toast';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

function App() {
    const [dataFile1, setDataFile1] = useState([]);
    const [dataFile2, setDataFile2] = useState([]);

    const handleFileUpload1 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const transformed = [];
            for (let i = 1; i < rawData.length; i++) {
                const row = rawData[i];
                const idPegawai = row[0];
                const pegawai = row[1];
                const idAtasan = row[2];
                const atasan = row[3];
                const idUser = row[4];
                const user = row[5];
                const idRekanKerja = row[6];
                const rekanKerja = row[7];

                if (atasan) {
                    transformed.push({
                        pegawai,
                        idPegawai,
                        type: 'atasan',
                        penilai: atasan,
                        idPenilai: idAtasan,
                    });
                }

                if (user) {
                    transformed.push({
                        pegawai,
                        idPegawai,
                        type: 'penerima_layanan',
                        penilai: user,
                        idPenilai: idUser,
                    });
                }

                if (rekanKerja) {
                    transformed.push({
                        pegawai,
                        idPegawai,
                        type: 'teman',
                        penilai: rekanKerja,
                        idPenilai: idRekanKerja,
                    });
                }
            }
            setDataFile1(transformed);
        };
        reader.readAsArrayBuffer(file);
    };

    const handleFileUpload2 = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const rawData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            const transformed = [];
            for (let i = 1; i < rawData.length; i++) {
                const row = rawData[i];
                transformed.push({
                    id: row[0],
                    name: row[1],
                    email: row[2],
                    jabatan: row[3],
                    lokasi_kerja: row[4],
                    nip: row[5],
                    unit_kerja: row[6],
                    perusahaan: row[7],
                    role: row[8],
                });
            }
            setDataFile2(transformed);
        };
        reader.readAsArrayBuffer(file);
    };

    const exportUsers = (data: any) => {
        router.post(route('user.export'), data, {
            onSuccess: () => {
                toast({
                    title: 'Import berhasil',
                    description: 'Outsourcing, Penerima Layanan dan Atasan berhasil di idmport',
                });
            },
            onError: (er) => {
                console.log(er);
            },
            onFinish: () => {
                router.get(route('dashboard'));
                setDataFile2([]);
            },
        });
    };

    const exportPenugasan = (data: any) => {
        router.post(route('penugasan.export'), data, {
            onSuccess: () => {
                toast({
                    title: 'Import berhasil',
                    description: 'Penugasan penilaian berhasil di import',
                });
            },
            onError: (er) => {
                console.log(er);
            },
            onFinish: () => {
                router.get(route('dashboard'));
            },
        });
    };
    const { toast } = useToast();

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();

        router.post(
            route('logout'),
            {},
            {
                onSuccess: () => {
                    toast({
                        title: 'Logout Berhasil',
                        description: 'Anda telah keluar dari sistem',
                    });
                },
            },
        );
    };

    return (
        <>
            <Head title="Sistem Penilaian Kinerja Outsourcing" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-blue-600 p-2">
                                    <Settings className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Dashboard Administrator</h1>
                                    <p className="text-sm text-gray-500">Sistem Penilaian Kinerja Outsourcing</p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-transparent hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="min-h-screen bg-gray-50 p-8">
                    <div className="rounded-x mx-auto max-w-6xl space-y-8">
                        <Link href={route('dashboard')}>
                            <Button variant="ghost" className="mb-4 flex items-center space-x-2 border">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali</span>
                            </Button>
                        </Link>
                    </div>

                    <div className="mx-auto max-w-6xl space-y-8 rounded-xl bg-white p-6 shadow-md">
                        <h1 className="text-2xl font-bold text-gray-800">Transform Excel Data</h1>

                        {/* Input Excel 1 */}
                        <div>
                            <h2 className="mb-2 text-lg font-semibold">Upload File Users</h2>
                            <input
                                type="file"
                                accept=".xlsx"
                                onChange={handleFileUpload2}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                            />

                            {dataFile2.length > 0 && (
                                <>
                                    <div className="mt-2 text-sm text-gray-700">Showing {dataFile2.length} rows</div>
                                    <div className="mt-2 max-h-[600px] overflow-auto rounded-md border">
                                        <table className="min-w-full border-collapse text-left text-sm">
                                            <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                                <tr>
                                                    <th className="border px-2 py-2 text-center">ID</th>
                                                    <th className="border px-2 py-2">NAME</th>
                                                    <th className="border px-2 py-2">EMAIL</th>
                                                    <th className="border px-2 py-2">JABATAN</th>
                                                    <th className="border px-2 py-2">LOKASI KERJA</th>
                                                    <th className="border px-2 py-2">NIP</th>
                                                    <th className="border px-2 py-2">UNIT KERJA</th>
                                                    <th className="border px-2 py-2">PERUSAHAAN</th>
                                                    <th className="border px-2 py-2">ROLE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataFile2.map((row, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="border px-2 py-2 text-center">{row.id}</td>
                                                        <td className="border px-2 py-2">{row.name}</td>
                                                        <td className="border px-2 py-2">{row.email}</td>
                                                        <td className="border px-2 py-2">{row.jabatan}</td>
                                                        <td className="border px-2 py-2">{row.lokasi_kerja}</td>
                                                        <td className="border px-2 py-2">{row.nip}</td>
                                                        <td className="border px-2 py-2">{row.unit_kerja}</td>
                                                        <td className="border px-2 py-2">{row.perusahaan}</td>
                                                        <td className="border px-2 py-2">{row.role}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Button
                                        onClick={() => exportUsers(dataFile2, 2)}
                                        className="mt-3 rounded-sm bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                    >
                                        Export ke DB
                                    </Button>
                                </>
                            )}
                        </div>

                        {/* Input Excel 3 */}
                        <div>
                            <h2 className="mb-2 text-lg font-semibold">Upload File Penugasan</h2>
                            <input
                                type="file"
                                accept=".xlsx"
                                onChange={handleFileUpload1}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                            />

                            {dataFile1.length > 0 && (
                                <>
                                    <div className="mt-2 text-sm text-gray-700">Showing {dataFile1.length} transformed rows</div>
                                    <div className="mt-2 max-h-[600px] overflow-auto rounded-md border">
                                        <table className="min-w-full border-collapse text-left text-sm">
                                            <thead className="sticky top-0 bg-gray-100 text-gray-700">
                                                <tr>
                                                    <th className="border px-2 py-2 text-center">NO</th>
                                                    <th className="border px-2 py-2 text-center">ID - PEGAWAI</th>
                                                    <th className="border px-2 py-2">PEGAWAI</th>
                                                    <th className="border px-2 py-2">PENILAI</th>
                                                    <th className="border px-2 py-2 text-center">ID - PENILAI</th>
                                                    <th className="border px-2 py-2">TYPE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataFile1.map((row, index) => (
                                                    <tr key={index} className="hover:bg-gray-50">
                                                        <td className="border px-2 py-2 text-center">{index + 1}</td>
                                                        <td className="border px-2 py-2 text-center">{row.idPegawai}</td>
                                                        <td className="border px-2 py-2">{row.pegawai}</td>
                                                        <td className="border px-2 py-2">{row.penilai}</td>
                                                        <td className="border px-2 py-2 text-center">{row.idPenilai}</td>
                                                        <td className="border px-2 py-2">{row.type}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Button
                                        onClick={() => exportPenugasan(dataFile1, 1)}
                                        className="mt-3 rounded-sm bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                    >
                                        Export ke DB
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
