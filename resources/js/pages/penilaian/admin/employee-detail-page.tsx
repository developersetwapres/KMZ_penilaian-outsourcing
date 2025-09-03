'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useToast } from '@/hooks/use-toast';
import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowLeft,
    Award,
    BarChart3,
    Calculator,
    CheckCircle,
    ClipboardList,
    FileText,
    Info,
    LogOut,
    MessageCircle,
    Settings,
    Users,
} from 'lucide-react';
import { useState } from 'react';

// Updated dummy data with 3 evaluators for all employees

// Classification function (untouched)
const getScoreClassification = (score: number) => {
    if (score <= 50) return { label: 'SK (Sangat Kurang)', color: 'bg-red-100 text-red-800 border-red-200', range: '≤50' };
    if (score <= 75) return { label: 'K (Kurang)', color: 'bg-orange-100 text-orange-800 border-orange-200', range: '51-75' };
    if (score <= 90) return { label: 'B (Baik)', color: 'bg-blue-100 text-blue-800 border-blue-200', range: '76-90' };
    return { label: 'SB (Sangat Baik)', color: 'bg-green-100 text-green-800 border-green-200', range: '91-100' };
};

export default function EmployeeDetailPage({ evaluationResults }: any) {
    const [activeTab, setActiveTab] = useState('rekap');
    const employee = evaluationResults;
    const [selectedLevel, setSelectedLevel] = useState<'atasan' | 'penerima_layanan' | 'teman'>('atasan');

    const evaluationData = evaluationResults.evaluatorScores.filter((item: any) => item.type === selectedLevel)[0].criteriaScores;

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

    const aspects = Object.keys(evaluationData);

    // Helper stats for each aspect: total, count, avg (same konsep as evaluation-form.tsx)
    function getAspectStats(aspectKey: string) {
        const aspect = evaluationData[aspectKey as keyof typeof evaluationData];
        if (!aspect) return { total: 0, count: 0, avg: 0 };
        const scoresList = aspect.criteria.map((c: any) => c.score || 0);
        const total = scoresList.reduce((a: number, b: number) => a + b, 0);
        const count = aspect.criteria.length;
        const avg = count ? parseFloat((total / count).toFixed(2)) : 0;
        return { total, count, avg };
    }

    const getScoreColor = (score: number) => {
        if (score >= 91) return 'text-green-600'; // Sangat Baik
        if (score >= 81) return 'text-blue-600'; // Baik
        if (score >= 71) return 'text-yellow-600'; // Butuh Perbaikan
        if (score >= 61) return 'text-orange-600'; // Kurang
        return 'text-red-600'; // Sangat Kurang
    };

    const getScoreLabel = (score: number) => {
        if (score >= 91) return 'Sangat Baik';
        if (score >= 81) return 'Baik';
        if (score >= 71) return 'Butuh Perbaikan';
        if (score >= 61) return 'Kurang';
        return 'Sangat Kurang';
    };

    const getScoreBadgeColor = (score: number) => {
        if (score >= 91) return 'bg-green-100 text-green-800 border-green-200'; // SB
        if (score >= 81) return 'bg-blue-100 text-blue-800 border-blue-200'; // B
        if (score >= 71) return 'bg-yellow-100 text-yellow-800 border-yellow-200'; // BP
        if (score >= 61) return 'bg-orange-100 text-orange-800 border-orange-200'; // K
        return 'bg-red-100 text-red-800 border-red-200'; // SK
    };

    const cleanup = useMobileNavigation();

    const { toast } = useToast();

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
            <Head title="Dashboard" />
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

                <main className="mx-auto max-w-7xl px-4 pt-6 pb-8 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        <Link href={route('dashboard')}>
                            <Button variant="ghost" className="mb-4 flex items-center space-x-2 border">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali</span>
                            </Button>
                        </Link>

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
                                    <span className="hidden sm:inline">Per-Pertanyaan</span>
                                </TabsTrigger>
                            </TabsList>

                            {/* Tab Content: Rekap */}
                            <TabsContent value="rekap" className="space-y-6">
                                <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-6">
                                                <img
                                                    src={`/storage/${employee.image}` || '/placeholder.svg'}
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
                                                <p className="mt-2 text-indigo-100">Nilai Akhir Penilaian</p>
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
                                                    <h3 className="mb-2 text-xl font-bold">Aspek Teknis dan Kualitas Kerja</h3>
                                                    <div className="mb-4 inline-block rounded-full bg-white/20 px-3 py-1 text-sm font-medium backdrop-blur-sm">
                                                        Nilai Akhir
                                                    </div>
                                                    <div className="mb-4 rounded-4xl bg-white/10 p-4 backdrop-blur-sm">
                                                        <div className="mb-1 font-mono text-sm opacity-90">
                                                            {employee?.weightedAspek?.['aspek-teknis-dan-kualitas-kerja']?.average} ×{' '}
                                                            {(employee?.weightedAspek?.['aspek-teknis-dan-kualitas-kerja']?.weight * 100).toFixed(0)}%
                                                            =
                                                        </div>
                                                        <div className="text-4xl font-bold">
                                                            {employee?.weightedAspek?.['aspek-teknis-dan-kualitas-kerja']?.score.toFixed(2)}
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
                                                        Nilai Akhir
                                                    </div>
                                                    <div className="mb-4 rounded-4xl bg-white/10 p-4 backdrop-blur-sm">
                                                        <div className="mb-1 font-mono text-sm opacity-90">
                                                            {employee?.weightedAspek?.['aspek-perilaku']?.average} ×{' '}
                                                            {(employee?.weightedAspek?.['aspek-perilaku']?.weight * 100).toFixed(0)}% =
                                                        </div>{' '}
                                                        <div className="text-4xl font-bold">
                                                            {employee?.weightedAspek?.['aspek-perilaku']?.score.toFixed(2)}
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
                                                          : 'Rekan Kerja';

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
                                                {/* <div className="text-sm text-blue-600">Bobot Tertinggi</div> */}
                                            </div>
                                            <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-800">30%</div>
                                                <div className="font-medium text-blue-700">Penerima Layanan</div>
                                                {/* <div className="text-sm text-blue-600">Bobot Menengah</div> */}
                                            </div>
                                            <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                                <div className="text-2xl font-bold text-blue-800">20%</div>
                                                <div className="font-medium text-blue-700">Outsourcing</div>
                                                {/* <div className="text-sm text-blue-600">Bobot Terendah</div> */}
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
                                                    let originalScore = evaluator.aspectScores['aspek-teknis-dan-kualitas-kerja'];

                                                    if (!originalScore) {
                                                        originalScore = 0;
                                                    }

                                                    const weightedScore = (originalScore || 0) * evaluator.weight;

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
                                                        <div className="mt-2 mb-3 text-xs text-blue-600">
                                                            {employee.evaluatorScores
                                                                .map((e, i) => {
                                                                    const score = e?.aspectScores?.['aspek-teknis-dan-kualitas-kerja'] ?? 0;
                                                                    const weight = e?.weight ?? 0;

                                                                    return `${(score * weight).toFixed(2)}`;
                                                                })
                                                                .join(' + ')}
                                                            {' ='}
                                                        </div>
                                                        <div className="text-5xl font-bold text-blue-900">
                                                            {employee.weightedAspek['aspek-teknis-dan-kualitas-kerja'].average.toFixed(2)}
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
                                                    let originalScore = evaluator.aspectScores['aspek-perilaku'];

                                                    if (!originalScore) {
                                                        originalScore = 0;
                                                    }

                                                    const weightedScore = (originalScore || 0) * evaluator.weight;

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
                                                        <div className="mt-2 mb-3 text-xs text-green-600">
                                                            {employee.evaluatorScores
                                                                .map((e, i) => {
                                                                    // Pastikan e dan e.aspectScores serta e.weight ada sebelum mengaksesnya.
                                                                    // Jika salah satu tidak ada, gunakan 0 sebagai pengganti.
                                                                    const score = e?.aspectScores?.['aspek-perilaku'] ?? 0;
                                                                    const weight = e?.weight ?? 0;

                                                                    return `${(score * weight).toFixed(2)}`;
                                                                })
                                                                .join(' + ')}
                                                            {' ='}
                                                        </div>
                                                        <div className="text-5xl font-bold text-blue-900">
                                                            {employee.weightedAspek['aspek-perilaku'].average.toFixed(2)}
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
                                <div className="mb-6 flex space-x-2">
                                    <Button
                                        variant={selectedLevel === 'atasan' ? 'default' : 'outline'}
                                        onClick={() => setSelectedLevel('atasan')}
                                        className="flex items-center space-x-2"
                                    >
                                        <FileText className="h-4 w-4" />
                                        <span>Atasan</span>
                                    </Button>
                                    <Button
                                        variant={selectedLevel === 'penerima_layanan' ? 'default' : 'outline'}
                                        onClick={() => setSelectedLevel('penerima_layanan')}
                                        className="flex items-center space-x-2"
                                    >
                                        <ClipboardList className="h-4 w-4" />
                                        <span>Penerima Layanan</span>
                                    </Button>
                                    <Button
                                        variant={selectedLevel === 'teman' ? 'default' : 'outline'}
                                        onClick={() => setSelectedLevel('teman')}
                                        className="flex items-center space-x-2"
                                    >
                                        <ClipboardList className="h-4 w-4" />
                                        <span>Rekan Kerja</span>
                                    </Button>
                                </div>

                                <>
                                    <Card className="gap-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                        <CardHeader>
                                            <CardTitle className="flex items-center space-x-3 text-2xl">
                                                <div className="rounded-full bg-white/20 p-3">
                                                    <CheckCircle className="h-8 w-8" />
                                                </div>
                                                <span>Review Penilaian Keseluruhan</span>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            {(() => {
                                                const aspectAKey = aspects[0];
                                                const aspectBKey = aspects[1];

                                                const weightA = 60;
                                                const weightB = 40;

                                                const a = aspectAKey ? getAspectStats(aspectAKey) : { total: 0, count: 0, avg: 0 };
                                                const b = aspectBKey ? getAspectStats(aspectBKey) : { total: 0, count: 0, avg: 0 };

                                                const aContribution = parseFloat(((a.avg * weightA) / 100).toFixed(2));
                                                const bContribution = parseFloat(((b.avg * weightB) / 100).toFixed(2));
                                                const combinedContribution = parseFloat((aContribution + bContribution).toFixed(2));

                                                return (
                                                    <div className="grid gap-6 md:grid-cols-3">
                                                        <div className="text-center">
                                                            <div className="text-sm text-blue-100">
                                                                {aspectAKey
                                                                    ? evaluationData[aspectAKey as keyof typeof evaluationData].title
                                                                    : 'Aspek 1'}
                                                            </div>
                                                            <div className="text-xs text-blue-100">{`${a.avg} x ${weightA}% =`}</div>
                                                            <div className="mt-1 text-3xl font-extrabold tracking-tight">{`${aContribution}`}</div>
                                                        </div>

                                                        <div className="text-center">
                                                            <div className="text-sm text-blue-100">
                                                                {aspectBKey
                                                                    ? evaluationData[aspectBKey as keyof typeof evaluationData].title
                                                                    : 'Aspek 2'}
                                                            </div>
                                                            <div className="text-xs text-blue-100">{`${b.avg} x ${weightB}% =`}</div>
                                                            <div className="mt-1 text-3xl font-extrabold tracking-tight">{`${bContribution}`}</div>
                                                        </div>

                                                        <div className="text-center">
                                                            <div className="text-sm text-blue-100">Skor Akhir</div>
                                                            <div className="text-xs text-blue-100">{`${aContribution} + ${bContribution} =`}</div>
                                                            <div className="mt-1 text-3xl font-extrabold tracking-tight">{`${combinedContribution}`}</div>
                                                        </div>
                                                    </div>
                                                );
                                            })()}
                                        </CardContent>
                                    </Card>

                                    {/* Detailed Review by Aspect - UPDATED to show Total, Count, and emphasize Avg */}
                                    {aspects.map((aspectKey, aspectIndex) => {
                                        const aspect = evaluationData[aspectKey as keyof typeof evaluationData];

                                        return (
                                            <Card key={aspectKey} className="gap-4 border-l-4 border-l-blue-500">
                                                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-4">
                                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                                                                {aspectIndex + 1}
                                                            </div>
                                                            <div>
                                                                <CardTitle className="text-2xl text-blue-800">{aspect.title}</CardTitle>
                                                                <CardDescription className="text-blue-600">
                                                                    {aspect.criteria.length} Kriteria
                                                                </CardDescription>
                                                            </div>
                                                        </div>

                                                        {(() => {
                                                            const { total, avg } = getAspectStats(aspectKey);
                                                            return (
                                                                <div className={`rounded-xl px-6 py-3 ${getScoreColor(avg)}`}>
                                                                    <div className="">Total Skor: {total}</div>
                                                                    <div className="font-semibold">Rata-Rata : {avg}</div>
                                                                </div>
                                                            );
                                                        })()}
                                                    </div>
                                                </CardHeader>

                                                <CardContent className="p-6 pt-3">
                                                    <div className="space-y-6">
                                                        {aspect.criteria.map((criterion: any, criterionIndex: number) => {
                                                            const score = criterion.score || 0;
                                                            const classification = getScoreClassification(score);

                                                            return (
                                                                <div
                                                                    key={criterion.id}
                                                                    className="rounded-lg border-l-4 border-l-gray-300 bg-gray-50 p-5"
                                                                >
                                                                    <div className="mb-4 flex items-start justify-between">
                                                                        <div className="flex flex-1 items-start space-x-3">
                                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-sm font-bold text-white">
                                                                                {aspectIndex + 1}.{criterionIndex + 1}
                                                                            </div>
                                                                            <div className="flex-1">
                                                                                <h4 className="text-xl font-semibold text-gray-800">
                                                                                    {criterion.name}
                                                                                </h4>
                                                                                <div className="mt-2 text-lg font-bold text-gray-900">
                                                                                    Nilai: {score}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="ml-4">
                                                                            <Badge
                                                                                className={`${classification.color} border px-3 py-1 text-sm font-semibold`}
                                                                            >
                                                                                {classification.label}
                                                                            </Badge>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                                                                        <h5 className="mb-2 flex items-center space-x-2 font-medium text-gray-700">
                                                                            <Info className="h-4 w-4" />
                                                                            <span>Indikator Penilaian:</span>
                                                                        </h5>
                                                                        <ul className="space-y-1 text-sm text-gray-600">
                                                                            {criterion.indicators.map((indicator: any, idx: number) => (
                                                                                <li key={idx} className="flex items-start space-x-2">
                                                                                    <span className="mt-1 text-blue-500">•</span>
                                                                                    <span>{indicator}</span>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        );
                                    })}
                                </>
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </>
    );
}
