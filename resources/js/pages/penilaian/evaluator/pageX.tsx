'use client';

import EvaluationForm from '@/components/penilaian/evaluation-form';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { Award, CheckCircle, ClipboardList, Clock, LogOut, Search, Star, User } from 'lucide-react';
import { useState } from 'react';

// Updated dummy employees data with simplified display
const employees = [
    {
        id: 1,
        nama: 'Ahmad Rizki Pratama',
        email: 'ahmad.rizki@company.com',
        jabatan: 'Technical Support Specialist',
        lokasi_kerja: 'Gedung A Lt. 3',
        unit_kerja: 'Bagian Teknologi Informasi',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567890',
        foto: '/placeholder.svg?height=120&width=120&text=AR',
        status: 'draft',
        assignedTo: ['kepala-biro', 'kepala-bagian', 'out001'],
    },
    {
        id: 2,
        nama: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@company.com',
        jabatan: 'HR Assistant',
        lokasi_kerja: 'Gedung B Lt. 2',
        unit_kerja: 'Biro Sumber Daya Manusia',
        perusahaan: 'PT Manpower Solutions',
        phone: '081234567891',
        foto: '/placeholder.svg?height=120&width=120&text=SN',
        status: 'completed',
        assignedTo: ['kepala-biro', 'out002'],
    },
    {
        id: 3,
        nama: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        jabatan: 'Finance Assistant',
        lokasi_kerja: 'Gedung C Lt. 1',
        unit_kerja: 'Bagian Keuangan',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567892',
        foto: '/placeholder.svg?height=120&width=120&text=BS',
        status: 'draft',
        assignedTo: ['kepala-biro', 'kepala-bagian'],
    },
    {
        id: 4,
        nama: 'Maya Sari Dewi',
        email: 'maya.sari@company.com',
        jabatan: 'Marketing Assistant',
        lokasi_kerja: 'Gedung D Lt. 2',
        unit_kerja: 'Bagian Pemasaran',
        perusahaan: 'PT Manpower Solutions',
        phone: '081234567893',
        foto: '/placeholder.svg?height=120&width=120&text=MS',
        status: 'draft',
        assignedTo: ['kepala-biro', 'kepala-bagian'],
    },
];

// Peer assignments for outsourcing evaluators
const peerAssignments = {
    out001: [1], // Ahmad Fauzi evaluates Ahmad Rizki
    out002: [2], // Linda Sari evaluates Siti Nurhaliza
};

interface EvaluatorDashboardProps {
    user: any;
    onLogout: () => void;
}

export default function EvaluatorPage() {
    const { auth } = usePage<SharedData>().props;

    const user = auth.user;

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

    // Filter employees based on user type
    const getAssignedEmployees = () => {
        if (user.type === 'outsourcing') {
            // Outsourcing only sees assigned peer
            const assignedIds = peerAssignments[user.username as keyof typeof peerAssignments] || [];
            return employees.filter((emp) => assignedIds.includes(emp.id));
        } else if (user.type === 'kepala-bagian') {
            // Kepala Bagian sees employees in their unit
            return employees.filter((emp) => emp.unit_kerja === user.unit);
        } else if (user.type === 'kepala-biro') {
            // Kepala Biro sees all employees in their biro
            return employees.filter((emp) => (emp.unit_kerja.includes('Biro') ? emp.unit_kerja === user.unit : true));
        }
        return [];
    };

    const assignedEmployees = employees;
    const filteredEmployees = assignedEmployees.filter(
        (emp) => emp.nama.toLowerCase().includes(searchTerm.toLowerCase()) || emp.jabatan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (selectedEmployee) {
        const employee = employees.find((emp) => emp.id === selectedEmployee);
        return <EvaluationForm employee={employee!} evaluator={user} onBack={() => setSelectedEmployee(null)} />;
    }

    return (
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
                            // onClick={onLogout}
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
                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <div className="rounded-full bg-white/20 p-3">
                                    <img
                                        src={`/placeholder.svg?height=60&width=60&text=${user.name
                                            .split(' ')
                                            .map((n: string) => n[0])
                                            .join('')}`}
                                        alt={user.name}
                                        className="h-12 w-12 rounded-full"
                                    />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
                                    <CardDescription className="text-green-100">{user.position}</CardDescription>
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
                                <div className="text-2xl font-bold text-blue-600">{assignedEmployees.length}</div>
                                <div className="text-sm text-gray-500">Total Pegawai</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {assignedEmployees.filter((emp) => emp.status === 'completed').length}
                                </div>
                                <div className="text-sm text-gray-500">Selesai</div>
                            </div>
                        </div>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-80">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Cari pegawai atau jabatan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Creative Employee Cards */}
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredEmployees.map((employee) => (
                            <Card
                                key={employee.id}
                                className="group relative overflow-hidden border-0 bg-gradient-to-br from-white to-blue-50 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl"
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
                                        <span className="text-xs font-medium">{employee.status === 'completed' ? 'Selesai' : 'Pending'}</span>
                                    </Badge>
                                </div>

                                {/* Decorative Background Pattern */}
                                <div className="absolute inset-0 opacity-5">
                                    <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-blue-500"></div>
                                    <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-indigo-500"></div>
                                </div>

                                <CardContent className="relative z-10 p-8 text-center">
                                    {/* Photo with Decorative Ring */}
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 scale-110 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-20"></div>
                                        <div className="relative rounded-full bg-white p-2 shadow-lg">
                                            <img
                                                src={employee.foto || '/placeholder.svg'}
                                                alt={employee.nama}
                                                className="mx-auto h-24 w-24 rounded-full border-4 border-white shadow-md transition-transform duration-300 group-hover:scale-110"
                                            />
                                        </div>
                                        {/* Achievement Icon for Completed */}
                                        {employee.status === 'completed' && (
                                            <div className="absolute -right-2 -bottom-2 rounded-full bg-green-500 p-2 text-white shadow-lg">
                                                <Award className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Name with Gradient Text */}
                                    <h3 className="mb-2 bg-gradient-to-r from-gray-800 to-blue-600 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-indigo-600">
                                        {employee.nama}
                                    </h3>

                                    {/* Position with Icon */}
                                    <div className="mb-6 flex items-center justify-center space-x-2">
                                        <Star className="h-4 w-4 text-blue-500" />
                                        <p className="text-sm font-medium text-gray-600">{employee.jabatan}</p>
                                        <Star className="h-4 w-4 text-blue-500" />
                                    </div>

                                    {/* Action Button with Gradient */}
                                    <Button
                                        onClick={() => setSelectedEmployee(employee.id)}
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

                    {filteredEmployees.length === 0 && (
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
                                            {assignedEmployees.length === 0 ? 'Tidak ada pegawai yang ditugaskan' : 'Tidak ada pegawai ditemukan'}
                                        </h3>
                                        <p className="mx-auto max-w-md text-gray-500">
                                            {assignedEmployees.length === 0
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
    );
}
