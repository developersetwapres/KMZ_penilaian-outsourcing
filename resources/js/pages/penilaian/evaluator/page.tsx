'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { CheckCircle, ClipboardList, Clock, LogOut, User } from 'lucide-react';

export default function EvaluatorPage({ penugasanPeer }: any) {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;

    const { toast } = useToast();

    const setSelectedEmployee = (idPenugasanPeer: number, idOutsourching: number, nameOutsourching: string) => {
        router.post(
            route('evaluator.create'),
            {
                idPenugasanPeer: idPenugasanPeer,
                idOutsourching: idOutsourching,
                nameOutsourching: nameOutsourching,
            },
            {
                onError: (err) => {
                    console.log(err);
                },
            },
        );
    };

    const viewScores = (idPenugasanPeer: number) => {
        router.post(route('evaluator.viewscore'), {
            idPenugasanPeer: idPenugasanPeer,
        });
    };

    const handleLogout = () => {
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
                                <div className="rounded-lg bg-green-600 p-2">
                                    <ClipboardList className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Dashboard Penilai</h1>
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

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* User Profile Card - Simplified */}
                        <Card className="bg-gradient-to-r from-green-500 to-green-600 py-5 text-white">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <img src={`/storage/${user.image}`} alt={user.name} className="h-17 w-17 rounded-full" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
                                        <CardDescription className="text-green-100">
                                            {user.role
                                                .replace(/_/g, ' ') // ubah _ jadi spasi
                                                .replace(/\b\w/g, (char) => char.toUpperCase())}{' '}
                                            - {user.jabatan}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>

                        {/* Search and Stats */}
                        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Daftar Pegawai yang Dinilai</h2>
                                <p className="text-gray-600">
                                    {user.type === 'outsourcing'
                                        ? 'Pegawai teman setingkat yang harus Anda nilai'
                                        : `Pegawai outsourcing yang harus dinilai`}
                                </p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-blue-600">{penugasanPeer?.length}</div>
                                    <div className="text-sm text-gray-500">Total Pegawai</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">
                                        {penugasanPeer?.filter((emp: any) => emp.status === 'completed').length}
                                    </div>
                                    <div className="text-sm text-gray-500">Selesai</div>
                                </div>
                            </div>
                        </div>

                        {/* Creative Employee Cards */}
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {penugasanPeer?.map((employee: any) => (
                                <Card
                                    key={employee.id}
                                    className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-blue-50 pb-2 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                >
                                    {/* Status Badge - Floating */}
                                    <div className="absolute top-4 right-4 z-10">
                                        <Badge
                                            variant={employee.status === 'completed' ? 'default' : 'secondary'}
                                            className={`flex items-center space-x-1 px-3 py-1 shadow-lg ${
                                                employee.status === 'completed'
                                                    ? 'bg-green-500 text-white hover:bg-green-600'
                                                    : 'bg-orange-500 text-white hover:bg-orange-600'
                                            }`}
                                        >
                                            {employee.status === 'completed' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            <span className="text-xs font-medium">{employee.status == 'completed' ? 'Selesai' : 'Belum'}</span>
                                        </Badge>
                                    </div>

                                    {/* Decorative Background Pattern */}
                                    <div className="absolute inset-0 opacity-5">
                                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-blue-500"></div>
                                        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-indigo-500"></div>
                                    </div>

                                    <CardContent className="relative z-10 p-8 text-center">
                                        {/* Photo with Decorative Ring */}
                                        <div className="relative mb-4">
                                            <img
                                                src={`/storage/${employee.outsourcing.image}` || '/placeholder.svg'}
                                                alt={employee.outsourcing.name}
                                                className="mx-auto h-27 w-27 rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Name with Gradient Text */}
                                        <h3 className="mb-1 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600">
                                            {employee.outsourcing.name}
                                        </h3>

                                        {/* Position with Icon */}
                                        <div className="mb-6 flex items-center justify-center space-x-2">
                                            <p className="text-sm font-medium text-gray-600">{employee.outsourcing.jabatan}</p>
                                        </div>

                                        {/* Action Button with Gradient */}
                                        <Button
                                            onClick={() =>
                                                employee.status === 'completed'
                                                    ? viewScores(employee.id)
                                                    : setSelectedEmployee(employee.id, employee.outsourcing.id, employee.outsourcing.name)
                                            }
                                            className={`w-full transform py-3 font-semibold text-white shadow-lg transition-all duration-300 group-hover:scale-105 ${
                                                employee.status === 'completed'
                                                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                                                    : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700'
                                            }`}
                                        >
                                            <div className="flex items-center justify-center space-x-2">
                                                <ClipboardList className="h-4 w-4" />
                                                <span>{employee.status === 'completed' ? 'Lihat Penilaian' : 'Mulai Penilaian'}</span>
                                            </div>
                                        </Button>
                                    </CardContent>

                                    {/* Hover Effect Overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                </Card>
                            ))}
                        </div>

                        {penugasanPeer?.length === 0 && (
                            <Card className="border-0 bg-gradient-to-br from-gray-50 to-blue-50 py-16 text-center shadow-lg">
                                <CardContent>
                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                            <User className="h-32 w-32 text-gray-400" />
                                        </div>
                                        <div className="relative z-10">
                                            <div className="mx-auto mb-4 w-fit rounded-full bg-white p-4 shadow-lg">
                                                <User className="h-12 w-12 text-gray-400" />
                                            </div>
                                            <h3 className="mb-2 text-xl font-bold text-gray-900">
                                                {penugasanPeer?.length === 0 ? 'Tidak ada pegawai yang ditugaskan' : 'Tidak ada pegawai ditemukan'}
                                            </h3>
                                            <p className="mx-auto max-w-md text-gray-500">
                                                {penugasanPeer?.length === 0
                                                    ? 'Hubungi administrator untuk penugasan penilaian pegawai outsourcing'
                                                    : 'Coba ubah kata kunci pencarian Anda atau periksa filter yang digunakan'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}
