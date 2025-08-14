import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Head, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { FormEventHandler, useState } from 'react';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Email tidak valid'),
    password: z.string().min(1, 'Password harus diisi'),
});

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { toast } = useToast();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => {
                reset('password');

                toast({
                    title: 'Login Berhasil',
                    description: `Selamat datang, NAME APP`,
                });
            },
        });
    };

    return (
        <>
            <Head title="Sistem Penilaian Kinerja Outsourcing" />
            {/* Header */}
            <header className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-3">
                            <div className="max-w-17 p-2">
                                <AppLogoIcon />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">Sistem Penilaian</h1>
                                <p className="text-sm text-gray-500">Kinerja Outsourcing Setwapres RI</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-16">
                    <div className="mb-12 text-center">
                        <div className="mb-11">
                            <div className="mb-6 flex justify-center">
                                <div className="max-w-17">
                                    <AppLogoIcon />
                                </div>
                            </div>
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">Sistem Penilaian Kinerja</h1>
                            <p className="mb-2 text-xl text-gray-600">Tenaga Kerja Outsourcing</p>
                            <p className="mx-auto mb-8 max-w-2xl text-gray-500">
                                Platform terintegrasi untuk mengelola dan melakukan penilaian kinerja pegawai outsourcing dengan sistem evaluasi yang
                                komprehensif dan terstruktur.
                            </p>
                        </div>
                        <div className="mx-auto max-w-md">
                            <Card className="gap-0 border-0 shadow-xl">
                                <CardHeader className="pb-6 text-center">
                                    <div className="mx-auto mb-4 w-fit rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                                        <Shield className="h-8 w-8 text-white" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">Login Sistem</CardTitle>
                                    <CardDescription>Masukkan kredensial Anda untuk mengakses sistem</CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form onSubmit={submit} className="space-y-4">
                                        <div className="space-y-2 text-left">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                autoComplete="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                placeholder="Masukkan Email"
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                                        </div>

                                        <div className="space-y-2 text-left">
                                            <Label htmlFor="password">Password</Label>
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Masukkan password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    value={data.password}
                                                    onChange={(e) => setData('password', e.target.value)}
                                                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4 text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-4 w-4 text-gray-400" />
                                                    )}
                                                </Button>
                                            </div>
                                            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                checked={data.remember}
                                                onClick={() => setData('remember', !data.remember)}
                                                tabIndex={3}
                                            />
                                            <Label htmlFor="remember">Remember me</Label>
                                        </div>

                                        <Button
                                            type="submit"
                                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Memproses...' : 'Masuk'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Features Section */}
                        {/* <div className="mx-auto mt-16 max-w-6xl">
                            <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Fitur Unggulan Sistem</h2>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="rounded-xl bg-white p-6 text-center shadow-md">
                                    <div className="mx-auto mb-4 w-fit rounded-full bg-blue-100 p-3">
                                        <ClipboardList className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900">Evaluasi Terstruktur</h3>
                                    <p className="text-sm text-gray-600">
                                        Sistem penilaian dengan 3 aspek utama: Teknis, Perilaku, dan Penilaian Lain
                                    </p>
                                </div>
                                <div className="rounded-xl bg-white p-6 text-center shadow-md">
                                    <div className="mx-auto mb-4 w-fit rounded-full bg-green-100 p-3">
                                        <Users className="h-6 w-6 text-green-600" />
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900">Multi-Level Evaluator</h3>
                                    <p className="text-sm text-gray-600">
                                        Penilaian dari 3 tingkatan: Kepala Biro, Kepala Bagian, dan Teman Setingkat
                                    </p>
                                </div>
                                <div className="rounded-xl bg-white p-6 text-center shadow-md">
                                    <div className="mx-auto mb-4 w-fit rounded-full bg-purple-100 p-3">
                                        <Building2 className="h-6 w-6 text-purple-600" />
                                    </div>
                                    <h3 className="mb-2 font-semibold text-gray-900">Manajemen Terpusat</h3>
                                    <p className="text-sm text-gray-600">Dashboard admin untuk mengelola master data dan melihat rekap hasil</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
