'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle, Building, Building2, CheckCircle, Edit, Mail, MapPin, Phone, Search, UserPlus, Users } from 'lucide-react';
import { useState } from 'react';

// Enhanced dummy data for outsourcing employees with database fields
const outsourcingEmployees = [
    {
        id: 1,
        name: 'Ahmad Rizki Pratama',
        email: 'ahmad.rizki@company.com',
        jabatan: 'Technical Support Specialist',
        lokasi_kerja: 'Gedung A Lt. 3',
        unit_kerja: 'Bagian Teknologi Informasi',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567890',
        joinDate: '2023-01-15',
        peerEvaluator: 3, // Ahmad Fauzi
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
        joinDate: '2023-02-01',
        peerEvaluator: 4, // Linda Sari
    },
    {
        id: 3,
        name: 'Ahmad Fauzi',
        email: 'ahmad.fauzi@company.com',
        jabatan: 'IT Support Specialist',
        lokasi_kerja: 'Gedung A Lt. 3',
        unit_kerja: 'Bagian Teknologi Informasi',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567892',
        joinDate: '2023-01-20',
        peerEvaluator: 1, // Ahmad Rizki
    },
    {
        id: 4,
        name: 'Linda Sari',
        email: 'linda.sari@company.com',
        jabatan: 'HR Assistant',
        lokasi_kerja: 'Gedung B Lt. 2',
        unit_kerja: 'Biro Sumber Daya Manusia',
        perusahaan: 'PT Manpower Solutions',
        phone: '081234567893',
        joinDate: '2023-02-10',
        peerEvaluator: 2, // Siti Nurhaliza
    },
    {
        id: 5,
        name: 'Budi Santoso',
        email: 'budi.santoso@company.com',
        jabatan: 'Finance Assistant',
        lokasi_kerja: 'Gedung C Lt. 1',
        unit_kerja: 'Bagian Keuangan',
        perusahaan: 'PT Outsourcing Teknologi',
        phone: '081234567894',
        joinDate: '2023-03-01',
        peerEvaluator: null, // No peer assigned yet
    },
    {
        id: 6,
        name: 'Maya Sari Dewi',
        email: 'maya.sari@company.com',
        jabatan: 'Marketing Assistant',
        lokasi_kerja: 'Gedung D Lt. 2',
        unit_kerja: 'Bagian Pemasaran',
        perusahaan: 'PT Manpower Solutions',
        phone: '081234567895',
        joinDate: '2023-03-15',
        peerEvaluator: null, // No peer assigned yet
    },
];

// Automatic assignments for Kepala Biro and Kepala Bagian
const automaticAssignments = {
    'kepala-biro': {
        'Dr. Andi Wijaya': ['Biro Sumber Daya Manusia'],
        'Dr. Bambang Sutrisno': ['Bagian Teknologi Informasi', 'Bagian Keuangan', 'Bagian Pemasaran'],
    },
    'kepala-bagian': {
        'Ir. Sari Dewi': ['Bagian Teknologi Informasi'],
        'Dra. Rina Sari': ['Bagian Keuangan'],
        'S.E. Agus Pratama': ['Bagian Pemasaran'],
    },
};

export default function PeerAssignment() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [selectedPeer, setSelectedPeer] = useState('');
    const { toast } = useToast();

    const filteredEmployees = outsourcingEmployees.filter(
        (emp) =>
            emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.unit_kerja.toLowerCase().includes(searchTerm.toLowerCase()) ||
            emp.perusahaan.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const getAvailablePeers = (currentEmployee: any) => {
        return outsourcingEmployees.filter((emp) => emp.id !== currentEmployee.id && emp.unit_kerja === currentEmployee.unit_kerja);
    };

    const getPeerName = (peerId: number | null) => {
        if (!peerId) return null;
        const peer = outsourcingEmployees.find((emp) => emp.id === peerId);
        return peer?.name || null;
    };

    const handleAssignPeer = () => {
        if (selectedEmployee && selectedPeer) {
            // Update assignment logic here
            console.log(`Assigning peer ${selectedPeer} to evaluate ${selectedEmployee.name}`);

            // Update the employee's peer evaluator
            const employeeIndex = outsourcingEmployees.findIndex((emp) => emp.id === selectedEmployee.id);
            if (employeeIndex !== -1) {
                outsourcingEmployees[employeeIndex].peerEvaluator = Number.parseInt(selectedPeer);
            }

            setIsDialogOpen(false);
            setSelectedEmployee(null);
            setSelectedPeer('');

            // Show success message
            toast({
                title: 'Penugasan Berhasil',
                description: `Berhasil menugaskan ${getPeerName(Number.parseInt(selectedPeer))} untuk menilai ${selectedEmployee.name}`,
            });
        }
    };

    const getUnitColor = (unit: string) => {
        const colors = {
            'Bagian Teknologi Informasi': 'bg-blue-100 text-blue-800',
            'Biro Sumber Daya Manusia': 'bg-green-100 text-green-800',
            'Bagian Keuangan': 'bg-purple-100 text-purple-800',
            'Bagian Pemasaran': 'bg-orange-100 text-orange-800',
        };
        return colors[unit as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Penugasan Evaluator Teman Setingkat</CardTitle>
                    <CardDescription className="text-indigo-100">
                        Kelola penugasan evaluator peer-to-peer untuk pegawai outsourcing. Kepala Biro dan Kepala Bagian ditugaskan secara otomatis
                        berdasarkan unit kerja.
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Automatic Assignment Info */}
            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-lg text-blue-600">
                            <Building2 className="h-5 w-5" />
                            <span>Penugasan Otomatis - Kepala Biro</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.entries(automaticAssignments['kepala-biro']).map(([name, units]) => (
                            <div key={name} className="rounded-lg bg-blue-50 p-3">
                                <div className="font-medium text-blue-900">{name}</div>
                                <div className="mt-1 text-sm text-blue-700">Menilai semua outsourcing di: {units.join(', ')}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2 text-lg text-green-600">
                            <Building2 className="h-5 w-5" />
                            <span>Penugasan Otomatis - Kepala Bagian</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {Object.entries(automaticAssignments['kepala-bagian']).map(([name, units]) => (
                            <div key={name} className="rounded-lg bg-green-50 p-3">
                                <div className="font-medium text-green-900">{name}</div>
                                <div className="mt-1 text-sm text-green-700">Menilai outsourcing di: {units.join(', ')}</div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Peer Assignment Management */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Manajemen Penugasan Teman Setingkat</CardTitle>
                            <CardDescription>Atur siapa yang menilai siapa di antara pegawai outsourcing dalam unit yang sama</CardDescription>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {outsourcingEmployees.filter((emp) => emp.peerEvaluator).length}
                                </div>
                                <div className="text-sm text-gray-500">Sudah Ditugaskan</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {outsourcingEmployees.filter((emp) => !emp.peerEvaluator).length}
                                </div>
                                <div className="text-sm text-gray-500">Belum Ditugaskan</div>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Search */}
                    <div className="relative mb-6 w-full sm:w-80">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                        <Input
                            placeholder="Cari pegawai, unit, atau perusahaan..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    {/* Employee Cards */}
                    <div className="space-y-4">
                        {filteredEmployees.map((employee) => {
                            const peerName = getPeerName(employee.peerEvaluator);
                            const availablePeers = getAvailablePeers(employee);

                            return (
                                <Card key={employee.id} className="border-l-4 border-l-indigo-500">
                                    <CardContent className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-3 flex items-center space-x-3">
                                                    <div className="rounded-full bg-indigo-100 p-2">
                                                        <Users className="h-5 w-5 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-semibold text-gray-900">{employee.name}</h3>
                                                        <p className="text-gray-600">{employee.jabatan}</p>
                                                    </div>
                                                </div>

                                                <div className="grid gap-4 text-sm text-gray-600 md:grid-cols-2">
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <Building2 className="h-4 w-4" />
                                                            <Badge className={getUnitColor(employee.unit_kerja)}>{employee.unit_kerja}</Badge>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <MapPin className="h-4 w-4" />
                                                            <span>{employee.lokasi_kerja}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Building className="h-4 w-4" />
                                                            <span className="text-xs">{employee.perusahaan}</span>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <div className="flex items-center space-x-2">
                                                            <Phone className="h-4 w-4" />
                                                            <span>{employee.phone}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Mail className="h-4 w-4" />
                                                            <span className="text-xs">{employee.email}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <span className="font-medium">Bergabung:</span>
                                                            <span>{new Date(employee.joinDate).toLocaleDateString('id-ID')}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Peer Assignment Status */}
                                                <div className="mt-4 rounded-lg bg-gray-50 p-3">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <span className="font-medium text-gray-700">Penilai Teman Setingkat:</span>
                                                            {peerName ? (
                                                                <div className="mt-1 flex items-center space-x-2">
                                                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                                                    <span className="font-medium text-green-700">{peerName}</span>
                                                                </div>
                                                            ) : (
                                                                <div className="mt-1 flex items-center space-x-2">
                                                                    <AlertCircle className="h-4 w-4 text-orange-600" />
                                                                    <span className="text-orange-700">Belum ditugaskan</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedEmployee(employee);
                                                                setSelectedPeer(employee.peerEvaluator?.toString() || '');
                                                                setIsDialogOpen(true);
                                                            }}
                                                            className="flex items-center space-x-2"
                                                            disabled={false} // Remove the disabled condition
                                                        >
                                                            {peerName ? <Edit className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                                                            <span>{peerName ? 'Ubah' : 'Tugaskan'}</span>
                                                        </Button>
                                                    </div>

                                                    {availablePeers.length === 0 && (
                                                        <div className="mt-2 text-xs text-gray-500">
                                                            Tidak ada teman setingkat lain di unit yang sama
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredEmployees.length === 0 && (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <Users className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada pegawai ditemukan</h3>
                                <p className="text-gray-500">Coba ubah kata kunci pencarian Anda</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {/* Assignment Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Atur Penilai Teman Setingkat</DialogTitle>
                        <DialogDescription>
                            Pilih teman setingkat untuk menilai <strong>{selectedEmployee?.name}</strong>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {selectedEmployee && (
                            <div>
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <h4 className="mb-2 font-medium text-gray-900">Yang akan dinilai:</h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <div>
                                            <strong>Nama:</strong> {selectedEmployee.name}
                                        </div>
                                        <div>
                                            <strong>Jabatan:</strong> {selectedEmployee.jabatan}
                                        </div>
                                        <div>
                                            <strong>Unit Kerja:</strong> {selectedEmployee.unit_kerja}
                                        </div>
                                        <div>
                                            <strong>Lokasi Kerja:</strong> {selectedEmployee.lokasi_kerja}
                                        </div>
                                        <div>
                                            <strong>Perusahaan:</strong> {selectedEmployee.perusahaan}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700">Pilih Penilai Teman Setingkat:</label>
                                    <Select value={selectedPeer} onValueChange={setSelectedPeer}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih teman setingkat..." />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {getAvailablePeers(selectedEmployee).map((peer) => (
                                                <SelectItem key={peer.id} value={peer.id.toString()}>
                                                    <div className="flex flex-col">
                                                        <span>{peer.name}</span>
                                                        <span className="text-xs text-gray-500">{peer.jabatan}</span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {getAvailablePeers(selectedEmployee).length === 0 && (
                                    <div className="rounded-md border border-yellow-200 bg-yellow-50 p-3">
                                        <p className="text-sm text-yellow-800">
                                            Tidak ada teman setingkat lain di unit yang sama untuk ditugaskan sebagai penilai.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleAssignPeer} disabled={!selectedPeer}>
                            Simpan Penugasan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
