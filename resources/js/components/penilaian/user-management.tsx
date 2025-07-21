'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Crown, Edit, Mail, Phone, Plus, Search, Shield, Trash2, User, UserCog, Users } from 'lucide-react';
import { useState } from 'react';

// Dummy users data
const initialUsers = [
    {
        id: 1,
        email: 'bambang.sutrisno@company.com',
        name: 'Dr. Bambang Sutrisno',
        nip: '196801011990031001',
        position: 'Administrator Sistem',
        unit: 'Bagian Kepegawaian',
        role: 'admin',
        phone: '081234567890',
        status: 'active',
    },
    {
        id: 2,
        email: 'andi.wijaya@company.com',
        name: 'Dr. Andi Wijaya, M.Si',
        nip: '196505151990031002',
        rank: 'Pembina Tk. I (IV/b)',
        position: 'Kepala Biro SDM',
        unit: 'Biro Sumber Daya Manusia',
        role: 'kepala-biro',
        phone: '081234567891',
        status: 'active',
    },
    {
        id: 3,
        email: 'sari.dewi@company.com',
        name: 'Ir. Sari Dewi, M.T',
        nip: '197203101995032001',
        rank: 'Penata Tk. I (III/d)',
        position: 'Kepala Bagian IT',
        unit: 'Bagian Teknologi Informasi',
        role: 'kepala-bagian',
        phone: '081234567892',
        status: 'active',
    },
    {
        id: 4,
        email: 'ahmad.fauzi@company.com',
        name: 'Ahmad Fauzi',
        nip: 'OUT-2023-001',
        rank: 'Outsourcing',
        position: 'IT Support Specialist',
        unit: 'Bagian Teknologi Informasi',
        role: 'outsourcing',
        phone: '081234567893',
        status: 'active',
    },
    {
        id: 5,
        email: 'linda.sari@company.com',
        name: 'Linda Sari',
        nip: 'OUT-2023-002',
        rank: 'Outsourcing',
        position: 'HR Assistant',
        unit: 'Biro Sumber Daya Manusia',
        role: 'outsourcing',
        phone: '081234567894',
        status: 'active',
    },
];

const roleOptions = [
    { value: 'admin', label: 'Administrator', icon: Shield, color: 'bg-red-100 text-red-800' },
    { value: 'kepala-biro', label: 'Kepala Biro', icon: Crown, color: 'bg-purple-100 text-purple-800' },
    { value: 'kepala-bagian', label: 'Kepala Bagian', icon: UserCog, color: 'bg-blue-100 text-blue-800' },
    { value: 'outsourcing', label: 'Outsourcing', icon: Users, color: 'bg-green-100 text-green-800' },
];

const unitOptions = ['Bagian Kepegawaian', 'Biro Sumber Daya Manusia', 'Bagian Teknologi Informasi', 'Bagian Keuangan', 'Bagian Pemasaran'];

export default function UserManagement() {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [filterRole, setFilterRole] = useState('all');
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        nip: '',
        position: '',
        unit: '',
        role: '',
        phone: '',
        rank: '',
    });

    const filteredUsers = users.filter((user) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.unit.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleAdd = () => {
        setEditingUser(null);
        setFormData({
            email: '',
            name: '',
            nip: '',
            position: '',
            unit: '',
            role: '',
            phone: '',
            rank: '',
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            email: user.email,
            name: user.name,
            nip: user.nip,
            position: user.position,
            unit: user.unit,
            role: user.role,
            phone: user.phone,
            rank: user.rank || '',
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        const userToDelete = users.find((user) => user.id === id);

        if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
            const timestamp = new Date().toISOString();

            console.log('='.repeat(80));
            console.log('🗑️ USER DELETION OPERATION');
            console.log('='.repeat(80));
            console.log('📊 Deletion Overview:', {
                timestamp,
                userId: id,
                userName: userToDelete?.name,
                userRole: userToDelete?.role,
                userEmail: userToDelete?.email,
            });
            console.log('\n👤 User Being Deleted:', userToDelete);
            console.log('\n📈 Before Deletion - Total Users:', users.length);

            setUsers(users.filter((user) => user.id !== id));

            console.log('✅ User Deleted Successfully');
            console.log('📈 After Deletion - Total Users:', users.length - 1);
            console.log('='.repeat(80));
        }
    };

    const handleSave = () => {
        const timestamp = new Date().toISOString();

        const submissionData = {
            timestamp,
            action: editingUser ? 'UPDATE' : 'CREATE',
            editingUser: editingUser,
            formData: formData,
            context: {
                totalUsers: users.length,
                usersByRole: roleOptions.reduce(
                    (acc, role) => {
                        acc[role.value] = users.filter((u) => u.role === role.value).length;
                        return acc;
                    },
                    {} as Record<string, number>,
                ),
            },
        };

        console.log('='.repeat(80));
        console.log(`👤 USER MANAGEMENT ${submissionData.action}`);
        console.log('='.repeat(80));
        console.log('📊 Operation Overview:', {
            timestamp: submissionData.timestamp,
            action: submissionData.action,
            userId: editingUser?.id || 'NEW',
            userName: submissionData.formData.name,
            userRole: submissionData.formData.role,
        });
        console.log('\n📝 Form Data:', submissionData.formData);
        console.log('\n🔄 Before Update:', editingUser || 'Creating new user');
        console.log('\n📈 System Context:', submissionData.context);
        console.log('\n💾 Complete Submission:', JSON.stringify(submissionData, null, 2));

        if (editingUser) {
            // Update existing user
            const updatedUser = { ...editingUser, ...formData };
            setUsers(users.map((user) => (user.id === editingUser.id ? updatedUser : user)));
            console.log('✏️ User Updated:', updatedUser);
        } else {
            // Add new user
            const newUser = {
                id: Math.max(...users.map((u) => u.id)) + 1,
                ...formData,
                status: 'active',
            };
            setUsers([...users, newUser]);
            console.log('➕ New User Created:', newUser);
        }

        console.log('\n📊 Updated Users List:', users.length + (editingUser ? 0 : 1), 'total users');
        console.log('='.repeat(80));

        setIsDialogOpen(false);
    };

    const getRoleInfo = (role: string) => {
        return roleOptions.find((r) => r.value === role) || roleOptions[0];
    };

    const toggleUserStatus = (id: number) => {
        const user = users.find((u) => u.id === id);
        const newStatus = user?.status === 'active' ? 'inactive' : 'active';
        const timestamp = new Date().toISOString();

        console.log('='.repeat(80));
        console.log('🔄 USER STATUS TOGGLE');
        console.log('='.repeat(80));
        console.log('📊 Status Change Overview:', {
            timestamp,
            userId: id,
            userName: user?.name,
            oldStatus: user?.status,
            newStatus: newStatus,
        });
        console.log('\n👤 User Details:', user);

        setUsers(users.map((user) => (user.id === id ? { ...user, status: newStatus } : user)));

        console.log('✅ Status Updated Successfully');
        console.log('='.repeat(80));
    };

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <UserCog className="h-6 w-6" />
                        <span>Manajemen User</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                        Kelola user sistem: Administrator, Kepala Biro, Kepala Bagian, dan Outsourcing
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {roleOptions.map((role) => {
                    const count = users.filter((u) => u.role === role.value).length;
                    const Icon = role.icon;
                    return (
                        <Card key={role.value}>
                            <CardContent className="p-4 text-center">
                                <div className="mb-2 flex items-center justify-center">
                                    <div className={`rounded-full p-2 ${role.color}`}>
                                        <Icon className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="text-2xl font-bold">{count}</div>
                                <div className="text-sm text-gray-600">{role.label}</div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Main Content */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Daftar User</CardTitle>
                            <CardDescription>Kelola semua user dalam sistem</CardDescription>
                        </div>
                        <Button onClick={handleAdd} className="flex items-center space-x-2">
                            <Plus className="h-4 w-4" />
                            <span>Tambah User</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {/* Filters */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input placeholder="Cari user..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                        </div>
                        <Select value={filterRole} onValueChange={setFilterRole}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Filter Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Role</SelectItem>
                                {roleOptions.map((role) => (
                                    <SelectItem key={role.value} value={role.value}>
                                        {role.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Users Grid */}
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {filteredUsers.map((user) => {
                            const roleInfo = getRoleInfo(user.role);
                            const Icon = roleInfo.icon;

                            return (
                                <Card key={user.id} className="transition-shadow hover:shadow-lg">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`rounded-full p-2 ${roleInfo.color}`}>
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-lg">{user.name}</CardTitle>
                                                    <CardDescription>{user.position}</CardDescription>
                                                </div>
                                            </div>
                                            <Badge
                                                variant={user.status === 'active' ? 'default' : 'secondary'}
                                                className="cursor-pointer"
                                                onClick={() => toggleUserStatus(user.id)}
                                            >
                                                {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
                                            </Badge>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-3">
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-3 w-3" />
                                                <span>{user.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium">NIP:</span>
                                                <span>{user.nip}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Building2 className="h-3 w-3" />
                                                <span className="text-xs">{user.unit}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-3 w-3" />
                                                <span>{user.phone}</span>
                                            </div>
                                            {user.rank && (
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-medium">Pangkat:</span>
                                                    <span className="text-xs">{user.rank}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex space-x-2 pt-2">
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                                                <Edit className="h-3 w-3" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => handleDelete(user.id)}
                                                className="hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>

                    {filteredUsers.length === 0 && (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <User className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada user ditemukan</h3>
                                <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'Edit User' : 'Tambah User Baru'}</DialogTitle>
                        <DialogDescription>{editingUser ? 'Edit informasi user' : 'Tambahkan user baru ke sistem'}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="Masukkan email"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {roleOptions.map((role) => (
                                            <SelectItem key={role.value} value={role.value}>
                                                {role.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nama Lengkap</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                placeholder="Masukkan nama lengkap"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="nip">NIP</Label>
                                <Input
                                    id="nip"
                                    value={formData.nip}
                                    onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                                    placeholder="Masukkan NIP"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rank">Pangkat/Golongan</Label>
                                <Input
                                    id="rank"
                                    value={formData.rank}
                                    onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                                    placeholder="Masukkan pangkat/golongan"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="position">Jabatan</Label>
                            <Input
                                id="position"
                                value={formData.position}
                                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                                placeholder="Masukkan jabatan"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="unit">Unit Kerja</Label>
                            <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih unit kerja" />
                                </SelectTrigger>
                                <SelectContent>
                                    {unitOptions.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">No. Telepon</Label>
                                <Input
                                    id="phone"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="Masukkan no. telepon"
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={handleSave}>{editingUser ? 'Update' : 'Simpan'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
