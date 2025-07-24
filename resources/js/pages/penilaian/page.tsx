'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Head } from '@inertiajs/react';
import { ArrowRight, Building2, ClipboardList, Shield, Users } from 'lucide-react';
import { useState } from 'react';

export default function HomePage() {
    const [showLogin, setShowLogin] = useState(false);

    if (showLogin) {
        window.location.href = '/login';
        return null;
    }

    return (
        <>
            <Head title="Sistem Penilaian Kinerja Outsourcing" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
                <div className="container mx-auto px-4 py-16">
                    <div className="mb-12 text-center">
                        <div className="mb-6 flex justify-center">
                            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-lg">
                                <ClipboardList className="h-12 w-12 text-white" />
                            </div>
                        </div>
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">Sistem Penilaian Kinerja</h1>
                        <p className="mb-2 text-xl text-gray-600">Tenaga Kerja Outsourcing</p>
                        <p className="mx-auto mb-8 max-w-2xl text-gray-500">
                            Platform terintegrasi untuk mengelola dan melakukan penilaian kinerja pegawai outsourcing dengan sistem evaluasi yang
                            komprehensif dan terstruktur.
                        </p>

                        <Card
                            className="group mx-auto max-w-md cursor-pointer border-2 transition-all duration-300 hover:border-blue-200 hover:shadow-xl"
                            onClick={() => setShowLogin(true)}
                        >
                            <CardHeader className="pb-4 text-center">
                                <div className="mx-auto mb-4 w-fit rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-4 transition-transform group-hover:scale-110">
                                    <Shield className="h-8 w-8 text-white" />
                                </div>
                                <CardTitle className="text-2xl text-blue-700">Masuk ke Sistem</CardTitle>
                                <CardDescription className="text-base">Login untuk mengakses dashboard Anda</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-center space-x-2 font-medium text-blue-600">
                                    <span>Klik untuk login</span>
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Features Section */}
                    <div className="mx-auto mt-16 max-w-6xl">
                        <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">Fitur Unggulan Sistem</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="rounded-xl bg-white p-6 text-center shadow-md">
                                <div className="mx-auto mb-4 w-fit rounded-full bg-blue-100 p-3">
                                    <ClipboardList className="h-6 w-6 text-blue-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">Evaluasi Terstruktur</h3>
                                <p className="text-sm text-gray-600">Sistem penilaian dengan 3 aspek utama: Teknis, Perilaku, dan Penilaian Lain</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 text-center shadow-md">
                                <div className="mx-auto mb-4 w-fit rounded-full bg-green-100 p-3">
                                    <Users className="h-6 w-6 text-green-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">Multi-Level Evaluator</h3>
                                <p className="text-sm text-gray-600">Penilaian dari 3 tingkatan: Kepala Biro, Kepala Bagian, dan Teman Setingkat</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 text-center shadow-md">
                                <div className="mx-auto mb-4 w-fit rounded-full bg-purple-100 p-3">
                                    <Building2 className="h-6 w-6 text-purple-600" />
                                </div>
                                <h3 className="mb-2 font-semibold text-gray-900">Manajemen Terpusat</h3>
                                <p className="text-sm text-gray-600">Dashboard admin untuk mengelola master data dan melihat rekap hasil</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
