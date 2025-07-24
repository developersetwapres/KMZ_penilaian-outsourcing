'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EvaluationForm from '@/pages/penilaian/evaluator/evaluation-form';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCircle, ClipboardList, Clock, LogOut, User } from 'lucide-react';
import { useState } from 'react';

// Updated dummy employees data with simplified display
const employees = [
    {
        id: 1,
        name: 'Ahmad Rizki Pratama',
        email: 'ahmad.rizki@company.com',
        jabatan: 'Technical Support Specialist',
        lokasi_kerja: 'Gedung A Lt. 3',
        unit_kerja: 'Bagian Teknologi Informasi',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567890',
        image: '/image/user.png', // Placeholder for photo
        status: 'draft',
        assignedTo: ['kepala-biro', 'kepala-bagian', 'out001'],
    },
    {
        id: 2,
        name: 'Siti Nurhaliza',
        email: 'siti.nurhaliza@company.com',
        jabatan: 'HR Assistant',
        lokasi_kerja: 'Gedung B Lt. 2',
        unit_kerja: 'Biro Sumber Daya Manusia',
        perusahaan: 'PT Manpower Solutions',
        phone: '081234567891',
        image: '/image/user.png',
        status: 'completed',
        assignedTo: ['kepala-biro', 'out002'],
    },
    {
        id: 3,
        name: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        jabatan: 'Finance Assistant',
        lokasi_kerja: 'Gedung C Lt. 1',
        unit_kerja: 'Bagian Keuangan',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567892',
        image: '/image/user.png',
        status: 'draft',
        assignedTo: ['kepala-biro', 'kepala-bagian'],
    },
    {
        id: 4,
        name: 'Maya Sari Dewi',
        email: 'maya.sari@company.com',
        jabatan: 'Marketing Assistant',
        lokasi_kerja: 'Gedung D Lt. 2',
        unit_kerja: 'Bagian Pemasaran',
        perusahaan: 'PT Manpower Solutions',
        phone: '081234567893',
        image: '/image/user.png',
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
        (emp) => emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.jabatan.toLowerCase().includes(searchTerm.toLowerCase()),
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
                    <Card className="bg-gradient-to-r from-green-500 to-green-600 py-5 text-white">
                        <CardHeader>
                            <div className="flex items-center space-x-4">
                                <div className="rounded-full bg-white/20 p-3">
                                    <img src={`/storage/${user.image}`} alt={user.name} className="h-17 w-17 rounded-full" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
                                    <CardDescription className="text-green-100">{user.jabatan}</CardDescription>
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
                    {/* <div className="relative w-full sm:w-80">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Cari pegawai atau jabatan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div> */}

                    {/* Simplified Employees Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredEmployees.map((employee) => (
                            <Card key={employee.id} className="gap-0 border-l-4 border-l-blue-500 py-2 transition-all duration-300 hover:shadow-lg">
                                <CardContent className="p-6 text-center">
                                    {/* Photo */}
                                    <div className="mb-4">
                                        <img
                                            src={`/storage/${employee.image}`}
                                            alt={employee.name}
                                            className="mx-auto h-20 w-20 rounded-full border-4 border-blue-100"
                                        />
                                    </div>

                                    {/* Name */}
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{employee.name}</h3>

                                    {/* Position */}
                                    <p className="mb-4 text-sm text-gray-600">{employee.jabatan}</p>

                                    {/* Status Badge */}
                                    <div className="mb-4">
                                        <Badge
                                            variant={employee.status === 'completed' ? 'default' : 'secondary'}
                                            className="flex w-full items-center justify-center space-x-1 py-2"
                                        >
                                            {employee.status === 'completed' ? <CheckCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                                            <span>{employee.status === 'completed' ? 'Selesai' : 'Belum Dinilai'}</span>
                                        </Badge>
                                    </div>

                                    {/* Action Button */}
                                    <Button
                                        onClick={() => setSelectedEmployee(employee.id)}
                                        className="w-full"
                                        variant={employee.status === 'completed' ? 'outline' : 'default'}
                                    >
                                        <ClipboardList className="mr-2 h-4 w-4" />
                                        {employee.status === 'completed' ? 'Lihat Penilaian' : 'Mulai Penilaian'}
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredEmployees.length === 0 && (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <User className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">
                                    {assignedEmployees.length === 0 ? 'Tidak ada pegawai yang ditugaskan' : 'Tidak ada pegawai ditemukan'}
                                </h3>
                                <p className="text-gray-500">
                                    {assignedEmployees.length === 0
                                        ? 'Hubungi administrator untuk penugasan penilaian'
                                        : 'Coba ubah kata kunci pencarian Anda'}
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </main>
        </div>
    );
}
