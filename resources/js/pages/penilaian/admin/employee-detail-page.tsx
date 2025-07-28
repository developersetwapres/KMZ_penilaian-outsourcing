'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Award, BarChart3, Calculator, FileText, MessageCircle, Users } from 'lucide-react';
import { useState } from 'react';

// Updated dummy data with 3 evaluators for all employees
const evaluationResult = [
    {
        id: '1',
        name: 'Ahmad Rizki',
        unit_kerja: 'IT Support',
        jabatan: 'Technical Support',
        image: '/placeholder.svg?height=60&width=60&text=AR',
        evaluatorScores: [
            {
                evaluatorName: 'Dr. Andi Wijaya',
                type: 'atasan',
                weight: 0.5,
                criteriaScores: {
                    'teknis-1': 85,
                    'teknis-2': 80,
                    'perilaku-1': 75,
                    'perilaku-2': 82,
                },
                aspectScores: {
                    'aspek-teknis': 82.5,
                    'aspek-perilaku': 78.5,
                },
                overallScore: 80.5,
                notes: 'Kinerja yang konsisten dengan kemampuan teknis yang baik. Perlu peningkatan dalam aspek komunikasi tim.',
                evaluationDate: '2024-01-15',
            },
            {
                evaluatorName: 'Mirawati',
                type: 'penerima_layanan',
                weight: 0.3,
                criteriaScores: {
                    'teknis-1': 88,
                    'teknis-2': 85,
                    'perilaku-1': 80,
                    'perilaku-2': 83,
                },
                aspectScores: {
                    'aspek-teknis': 86.5,
                    'aspek-perilaku': 81.5,
                },
                overallScore: 84.0,
                notes: 'Layanan teknis yang memuaskan, responsif terhadap kebutuhan klien. Komunikasi bisa lebih proaktif.',
                evaluationDate: '2024-01-12',
            },
            {
                evaluatorName: 'Budi Santoso',
                type: 'outsourcing',
                weight: 0.2,
                criteriaScores: {
                    'teknis-1': 78,
                    'teknis-2': 82,
                    'perilaku-1': 85,
                    'perilaku-2': 88,
                },
                aspectScores: {
                    'aspek-teknis': 80.0,
                    'aspek-perilaku': 86.5,
                },
                overallScore: 83.25,
                notes: 'Rekan kerja yang sangat kooperatif dan mudah diajak bekerja sama. Selalu siap membantu tim.',
                evaluationDate: '2024-01-10',
            },
        ],
        weightedOverallScore: 81.575,
        status: 'completed',
    },
    {
        id: '2',
        name: 'Siti Nurhaliza',
        unit_kerja: 'Human Resources',
        jabatan: 'HR Assistant',
        image: '/placeholder.svg?height=60&width=60&text=SN',
        evaluatorScores: [
            {
                evaluatorName: 'Dr. Andi Wijaya',
                type: 'atasan',
                weight: 0.5,
                criteriaScores: {
                    'teknis-1': 88,
                    'teknis-2': 85,
                    'perilaku-1': 90,
                    'perilaku-2': 92,
                },
                aspectScores: {
                    'aspek-teknis': 86.5,
                    'aspek-perilaku': 91.0,
                },
                overallScore: 88.75,
                notes: 'Kinerja yang sangat memuaskan dengan kemampuan interpersonal yang excellent. Role model untuk tim.',
                evaluationDate: '2024-01-12',
            },
            {
                evaluatorName: 'Divisi Operasional',
                type: 'penerima_layanan',
                weight: 0.3,
                criteriaScores: {
                    'teknis-1': 82,
                    'teknis-2': 85,
                    'perilaku-1': 88,
                    'perilaku-2': 90,
                },
                aspectScores: {
                    'aspek-teknis': 83.5,
                    'aspek-perilaku': 89.0,
                },
                overallScore: 86.25,
                notes: 'Pelayanan HR yang sangat baik, selalu responsif dan membantu menyelesaikan masalah karyawan.',
                evaluationDate: '2024-01-11',
            },
            {
                evaluatorName: 'Linda Sari',
                type: 'outsourcing',
                weight: 0.2,
                criteriaScores: {
                    'teknis-1': 85,
                    'teknis-2': 88,
                    'perilaku-1': 87,
                    'perilaku-2': 89,
                },
                aspectScores: {
                    'aspek-teknis': 86.5,
                    'aspek-perilaku': 88.0,
                },
                overallScore: 87.25,
                notes: 'Sangat profesional dan detail dalam bekerja. Komunikasi yang efektif dengan semua level.',
                evaluationDate: '2024-01-10',
            },
        ],
        weightedOverallScore: 87.625, // (88.75*0.5) + (86.25*0.3) + (87.25*0.2)
        status: 'completed',
    },
    {
        id: '3',
        name: 'Budi Santoso',
        unit_kerja: 'Finance',
        jabatan: 'Accounting Staff',
        image: '/placeholder.svg?height=60&width=60&text=BS',
        evaluatorScores: [
            {
                evaluatorName: 'Dra. Sari Dewi',
                type: 'atasan',
                weight: 0.5,
                criteriaScores: {
                    'teknis-1': 70,
                    'teknis-2': 68,
                    'perilaku-1': 72,
                    'perilaku-2': 75,
                },
                aspectScores: {
                    'aspek-teknis': 69.0,
                    'aspek-perilaku': 73.5,
                },
                overallScore: 71.25,
                notes: 'Perlu peningkatan dalam penguasaan teknologi dan inisiatif. Namun menunjukkan komitmen yang baik.',
                evaluationDate: '2024-01-08',
            },
            {
                evaluatorName: 'Divisi Keuangan Internal',
                type: 'penerima_layanan',
                weight: 0.3,
                criteriaScores: {
                    'teknis-1': 65,
                    'teknis-2': 70,
                    'perilaku-1': 75,
                    'perilaku-2': 78,
                },
                aspectScores: {
                    'aspek-teknis': 67.5,
                    'aspek-perilaku': 76.5,
                },
                overallScore: 72.0,
                notes: 'Pelayanan akuntansi cukup baik, namun perlu peningkatan kecepatan dalam penyelesaian laporan.',
                evaluationDate: '2024-01-07',
            },
            {
                evaluatorName: 'Ahmad Rizki',
                type: 'outsourcing',
                weight: 0.2,
                criteriaScores: {
                    'teknis-1': 68,
                    'teknis-2': 72,
                    'perilaku-1': 80,
                    'perilaku-2': 82,
                },
                aspectScores: {
                    'aspek-teknis': 70.0,
                    'aspek-perilaku': 81.0,
                },
                overallScore: 75.5,
                notes: 'Rekan kerja yang baik dan mudah diajak kerjasama. Selalu membantu ketika diminta.',
            },
        ],
        weightedOverallScore: 72.225, // (71.25*0.5) + (72.0*0.3) + (75.5*0.2)
        status: 'completed',
    },
];

export default function EmployeeDetailPage({ evaluationResults }: any) {
    const [activeTab, setActiveTab] = useState('rekap');
    console.log(evaluationResults);

    const employee = evaluationResults;

    if (!employee) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Card className="w-96">
                    <CardContent className="py-12 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h2>
                        <p className="mb-6 text-gray-600">Pegawai dengan ID tersebut tidak ditemukan dalam sistem.</p>
                        <Button>
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Hasil
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 91) return 'text-green-600';
        if (score >= 76) return 'text-blue-600';
        if (score >= 51) return 'text-orange-600';
        return 'text-red-600';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 91) return 'Sangat Baik';
        if (score >= 76) return 'Baik';
        if (score >= 51) return 'Kurang';
        return 'Sangat Kurang';
    };

    const getScoreBadgeColor = (score: number) => {
        if (score >= 91) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 76) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (score >= 51) return 'bg-orange-100 text-orange-800 border-orange-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    return (
        <>
            <Head title="Sistem Penilaian Kinerja Outsourcing" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-4">
                                <Link href={route('dashboard')}>
                                    <Button variant="ghost" className="flex items-center space-x-2">
                                        <ArrowLeft className="h-4 w-4" />
                                        <span>Kembali ke Hasil</span>
                                    </Button>
                                </Link>
                                <div className="h-6 w-px bg-gray-300"></div>
                                <div className="flex items-center space-x-3">
                                    <img
                                        src={employee.image || '/placeholder.svg'}
                                        alt={employee.name}
                                        className="h-10 w-10 rounded-full border-2 border-blue-200"
                                    />
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">{employee.name}</h1>
                                        <p className="text-sm text-gray-600">
                                            {employee.jabatan} • {employee.unit_kerja}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* Navigation Tabs */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="mb-5 grid w-full grid-cols-4 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                                <TabsTrigger
                                    value="rekap"
                                    className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    <FileText className="h-4 w-4" />
                                    <span className="hidden sm:inline">Rekap</span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="peraspek"
                                    className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    <Users className="h-4 w-4" />
                                    <span className="hidden sm:inline">Detail</span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="chart"
                                    className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    <MessageCircle className="h-4 w-4" />
                                    <span className="hidden sm:inline">Catatan Ket.</span>
                                </TabsTrigger>

                                <TabsTrigger
                                    value="detail"
                                    className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                                >
                                    <Award className="h-4 w-4" />
                                    <span className="hidden sm:inline">Quection</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Tab Content: Rekap */}
                            <TabsContent value="rekap" className="space-y-6">
                                <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <img
                                                    src={employee.image || '/placeholder.svg'}
                                                    alt={employee.name}
                                                    className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                                                />
                                                <div>
                                                    <CardTitle className="mb-2 text-3xl">{employee.name}</CardTitle>
                                                    <CardDescription className="text-lg text-indigo-100">
                                                        {employee.jabatan} • {employee.unit_kerja}
                                                    </CardDescription>
                                                    <div className="mt-4 flex items-center space-x-4">
                                                        <Badge
                                                            className={
                                                                employee.status === 'completed'
                                                                    ? 'border-green-400 bg-green-500 text-white'
                                                                    : 'border-yellow-400 bg-yellow-500 text-white'
                                                            }
                                                        >
                                                            {employee.status === 'completed' ? 'Evaluasi Selesai' : 'Dalam Progress'}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="mb-2 text-6xl font-bold">{employee.weightedOverallScore.toFixed(2)}</div>
                                                <Badge className={`${getScoreBadgeColor(employee.weightedOverallScore)} border-2 px-4 py-2 text-lg`}>
                                                    {getScoreLabel(employee.weightedOverallScore)}
                                                </Badge>
                                                <p className="mt-2 text-indigo-100">Nilai Akhir Berbobot</p>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>

                                {/* Rekap Aspek Berbobot Card - NEW */}
                                <Card className="gap-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3">
                                            <BarChart3 className="h-6 w-6" />
                                            <span>Rekap Nilai per Aspek</span>
                                        </CardTitle>
                                        <CardDescription>Ringkasan nilai berbobot untuk setiap aspek penilaian dari semua evaluator</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                                            {/* Aspek Teknis */}
                                            <div className="transform rounded-xl border-2 border-blue-300 bg-gradient-to-br from-blue-400 to-blue-700 p-6 px-8 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                                <div className="text-center">
                                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                        <Calculator className="h-8 w-8" />
                                                    </div>
                                                    <h3 className="mb-2 text-xl font-bold">Aspek Teknis</h3>
                                                    <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                                                        Penguasaan & Kualitas Kerja
                                                    </div>
                                                    <div className="mb-4 rounded-4xl bg-white/10 p-4 backdrop-blur-sm">
                                                        <div className="mb-1 text-sm opacity-90">Nilai Akhir</div>
                                                        <div className="text-4xl font-bold">
                                                            {employee.evaluatorScores
                                                                .reduce((sum, e) => sum + e.aspectScores['aspek-teknis'] * e.weight, 0)
                                                                .toFixed(2)}
                                                        </div>
                                                        <div className="mt-1 text-xs opacity-75">Dari semua evaluator</div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Aspek Perilaku */}
                                            <div className="transform rounded-xl border-2 border-emerald-300 bg-gradient-to-br from-green-400 to-green-700 p-6 px-8 text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                                                <div className="text-center">
                                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                        <Users className="h-8 w-8" />
                                                    </div>
                                                    <h3 className="mb-2 text-xl font-bold">Aspek Perilaku</h3>
                                                    <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                                                        Disiplin & Kerjasama
                                                    </div>
                                                    <div className="mb-4 rounded-4xl bg-white/10 p-4 backdrop-blur-sm">
                                                        <div className="mb-1 text-sm opacity-90">Nilai Akhir</div>
                                                        <div className="text-4xl font-bold">
                                                            {employee.evaluatorScores
                                                                .reduce((sum, e) => sum + e.aspectScores['aspek-perilaku'] * e.weight, 0)
                                                                .toFixed(2)}
                                                        </div>
                                                        <div className="mt-1 text-xs opacity-75">Dari semua evaluator</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card className="gap-0 shadow-xl">
                                    <CardHeader>
                                        <CardTitle className="flex items-center space-x-3">
                                            <Users className="h-5 w-5" />
                                            <span>Rekap Nilai Akhir per Evaluator</span>
                                        </CardTitle>
                                        <CardDescription>
                                            Hasil akhir penilaian dari setiap evaluator setelah dikalikan dengan bobot masing-masing
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                            {employee.evaluatorScores.map((evaluator, index) => {
                                                const evaluatorType =
                                                    evaluator.type === 'atasan'
                                                        ? 'Atasan'
                                                        : evaluator.type === 'penerima_layanan'
                                                          ? 'Penerima Layanan'
                                                          : 'Outsourcing';

                                                const weightedScore = evaluator.overallScore * evaluator.weight;

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`transform rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                                                    >
                                                        <div className="text-center">
                                                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-200 text-blue-800 backdrop-blur-sm">
                                                                <span className="text-2xl font-bold">{index + 1}</span>
                                                            </div>
                                                            <h3 className="mb-2 text-xl font-bold text-blue-600">{evaluator.evaluatorName}</h3>
                                                            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 backdrop-blur-sm">
                                                                {evaluatorType}
                                                            </div>
                                                            <div className="mb-4 rounded-4xl bg-white p-4 backdrop-blur-sm">
                                                                <div className="mb-1 text-sm text-blue-600 opacity-90">Nilai Berbobot</div>
                                                                <div className="text-4xl font-bold text-blue-800">{weightedScore.toFixed(2)}</div>
                                                                <div className="mt-1 text-xs text-blue-500">
                                                                    {evaluator.overallScore.toFixed(1)} × {(evaluator.weight * 100).toFixed(0)}%
                                                                </div>
                                                            </div>
                                                            <div className="text-sm text-blue-600 opacity-90">
                                                                Bobot: <span className="font-bold">{(evaluator.weight * 100).toFixed(0)}%</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Tab Content: Perbandingan */}
                            <TabsContent value="peraspek" className="space-y-6">
                                {/* Weighted Scoring Info */}
                                <Card className="border-blue-200 bg-blue-50 pt-0 pb-6">
                                    <CardContent className="pt-6">
                                        <div className="mb-4 flex items-center space-x-2">
                                            <Calculator className="h-6 w-6 text-blue-600" />
                                            <span className="text-lg font-bold text-blue-800">Bobot Nilai</span>
                                        </div>
                                        <div className="grid grid-cols-3 gap-6">
                                            <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-800">50%</div>
                                                <div className="font-medium text-blue-700">Atasan</div>
                                                <div className="text-sm text-blue-600">Bobot Tertinggi</div>
                                            </div>
                                            <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-800">30%</div>
                                                <div className="font-medium text-blue-700">Penerima Layanan</div>
                                                <div className="text-sm text-blue-600">Bobot Menengah</div>
                                            </div>
                                            <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-800">20%</div>
                                                <div className="font-medium text-blue-700">Outsourcing</div>
                                                <div className="text-sm text-blue-600">Bobot Terendah</div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Perhitungan Berbobot per Aspek - REDESIGNED */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Aspek Teknis */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-xl text-blue-800">Aspek Teknis </CardTitle>
                                            <CardDescription>Penguasaan teknologi dan kualitas kerja dengan perhitungan bobot</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {employee.evaluatorScores.map((evaluator, index) => {
                                                    const originalScore = evaluator.aspectScores['aspek-teknis-dan-hasil-kerja'];

                                                    const weightedScore = originalScore * evaluator.weight;
                                                    const evaluatorType =
                                                        evaluator.type === 'atasan'
                                                            ? 'Atasan'
                                                            : evaluator.type === 'penerima_layanan'
                                                              ? 'Penerima Layanan'
                                                              : 'Outsourcing';

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="rounded-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-blue-100 p-6"
                                                        >
                                                            <div className="mb-4 flex items-center justify-between">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-blue-800">{evaluator.evaluatorName}</h4>
                                                                    <p className="text-sm text-blue-600">{evaluatorType}</p>
                                                                </div>
                                                            </div>

                                                            {/* Original Score - Secondary */}
                                                            <div className="mb-4 flex items-center justify-between rounded-sm bg-white p-3 text-sm">
                                                                <span className="text-gray-600">Score Inputan:</span>
                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`text-lg font-bold ${getScoreColor(originalScore)}`}>
                                                                        {originalScore}
                                                                    </span>
                                                                    <Badge className={`${getScoreBadgeColor(originalScore)} text-xs`}>
                                                                        {getScoreLabel(originalScore)}
                                                                    </Badge>
                                                                </div>
                                                            </div>

                                                            {/* Weighted Score - MOST PROMINENT */}
                                                            <div className="rounded-4xl bg-white p-4 text-center">
                                                                {/* Formula */}
                                                                <div className="mb-2 text-center font-mono text-xs text-blue-600">
                                                                    {originalScore} × {(evaluator.weight * 100).toFixed(0)}% =
                                                                </div>

                                                                <div className={`text-4xl font-bold text-red-500`}>{weightedScore.toFixed(2)}</div>
                                                                <div className="mt-1 text-xs text-blue-500">Kontribusi ke nilai akhir</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {/* Total Aspek Teknis Berbobot */}
                                                <div className="rounded-lg border border-blue-400 bg-gradient-to-r from-blue-100 to-blue-200 p-6">
                                                    <div className="text-center">
                                                        <h4 className="mb-2 text-xl font-bold text-blue-800">Total Aspek Teknis</h4>
                                                        <div className="mb-2 text-5xl font-bold text-blue-900">
                                                            {employee.evaluatorScores
                                                                .reduce((sum, e) => sum + e.aspectScores['aspek-teknis'] * e.weight, 0)
                                                                .toFixed(2)}
                                                        </div>
                                                        <p className="text-blue-700">Hasil Penjumlahan Berbobot</p>
                                                        <div className="mt-2 text-xs text-blue-600">
                                                            {employee.evaluatorScores
                                                                .map((e, i) => `${(e.aspectScores['aspek-teknis'] * e.weight).toFixed(2)}`)
                                                                .join(' + ')}{' '}
                                                            ={' '}
                                                            {employee.evaluatorScores
                                                                .reduce((sum, e) => sum + e.aspectScores['aspek-teknis'] * e.weight, 0)
                                                                .toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Aspek Perilaku */}
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="text-xl text-green-800">Aspek Perilaku </CardTitle>
                                            <CardDescription>Disiplin, kerjasama dan komunikasi dengan perhitungan bobot</CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-4">
                                                {employee.evaluatorScores.map((evaluator, index) => {
                                                    const originalScore = evaluator.aspectScores['aspek-perilaku'];
                                                    console.log(originalScore);

                                                    const weightedScore = originalScore * evaluator.weight;
                                                    const evaluatorType =
                                                        evaluator.type === 'atasan'
                                                            ? 'Atasan'
                                                            : evaluator.type === 'penerima_layanan'
                                                              ? 'Penerima Layanan'
                                                              : 'Outsourcing';

                                                    return (
                                                        <div
                                                            key={index}
                                                            className="rounded-lg border-2 border-green-200 bg-gradient-to-r from-green-50 to-green-100 p-6"
                                                        >
                                                            <div className="mb-4 flex items-center justify-between">
                                                                <div>
                                                                    <h4 className="text-lg font-bold text-green-800">{evaluator.evaluatorName}</h4>
                                                                    <p className="text-sm text-green-600">{evaluatorType}</p>
                                                                </div>
                                                            </div>

                                                            {/* Original Score - Secondary */}
                                                            <div className="mb-4 flex items-center justify-between rounded-sm bg-white p-3 text-sm">
                                                                <span className="text-gray-600">Score Inputan:</span>
                                                                <div className="flex items-center space-x-2">
                                                                    <span className={`text-lg font-bold ${getScoreColor(originalScore)}`}>
                                                                        {originalScore}
                                                                    </span>
                                                                    <Badge className={`${getScoreBadgeColor(originalScore)} text-xs`}>
                                                                        {getScoreLabel(originalScore)}
                                                                    </Badge>
                                                                </div>
                                                            </div>

                                                            {/* Weighted Score - MOST PROMINENT */}
                                                            <div className="rounded-4xl bg-white p-4 text-center">
                                                                {/* Formula */}
                                                                <div className="mb-2 text-center font-mono text-xs text-green-600">
                                                                    {originalScore} × {(evaluator.weight * 100).toFixed(0)}% =
                                                                </div>

                                                                <div className="text-4xl font-bold text-red-500">{weightedScore.toFixed(2)}</div>
                                                                <div className="mt-1 text-xs text-green-500">Kontribusi ke nilai akhir</div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}

                                                {/* Total Aspek Perilaku Berbobot */}
                                                <div className="rounded-lg border border-green-400 bg-gradient-to-r from-green-100 to-green-200 p-6">
                                                    <div className="text-center">
                                                        <h4 className="mb-2 text-xl font-bold text-green-800">Total Aspek Perilaku</h4>
                                                        <div className="mb-2 text-5xl font-bold text-green-900">
                                                            {employee.evaluatorScores
                                                                .reduce((sum, e) => sum + e.aspectScores['aspek-perilaku'] * e.weight, 0)
                                                                .toFixed(2)}
                                                        </div>
                                                        <p className="text-green-700">Hasil Penjumlahan Berbobot</p>
                                                        <div className="mt-2 text-xs text-green-600">
                                                            {employee.evaluatorScores
                                                                .map((e, i) => `${(e.aspectScores['aspek-perilaku'] * e.weight).toFixed(2)}`)
                                                                .join(' + ')}{' '}
                                                            ={' '}
                                                            {employee.evaluatorScores
                                                                .reduce((sum, e) => sum + e.aspectScores['aspek-perilaku'] * e.weight, 0)
                                                                .toFixed(2)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Tab Content: Chart */}
                            <TabsContent value="chart" className="space-y-6">
                                {/* Evaluator Notes and Feedback */}
                                <Card className="gap-0 py-0 shadow-xl">
                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 py-5 pl-7">
                                        <CardTitle className="flex items-center space-x-3 text-gray-800">
                                            <FileText className="h-7 w-7 text-blue-600" />
                                            <span>Catatan dan Feedback dari Penilai</span>
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            Konstruktif dari masing-masing penilai untuk pengembangan kinerja
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-8">
                                        <div className="space-y-6">
                                            {employee.evaluatorScores.map((evaluator, index) => {
                                                const evaluatorType =
                                                    evaluator.type === 'atasan'
                                                        ? 'Atasan'
                                                        : evaluator.type === 'penerima_layanan'
                                                          ? 'Penerima Layanan'
                                                          : 'Outsourcing';

                                                const cardColor =
                                                    evaluator.type === 'atasan'
                                                        ? 'border-l-red-500 bg-red-50'
                                                        : evaluator.type === 'penerima_layanan'
                                                          ? 'border-l-blue-500 bg-blue-50'
                                                          : 'border-l-green-500 bg-green-50';

                                                const badgeColor =
                                                    evaluator.type === 'atasan'
                                                        ? 'bg-red-100 text-red-800 border-red-200'
                                                        : evaluator.type === 'penerima_layanan'
                                                          ? 'bg-blue-100 text-blue-800 border-blue-200'
                                                          : 'bg-green-100 text-green-800 border-green-200';

                                                return (
                                                    <div
                                                        key={index}
                                                        className={`rounded-r-xl border-l-4 ${cardColor} p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}
                                                    >
                                                        <div className="mb-4 flex items-start justify-between">
                                                            <div className="flex items-center space-x-4">
                                                                <div className="flex-shrink-0">
                                                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md">
                                                                        <span className="text-lg font-bold text-gray-700">{index + 1}</span>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <h5 className="text-xl font-bold text-gray-800">{evaluator.evaluatorName}</h5>
                                                                    <div className="mt-1 flex items-center space-x-3">
                                                                        <Badge className={`${badgeColor} border font-medium`}>{evaluatorType}</Badge>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="rounded-lg border bg-white p-4 shadow-sm">
                                                            <div className="flex items-start space-x-3">
                                                                <div className="mt-1 flex-shrink-0">
                                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                                                                        <span className="text-sm text-yellow-600">💬</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h6 className="mb-2 font-semibold text-gray-800">Catatan Evaluasi:</h6>
                                                                    <p className="leading-relaxed text-gray-700 italic">"{evaluator.notes}"</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            {/* Tab Content: Detail */}
                            <TabsContent value="detail" className="space-y-6">
                                {/* Detailed Evaluation Scores */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Detail Penilaian</CardTitle>
                                        <CardDescription>Detail penilaian dari setiap penilai untuk aspek teknis dan perilaku</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {employee.evaluatorScores.map((evaluator, index) => {
                                                const evaluatorType =
                                                    evaluator.type === 'atasan'
                                                        ? 'Atasan'
                                                        : evaluator.type === 'penerima_layanan'
                                                          ? 'Penerima Layanan'
                                                          : 'Outsourcing';

                                                return (
                                                    <div key={index} className="rounded-lg border-2 border-gray-200 bg-white p-6">
                                                        <div className="mb-4 flex items-center justify-between">
                                                            <div>
                                                                <h4 className="text-lg font-bold text-gray-800">{evaluator.evaluatorName}</h4>
                                                                <p className="text-sm text-gray-600">{evaluatorType}</p>
                                                            </div>
                                                            <div className="text-center">
                                                                <div className="mb-1 text-sm text-gray-600">Bobot</div>
                                                                <div className="text-2xl font-bold text-gray-800">
                                                                    {(evaluator.weight * 100).toFixed(0)}%
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-6">
                                                            {/* Aspek Teknis */}
                                                            <div>
                                                                <h5 className="text-md font-bold text-gray-800">Aspek Teknis</h5>
                                                                <div className="mt-2 flex items-center justify-between rounded border bg-gray-100 p-3 text-sm">
                                                                    <span className="text-gray-600">Score Inputan:</span>
                                                                    <div className="flex items-center space-x-2">
                                                                        <span
                                                                            className={`text-lg font-bold ${getScoreColor(evaluator.aspectScores['aspek-teknis'])}`}
                                                                        >
                                                                            {evaluator.aspectScores['aspek-teknis']}
                                                                        </span>
                                                                        <Badge
                                                                            className={`${getScoreBadgeColor(evaluator.aspectScores['aspek-teknis'])} text-xs`}
                                                                        >
                                                                            {getScoreLabel(evaluator.aspectScores['aspek-teknis'])}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3 text-center font-mono text-xs text-gray-600">
                                                                    {evaluator.aspectScores['aspek-teknis']} × {evaluator.weight.toFixed(0)}% ={' '}
                                                                    {(evaluator.aspectScores['aspek-teknis'] * evaluator.weight).toFixed(2)}
                                                                </div>
                                                            </div>

                                                            {/* Aspek Perilaku */}
                                                            <div>
                                                                <h5 className="text-md font-bold text-gray-800">Aspek Perilaku</h5>
                                                                <div className="mt-2 flex items-center justify-between rounded border bg-gray-100 p-3 text-sm">
                                                                    <span className="text-gray-600">Score Inputan:</span>
                                                                    <div className="flex items-center space-x-2">
                                                                        <span
                                                                            className={`text-lg font-bold ${getScoreColor(evaluator.aspectScores['aspek-perilaku'])}`}
                                                                        >
                                                                            {evaluator.aspectScores['aspek-perilaku']}
                                                                        </span>
                                                                        <Badge
                                                                            className={`${getScoreBadgeColor(evaluator.aspectScores['aspek-perilaku'])} text-xs`}
                                                                        >
                                                                            {getScoreLabel(evaluator.aspectScores['aspek-perilaku'])}
                                                                        </Badge>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-3 text-center font-mono text-xs text-gray-600">
                                                                    {evaluator.aspectScores['aspek-perilaku']} × {evaluator.weight.toFixed(0)}% ={' '}
                                                                    {(evaluator.aspectScores['aspek-perilaku'] * evaluator.weight).toFixed(2)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-6">
                                                            <h5 className="text-md font-bold text-gray-800">Catatan:</h5>
                                                            <p className="mt-2 text-gray-600">{evaluator.notes}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </>
    );
}
