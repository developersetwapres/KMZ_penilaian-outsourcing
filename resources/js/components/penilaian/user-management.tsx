'use client';

import type React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router, usePage } from '@inertiajs/react';
import { Building2, Crown, Edit, Eye, EyeOff, Mail, MapPin, Phone, Plus, Search, Shield, Trash2, Upload, User, UserCog, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

const roleOptions = [
    { value: 'admin', label: 'Administrator', icon: Shield, color: 'bg-red-100 text-red-800' },
    { value: 'atasan', label: 'Atasan', icon: Crown, color: 'bg-purple-100 text-purple-800' },
    { value: 'penerima_layanan', label: 'Penerima Layanan', icon: UserCog, color: 'bg-blue-100 text-blue-800' },
    { value: 'outsourcing', label: 'Outsourcing', icon: Users, color: 'bg-green-100 text-green-800' },
];

const unitOptions = [
   'Biro Umum',
'Biro Protokol dan Kerumahtanggaan',
'Biro TUSDM',
'Biro Perencanaan dan Keuangan',
'Deputi Bidang Dukungan KPPP',
'Deputi Bidang Dukungan KPKPSDM',
'BPMI',
'Asdep Tata Kelola Pemerintahan dan Perepatan Pembangunan Daerah',
'Asdep Pemberdayaan Masyarakat dan Penanggulangan Bencana',
'Badan Teknologi, Data dan Informasi',
'Asdep Infrastruktur, Sumber Daya Alam, dan Pembangunan Kewilayahan',
'Deputi Bidang Administrasi',
'Asdep Ekonomi, Keuangan dan Transformasi Digital',
'Asdep Politik, Keamanan, Hukum dan Hak Asasi Manusia',
'Asdep Hubungan Luar Negeri dan Pertahanan ',
'Asdep Industri, Perdagangan, Pariwisata dan Ekonomi Kreatif',
'Sekretaris Wakil Presiden',
'Asdep Pengentasan Kemiskinan dan Pembangunan Desa',
'Deputi Bidang Dukungan Kebijakan Perekonomian, Pariwisata dan Transformasi Digital',
'Deputi Bidang Dukungan Kebijakan Peningkatan Kesejahteraan dan Pembangunan Sumber Daya Manusia',
'Kepala BPMI',
'Asdep Pendidikan, Agama, Kebudayaan, Pemuda dan Olahraga',
'Asdep Kesehatan, Gizi dan Pembangunan Keluarga',
'Biro Umum Setneg',
'Biro Pers, Media, dan Informasi',
];

export default function UserManagement({ initialUsers }: any) {
    const { flash } = usePage().props;
    const imageUrl = flash.pathTemp;

    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [filterRole, setFilterRole] = useState('all');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        jabatan: '',
        lokasi_kerja: '',
        unit_kerja: '',
        perusahaan: '',
        role: '',
        phone: '',
        status: 'active',
        image: '',
        password: '',
    });

    useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    useEffect(() => {
        if (imageUrl) {
            setFormData((prev) => ({
                ...prev,
                image: imageUrl,
            }));
        }
    }, [imageUrl]);

    const filteredUsers = users.filter((user: any) => {
        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.unit_kerja.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.jabatan.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const handleAdd = () => {
        setEditingUser(null);
        setFormData({
            name: '',
            email: '',
            jabatan: '',
            lokasi_kerja: '',
            unit_kerja: '',
            perusahaan: '',
            role: '',
            phone: '',
            status: 'active',
            image: '',
            password: '',
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (user: any) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            jabatan: user.jabatan,
            lokasi_kerja: user.lokasi_kerja,
            unit_kerja: user.unit_kerja,
            perusahaan: user.perusahaan,
            role: user.role,
            phone: user.phone,
            status: user.status,
            image: user.image,
            password: '',
        });
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        //
    };

    const handleSave = () => {
        if (editingUser) {
            router.put(route('user.update', editingUser.id), formData, {
                onSuccess: () => {
                    //
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        } else {
            router.post(route('user.store'), formData, {
                onSuccess: () => {
                    //
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }

        setIsDialogOpen(false);
    };

    const getRoleInfo = (role: string) => {
        return roleOptions.find((r) => r.value === role) || roleOptions[0];
    };

    const toggleUserStatus = (id: number) => {
        const user = users.find((u: any) => u.id === id);

        const newStatus = user?.status === 'active' ? 'inactive' : 'active';

        setUsers(users.map((user: any) => (user.id === id ? { ...user, status: newStatus } : user)));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            router.post(
                route('upload.temp'),
                { image: file },
                {
                    onSuccess: () => {
                        setFormData({ ...formData, image: imageUrl });
                    },
                    onError: (err) => {
                        console.error('Image upload failed:', err);
                    },
                },
            );
        }
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
                        Kelola user sistem: Administrator, Atasan, Penerima Layanan dan Outsourcing.
                    </CardDescription>
                </CardHeader>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {roleOptions.map((role) => {
                    const count = users.filter((u: any) => u.role === role.value).length;
                    const Icon = role.icon;
                    return (
                        <Card key={role.value} className="py-2">
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
                            <CardTitle className="text-lg">Daftar User</CardTitle>
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
                        {filteredUsers.map((user: any) => {
                            const roleInfo = getRoleInfo(user.role);
                            const Icon = roleInfo.icon;

                            return (
                                <Card key={user.id} className="transition-shadow hover:shadow-lg">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Avatar className="h-12 w-12">
                                                    <AvatarImage src={`/storage/${user.image}` || '/placeholder.svg'} alt={user.name} />
                                                    <AvatarFallback>
                                                        {user.name
                                                            .split(' ')
                                                            .map((n: any) => n[0])
                                                            .join('')
                                                            .substring(0, 2)
                                                            .toUpperCase()}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle className="text-lg">{user.name}</CardTitle>
                                                    <CardDescription className="flex items-center space-x-1">
                                                        <div className={`rounded-full p-1 ${roleInfo.color}`}>
                                                            <Icon className="h-3 w-3" />
                                                        </div>
                                                        <span>{user.jabatan}</span>
                                                    </CardDescription>
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
                                                <span className="truncate">{user.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Building2 className="h-3 w-3" />
                                                <span className="text-xs">{user.unit_kerja}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <MapPin className="h-3 w-3" />
                                                <span className="text-xs">{user.lokasi_kerja}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-3 w-3" />
                                                <span>{user.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-xs font-medium">Perusahaan:</span>
                                                <span className="text-xs">{user.perusahaan}</span>
                                            </div>
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
                <DialogContent className="max-h-[80vh] gap-0.5 overflow-y-auto sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>{editingUser ? 'Edit User' : 'Tambah User Baru'}</DialogTitle>
                        <DialogDescription>{editingUser ? 'Edit informasi user' : 'Tambahkan user baru ke sistem'}</DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <Label htmlFor="image">Foto Profil</Label>
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={`/storage/${formData.image}` || '/placeholder.svg'} alt="Preview" />
                                    <AvatarFallback>
                                        {formData.name
                                            ? formData.name
                                                  .split(' ')
                                                  .map((n) => n[0])
                                                  .join('')
                                                  .substring(0, 2)
                                                  .toUpperCase()
                                            : 'U'}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => document.getElementById('image')?.click()}
                                        className="flex items-center space-x-2"
                                    >
                                        <Upload className="h-4 w-4" />
                                        <span>Upload Foto</span>
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama Lengkap</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Masukkan nama lengkap"
                                />
                            </div>
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="jabatan">Jabatan</Label>
                                <Input
                                    id="jabatan"
                                    value={formData.jabatan}
                                    onChange={(e) => setFormData({ ...formData, jabatan: e.target.value })}
                                    placeholder="Masukkan jabatan"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih unit kerja" />
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="lokasi_kerja">Lokasi Kerja</Label>
                                <Input
                                    id="lokasi_kerja"
                                    value={formData.lokasi_kerja}
                                    onChange={(e) => setFormData({ ...formData, lokasi_kerja: e.target.value })}
                                    placeholder="Masukkan Lokasi Kerja"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="unit_kerja">Unit Kerja</Label>
                                <Select value={formData.unit_kerja} onValueChange={(value) => setFormData({ ...formData, unit_kerja: value })}>
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
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="perusahaan">Perusahaan</Label>
                                <Input
                                    id="perusahaan"
                                    value={formData.perusahaan}
                                    onChange={(e) => setFormData({ ...formData, perusahaan: e.target.value })}
                                    placeholder="Masukkan perusahaan"
                                />
                            </div>
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

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder={editingUser ? 'Kosongkan jika tidak ingin mengubah' : 'Masukkan password'}
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                </div>
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
