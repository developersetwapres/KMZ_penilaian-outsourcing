'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Award, BarChart3, Calculator, Download, FileText, Info, Share2, Star, Target, TrendingUp, Users } from 'lucide-react';
import { useState } from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    PolarAngleAxis,
    PolarGrid,
    PolarRadiusAxis,
    Radar,
    RadarChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

// Updated dummy data with new weighted scoring (50%, 30%, 20%)
const evaluationResults = [
    {
        id: '1',
        employeeName: 'Ahmad Rizki',
        unit: 'IT Support',
        position: 'Technical Support',
        photo: '/placeholder.svg?height=60&width=60&text=AR',
        evaluatorScores: [
            {
                evaluatorName: 'Dr. Andi Wijaya',
                type: 'kepala-biro',
                weight: 0.5,
                criteriaScores: {
                    'teknis-1': 85,
                    'teknis-2': 80,
                    'perilaku-1': 75,
                    'perilaku-2': 82,
                    'keahlian-1': 78,
                    'keahlian-2': 80,
                },
                aspectScores: {
                    'aspek-teknis': 82.5,
                    'aspek-perilaku': 78.5,
                    'aspek-keahlian': 79.0,
                },
                overallScore: 80.0,
                notes: 'Kinerja yang konsisten dengan kemampuan teknis yang baik. Perlu peningkatan dalam aspek komunikasi tim.',
                evaluationDate: '2024-01-15',
            },
            {
                evaluatorName: 'Ir. Sari Dewi',
                type: 'kepala-bagian',
                weight: 0.3,
                criteriaScores: {
                    'teknis-1': 82,
                    'teknis-2': 85,
                    'perilaku-1': 78,
                    'perilaku-2': 80,
                    'keahlian-1': 75,
                    'keahlian-2': 77,
                },
                aspectScores: {
                    'aspek-teknis': 83.5,
                    'aspek-perilaku': 79.0,
                    'aspek-keahlian': 76.0,
                },
                overallScore: 79.5,
                notes: 'Menunjukkan dedikasi tinggi dalam menyelesaikan tugas. Dapat lebih proaktif dalam memberikan ide.',
                evaluationDate: '2024-01-12',
            },
            {
                evaluatorName: 'Ahmad Fauzi',
                type: 'teman-setingkat',
                weight: 0.2,
                criteriaScores: {
                    'teknis-1': 78,
                    'teknis-2': 82,
                    'perilaku-1': 85,
                    'perilaku-2': 88,
                    'keahlian-1': 80,
                    'keahlian-2': 83,
                },
                aspectScores: {
                    'aspek-teknis': 80.0,
                    'aspek-perilaku': 86.5,
                    'aspek-keahlian': 81.5,
                },
                overallScore: 82.7,
                notes: 'Rekan kerja yang sangat kooperatif dan mudah diajak bekerja sama. Selalu siap membantu tim.',
                evaluationDate: '2024-01-10',
            },
        ],
        weightedOverallScore: 80.79,
        status: 'completed',
        completedDate: '2024-01-15',
        historicalScores: [
            { period: 'Q1 2023', score: 75.2 },
            { period: 'Q2 2023', score: 77.8 },
            { period: 'Q3 2023', score: 79.1 },
            { period: 'Q4 2023', score: 80.79 },
        ],
        recommendations: [
            {
                category: 'Pengembangan Teknis',
                priority: 'Tinggi',
                description: 'Mengikuti pelatihan advanced troubleshooting dan teknologi terbaru',
                timeline: '3 bulan',
            },
            {
                category: 'Soft Skills',
                priority: 'Sedang',
                description: 'Workshop komunikasi efektif dan presentasi',
                timeline: '2 bulan',
            },
            {
                category: 'Leadership',
                priority: 'Rendah',
                description: 'Pelatihan kepemimpinan untuk persiapan promosi',
                timeline: '6 bulan',
            },
        ],
    },
    {
        id: '2',
        employeeName: 'Siti Nurhaliza',
        unit: 'Human Resources',
        position: 'HR Assistant',
        photo: '/placeholder.svg?height=60&width=60&text=SN',
        evaluatorScores: [
            {
                evaluatorName: 'Dr. Andi Wijaya',
                type: 'kepala-biro',
                weight: 0.5,
                criteriaScores: {
                    'teknis-1': 88,
                    'teknis-2': 85,
                    'perilaku-1': 90,
                    'perilaku-2': 92,
                    'keahlian-1': 85,
                    'keahlian-2': 87,
                },
                aspectScores: {
                    'aspek-teknis': 86.5,
                    'aspek-perilaku': 91.0,
                    'aspek-keahlian': 86.0,
                },
                overallScore: 87.8,
                notes: 'Kinerja yang sangat memuaskan dengan kemampuan interpersonal yang excellent. Role model untuk tim.',
                evaluationDate: '2024-01-12',
            },
            {
                evaluatorName: 'Linda Sari',
                type: 'teman-setingkat',
                weight: 0.2,
                criteriaScores: {
                    'teknis-1': 85,
                    'teknis-2': 88,
                    'perilaku-1': 87,
                    'perilaku-2': 89,
                    'keahlian-1': 82,
                    'keahlian-2': 85,
                },
                aspectScores: {
                    'aspek-teknis': 86.5,
                    'aspek-perilaku': 88.0,
                    'aspek-keahlian': 83.5,
                },
                overallScore: 86.0,
                notes: 'Sangat profesional dan detail dalam bekerja. Komunikasi yang efektif dengan semua level.',
                evaluationDate: '2024-01-10',
            },
        ],
        weightedOverallScore: 87.1,
        status: 'completed',
        completedDate: '2024-01-12',
        historicalScores: [
            { period: 'Q1 2023', score: 82.1 },
            { period: 'Q2 2023', score: 84.5 },
            { period: 'Q3 2023', score: 86.2 },
            { period: 'Q4 2023', score: 87.1 },
        ],
        recommendations: [
            {
                category: 'Pengembangan Karir',
                priority: 'Tinggi',
                description: 'Persiapan untuk posisi HR Specialist dengan training advanced HR management',
                timeline: '4 bulan',
            },
            {
                category: 'Sertifikasi',
                priority: 'Sedang',
                description: 'Mengambil sertifikasi SHRM atau PHR untuk kredibilitas profesional',
                timeline: '6 bulan',
            },
        ],
    },
    {
        id: '3',
        employeeName: 'Budi Santoso',
        unit: 'Finance',
        position: 'Accounting Staff',
        photo: '/placeholder.svg?height=60&width=60&text=BS',
        evaluatorScores: [
            {
                evaluatorName: 'Dr. Andi Wijaya',
                type: 'kepala-biro',
                weight: 0.5,
                criteriaScores: {
                    'teknis-1': 70,
                    'teknis-2': 68,
                    'perilaku-1': 72,
                    'perilaku-2': 75,
                    'keahlian-1': 65,
                    'keahlian-2': 70,
                },
                aspectScores: {
                    'aspek-teknis': 69.0,
                    'aspek-perilaku': 73.5,
                    'aspek-keahlian': 67.5,
                },
                overallScore: 70.0,
                notes: 'Perlu peningkatan dalam penguasaan teknologi dan inisiatif. Namun menunjukkan komitmen yang baik.',
                evaluationDate: '2024-01-08',
            },
        ],
        weightedOverallScore: 70.0,
        status: 'in-progress',
        completedDate: null,
        historicalScores: [
            { period: 'Q1 2023', score: 68.5 },
            { period: 'Q2 2023', score: 69.2 },
            { period: 'Q3 2023', score: 69.8 },
            { period: 'Q4 2023', score: 70.0 },
        ],
        recommendations: [
            {
                category: 'Pelatihan Teknis',
                priority: 'Tinggi',
                description: 'Intensive training pada software akuntansi dan Excel advanced',
                timeline: '2 bulan',
            },
            {
                category: 'Mentoring',
                priority: 'Tinggi',
                description: 'Program mentoring dengan senior accounting staff',
                timeline: '3 bulan',
            },
        ],
    },
];

const criteriaNames = {
    'teknis-1': 'Penguasaan Teknologi',
    'teknis-2': 'Kualitas Kerja',
    'perilaku-1': 'Disiplin',
    'perilaku-2': 'Kerjasama dan Komunikasi',
    'keahlian-1': 'Inisiatif dan Kreativitas',
    'keahlian-2': 'Adaptabilitas',
};

const aspectNames = {
    'aspek-teknis': 'Aspek Teknis',
    'aspek-perilaku': 'Aspek Perilaku',
    'aspek-keahlian': 'Aspek Keahlian',
};

export default function EmployeeDetailPage() {
    const params = {
        id: '2',
    };

    const employeeId = params.id as string;
    const [activeTab, setActiveTab] = useState('rekap');

    const employee = evaluationResults.find((emp) => emp.id === employeeId);

    if (!employee) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Card className="w-96">
                    <CardContent className="py-12 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">Data Tidak Ditemukan</h2>
                        <p className="mb-6 text-gray-600">Pegawai dengan ID tersebut tidak ditemukan dalam sistem.</p>
                        <Button
                        // onClick={() => router.push('/admin/results')}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Kembali ke Hasil
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 75) return 'text-blue-600';
        if (score >= 60) return 'text-orange-600';
        return 'text-red-600';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 90) return 'Sangat Baik';
        if (score >= 75) return 'Baik';
        if (score >= 60) return 'Kurang';
        return 'Sangat Kurang';
    };

    const getProgressColor = (score: number) => {
        if (score >= 90) return 'bg-green-500';
        if (score >= 75) return 'bg-blue-500';
        if (score >= 60) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const getScoreBadgeColor = (score: number) => {
        if (score >= 90) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 75) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (score >= 60) return 'bg-orange-100 text-orange-800 border-orange-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Tinggi':
                return 'bg-red-100 text-red-800 border-red-200';
            case 'Sedang':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Rendah':
                return 'bg-green-100 text-green-800 border-green-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    // Prepare chart data for evaluator comparison
    const chartData = employee.evaluatorScores.map((evaluator) => ({
        name: evaluator.type === 'kepala-biro' ? 'Kepala Biro' : evaluator.type === 'kepala-bagian' ? 'Kepala Bagian' : 'Teman Setingkat',
        evaluatorName: evaluator.evaluatorName,
        'Aspek Teknis': evaluator.aspectScores['aspek-teknis'],
        'Aspek Perilaku': evaluator.aspectScores['aspek-perilaku'],
        'Aspek Keahlian': evaluator.aspectScores['aspek-keahlian'],
        'Nilai Keseluruhan': evaluator.overallScore,
        weight: evaluator.weight * 100,
        weightedScore: evaluator.overallScore * evaluator.weight,
    }));

    // Prepare radar chart data
    const radarData = [
        {
            aspect: 'Aspek Teknis',
            'Kepala Biro': employee.evaluatorScores.find((e) => e.type === 'kepala-biro')?.aspectScores['aspek-teknis'] || 0,
            'Kepala Bagian': employee.evaluatorScores.find((e) => e.type === 'kepala-bagian')?.aspectScores['aspek-teknis'] || 0,
            'Teman Setingkat': employee.evaluatorScores.find((e) => e.type === 'teman-setingkat')?.aspectScores['aspek-teknis'] || 0,
        },
        {
            aspect: 'Aspek Perilaku',
            'Kepala Biro': employee.evaluatorScores.find((e) => e.type === 'kepala-biro')?.aspectScores['aspek-perilaku'] || 0,
            'Kepala Bagian': employee.evaluatorScores.find((e) => e.type === 'kepala-bagian')?.aspectScores['aspek-perilaku'] || 0,
            'Teman Setingkat': employee.evaluatorScores.find((e) => e.type === 'teman-setingkat')?.aspectScores['aspek-perilaku'] || 0,
        },
        {
            aspect: 'Aspek Keahlian',
            'Kepala Biro': employee.evaluatorScores.find((e) => e.type === 'kepala-biro')?.aspectScores['aspek-keahlian'] || 0,
            'Kepala Bagian': employee.evaluatorScores.find((e) => e.type === 'kepala-bagian')?.aspectScores['aspek-keahlian'] || 0,
            'Teman Setingkat': employee.evaluatorScores.find((e) => e.type === 'teman-setingkat')?.aspectScores['aspek-keahlian'] || 0,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex items-center space-x-4">
                            <Button
                                variant="ghost"
                                //  onClick={() => router.push('/admin/results')}
                                className="flex items-center space-x-2"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali ke Hasil</span>
                            </Button>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-3">
                                <img
                                    src={employee.photo || '/placeholder.svg'}
                                    alt={employee.employeeName}
                                    className="h-10 w-10 rounded-full border-2 border-blue-200"
                                />
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">{employee.employeeName}</h1>
                                    <p className="text-sm text-gray-600">
                                        {employee.position} • {employee.unit}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                                <Share2 className="h-4 w-4" />
                                <span>Bagikan</span>
                            </Button>
                            <Button className="flex items-center space-x-2">
                                <Download className="h-4 w-4" />
                                <span>Export PDF</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* Employee Profile Card */}
                    <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-6">
                                    <img
                                        src={employee.photo || '/placeholder.svg'}
                                        alt={employee.employeeName}
                                        className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                                    />
                                    <div>
                                        <CardTitle className="mb-2 text-3xl">{employee.employeeName}</CardTitle>
                                        <CardDescription className="text-lg text-indigo-100">
                                            {employee.position} • {employee.unit}
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
                                            <span className="text-indigo-100">
                                                {employee.evaluatorScores.length} Penilai • {employee.completedDate || 'Belum selesai'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="mb-2 text-6xl font-bold">{employee.weightedOverallScore.toFixed(1)}</div>
                                    <Badge className={`${getScoreBadgeColor(employee.weightedOverallScore)} border-2 px-4 py-2 text-lg`}>
                                        {getScoreLabel(employee.weightedOverallScore)}
                                    </Badge>
                                    <p className="mt-2 text-indigo-100">Nilai Akhir Berbobot</p>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Navigation Tabs */}
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-6 rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
                            <TabsTrigger
                                value="rekap"
                                className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                            >
                                <FileText className="h-4 w-4" />
                                <span className="hidden sm:inline">Rekap</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="chart"
                                className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                            >
                                <BarChart3 className="h-4 w-4" />
                                <span className="hidden sm:inline">Grafik</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="perbandingan"
                                className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                            >
                                <Users className="h-4 w-4" />
                                <span className="hidden sm:inline">Perbandingan</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="timeline"
                                className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                            >
                                <TrendingUp className="h-4 w-4" />
                                <span className="hidden sm:inline">Timeline</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="rekomendasi"
                                className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                            >
                                <Target className="h-4 w-4" />
                                <span className="hidden sm:inline">Rekomendasi</span>
                            </TabsTrigger>
                            <TabsTrigger
                                value="detail"
                                className="flex items-center space-x-2 data-[state=active]:bg-indigo-500 data-[state=active]:text-white"
                            >
                                <Award className="h-4 w-4" />
                                <span className="hidden sm:inline">Detail</span>
                            </TabsTrigger>
                        </TabsList>

                        {/* Tab Content: Rekap */}
                        <TabsContent value="rekap" className="space-y-6">
                            {/* Weighted Scoring Info */}
                            <Card className="border-blue-200 bg-blue-50">
                                <CardContent className="pt-6">
                                    <div className="mb-4 flex items-center space-x-2">
                                        <Calculator className="h-6 w-6 text-blue-600" />
                                        <span className="text-lg font-bold text-blue-800">Sistem Penilaian Berbobot</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                            <div className="text-2xl font-bold text-blue-800">50%</div>
                                            <div className="font-medium text-blue-700">Kepala Biro</div>
                                            <div className="text-sm text-blue-600">Bobot Tertinggi</div>
                                        </div>
                                        <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                            <div className="text-2xl font-bold text-blue-800">30%</div>
                                            <div className="font-medium text-blue-700">Kepala Bagian</div>
                                            <div className="text-sm text-blue-600">Bobot Menengah</div>
                                        </div>
                                        <div className="rounded-lg border border-blue-300 bg-blue-100 p-4 text-center">
                                            <div className="text-2xl font-bold text-blue-800">20%</div>
                                            <div className="font-medium text-blue-700">Teman Setingkat</div>
                                            <div className="text-sm text-blue-600">Bobot Terendah</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Total Nilai Akhir Card */}
                            <Card className="bg-gradient-to-r from-purple-400 to-purple-600 text-white">
                                <CardContent className="p-8">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="mb-2 text-lg text-purple-100">Total Nilai Akhir</p>
                                            <p className="mb-4 text-5xl font-bold">{employee.weightedOverallScore.toFixed(1)}</p>
                                            <Badge className="border-2 border-purple-200 bg-white px-4 py-2 text-lg text-purple-600">
                                                {getScoreLabel(employee.weightedOverallScore)}
                                            </Badge>
                                        </div>
                                        <div className="text-right">
                                            <Award className="mb-4 h-20 w-20 text-purple-200" />
                                            <p className="text-purple-100">Hasil Evaluasi Berbobot</p>
                                            <p className="mt-2 text-sm text-purple-200">Dari {employee.evaluatorScores.length} Penilai</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Ringkasan Nilai per Aspek - Hanya Teknis & Perilaku */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Aspek Teknis */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-blue-800">Aspek Teknis</CardTitle>
                                        <CardDescription>Penguasaan teknologi dan kualitas kerja</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {employee.evaluatorScores.map((evaluator, index) => {
                                                const score = evaluator.aspectScores['aspek-teknis'];
                                                const evaluatorType =
                                                    evaluator.type === 'kepala-biro'
                                                        ? 'Kepala Biro'
                                                        : evaluator.type === 'kepala-bagian'
                                                          ? 'Kepala Bagian'
                                                          : 'Teman Setingkat';

                                                return (
                                                    <div key={index} className="rounded-lg border bg-gray-50 p-4">
                                                        <div className="mb-2 flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-semibold text-gray-800">{evaluator.evaluatorName}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {evaluatorType} • Bobot: {evaluator.weight * 100}%
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
                                                                <Badge className={`${getScoreBadgeColor(score)} border text-xs`}>
                                                                    {getScoreLabel(score)}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={(score / 100) * 100} className="h-2" />
                                                    </div>
                                                );
                                            })}

                                            {/* Rata-rata Aspek Teknis */}
                                            <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-blue-800">Rata-rata Aspek Teknis</h4>
                                                        <p className="text-sm text-blue-600">Nilai keseluruhan aspek</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div
                                                            className={`text-3xl font-bold ${getScoreColor(
                                                                employee.evaluatorScores.reduce((sum, e) => sum + e.aspectScores['aspek-teknis'], 0) /
                                                                    employee.evaluatorScores.length,
                                                            )}`}
                                                        >
                                                            {(
                                                                employee.evaluatorScores.reduce((sum, e) => sum + e.aspectScores['aspek-teknis'], 0) /
                                                                employee.evaluatorScores.length
                                                            ).toFixed(1)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Aspek Perilaku */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-xl text-green-800">Aspek Perilaku</CardTitle>
                                        <CardDescription>Disiplin, kerjasama dan komunikasi</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {employee.evaluatorScores.map((evaluator, index) => {
                                                const score = evaluator.aspectScores['aspek-perilaku'];
                                                const evaluatorType =
                                                    evaluator.type === 'kepala-biro'
                                                        ? 'Kepala Biro'
                                                        : evaluator.type === 'kepala-bagian'
                                                          ? 'Kepala Bagian'
                                                          : 'Teman Setingkat';

                                                return (
                                                    <div key={index} className="rounded-lg border bg-gray-50 p-4">
                                                        <div className="mb-2 flex items-center justify-between">
                                                            <div>
                                                                <h4 className="font-semibold text-gray-800">{evaluator.evaluatorName}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {evaluatorType} • Bobot: {evaluator.weight * 100}%
                                                                </p>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
                                                                <Badge className={`${getScoreBadgeColor(score)} border text-xs`}>
                                                                    {getScoreLabel(score)}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        <Progress value={(score / 100) * 100} className="h-2" />
                                                    </div>
                                                );
                                            })}

                                            {/* Rata-rata Aspek Perilaku */}
                                            <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-green-800">Rata-rata Aspek Perilaku</h4>
                                                        <p className="text-sm text-green-600">Nilai keseluruhan aspek</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div
                                                            className={`text-3xl font-bold ${getScoreColor(
                                                                employee.evaluatorScores.reduce(
                                                                    (sum, e) => sum + e.aspectScores['aspek-perilaku'],
                                                                    0,
                                                                ) / employee.evaluatorScores.length,
                                                            )}`}
                                                        >
                                                            {(
                                                                employee.evaluatorScores.reduce(
                                                                    (sum, e) => sum + e.aspectScores['aspek-perilaku'],
                                                                    0,
                                                                ) / employee.evaluatorScores.length
                                                            ).toFixed(1)}
                                                        </div>
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
                            {/* Bar Chart - Perbandingan Nilai dari 3 Penilai */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Perbandingan Nilai dari 3 Penilai (Dengan Bobot)</CardTitle>
                                    <CardDescription>
                                        Visualisasi nilai dari setiap penilai berdasarkan aspek penilaian dan bobot masing-masing
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-96">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                                                <YAxis domain={[0, 100]} />
                                                <Tooltip
                                                    formatter={(value: any, name: string, props: any) => [
                                                        `${value.toFixed(1)}`,
                                                        name,
                                                        `Bobot: ${props.payload.weight}%`,
                                                    ]}
                                                    labelFormatter={(label: string, payload: any) => {
                                                        if (payload && payload[0]) {
                                                            return `${label} - ${payload[0].payload.evaluatorName}`;
                                                        }
                                                        return label;
                                                    }}
                                                />
                                                <Legend />
                                                <Bar dataKey="Aspek Teknis" fill="#3B82F6" name="Aspek Teknis" />
                                                <Bar dataKey="Aspek Perilaku" fill="#10B981" name="Aspek Perilaku" />
                                                <Bar dataKey="Aspek Keahlian" fill="#F59E0B" name="Aspek Keahlian" />
                                                <Bar dataKey="Nilai Keseluruhan" fill="#8B5CF6" name="Nilai Keseluruhan" />
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Radar Chart - Profil Kinerja */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Profil Kinerja Multi-Perspektif</CardTitle>
                                    <CardDescription>Radar chart menunjukkan penilaian dari berbagai perspektif penilai</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="h-96">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <RadarChart data={radarData} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                                                <PolarGrid />
                                                <PolarAngleAxis dataKey="aspect" tick={{ fontSize: 12 }} />
                                                <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                                                <Radar
                                                    name="Kepala Biro (50%)"
                                                    dataKey="Kepala Biro"
                                                    stroke="#DC2626"
                                                    fill="#DC2626"
                                                    fillOpacity={0.1}
                                                    strokeWidth={3}
                                                />
                                                <Radar
                                                    name="Kepala Bagian (30%)"
                                                    dataKey="Kepala Bagian"
                                                    stroke="#2563EB"
                                                    fill="#2563EB"
                                                    fillOpacity={0.1}
                                                    strokeWidth={3}
                                                />
                                                <Radar
                                                    name="Teman Setingkat (20%)"
                                                    dataKey="Teman Setingkat"
                                                    stroke="#059669"
                                                    fill="#059669"
                                                    fillOpacity={0.1}
                                                    strokeWidth={3}
                                                />
                                                <Legend />
                                                <Tooltip formatter={(value: any) => [`${value.toFixed(1)}`, 'Nilai']} />
                                            </RadarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Weighted Score Contribution Chart */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Kontribusi Nilai Berbobot</CardTitle>
                                    <CardDescription>Visualisasi kontribusi setiap penilai terhadap nilai akhir berdasarkan bobot</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {chartData.map((data, index) => (
                                            <div key={index} className="rounded-lg border bg-gray-50 p-4">
                                                <div className="mb-2 flex items-center justify-between">
                                                    <div>
                                                        <h4 className="text-lg font-bold">{data.name}</h4>
                                                        <p className="text-sm text-gray-600">{data.evaluatorName}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-sm text-gray-600">
                                                            {data['Nilai Keseluruhan'].toFixed(1)} × {data.weight}% =
                                                            <span className="ml-1 font-bold text-indigo-600">{data.weightedScore.toFixed(2)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-3 gap-4 text-sm">
                                                    <div className="text-center">
                                                        <div className="font-medium text-blue-600">Teknis</div>
                                                        <div className="text-lg font-bold">{data['Aspek Teknis'].toFixed(1)}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="font-medium text-green-600">Perilaku</div>
                                                        <div className="text-lg font-bold">{data['Aspek Perilaku'].toFixed(1)}</div>
                                                    </div>
                                                    <div className="text-center">
                                                        <div className="font-medium text-orange-600">Keahlian</div>
                                                        <div className="text-lg font-bold">{data['Aspek Keahlian'].toFixed(1)}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {/* Total Weighted Score */}
                                        <div className="rounded-lg border-2 border-purple-300 bg-gradient-to-r from-purple-100 to-indigo-100 p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="text-xl font-bold text-purple-800">Total Nilai Akhir Berbobot</h4>
                                                    <p className="text-purple-600">Hasil perhitungan dengan sistem bobot</p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-4xl font-bold text-purple-800">
                                                        {employee.weightedOverallScore.toFixed(2)}
                                                    </div>
                                                    <Badge className={`${getScoreBadgeColor(employee.weightedOverallScore)} mt-2 border`}>
                                                        {getScoreLabel(employee.weightedOverallScore)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab Content: Perbandingan */}
                        <TabsContent value="perbandingan" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Analisis Perbandingan Antar Penilai</CardTitle>
                                    <CardDescription>Melihat konsistensi dan variasi penilaian dari berbagai perspektif</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-6">
                                        {Object.entries(aspectNames).map(([aspectKey, aspectName]) => (
                                            <div key={aspectKey} className="rounded-lg border p-4">
                                                <h4 className="mb-4 text-lg font-bold">{aspectName}</h4>
                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    {employee.evaluatorScores.map((evaluator, index) => {
                                                        const score = evaluator.aspectScores[aspectKey as keyof typeof evaluator.aspectScores];
                                                        return (
                                                            <div key={index} className="rounded bg-gray-50 p-3 text-center">
                                                                <div className="mb-1 text-sm font-medium">
                                                                    {evaluator.type === 'kepala-biro'
                                                                        ? 'Kepala Biro'
                                                                        : evaluator.type === 'kepala-bagian'
                                                                          ? 'Kepala Bagian'
                                                                          : 'Teman Setingkat'}
                                                                </div>
                                                                <div className={`text-2xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
                                                                <div className="mt-1 text-xs text-gray-500">
                                                                    Bobot: {(evaluator.weight * 100).toFixed(0)}%
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                                <div className="mt-3 text-sm text-gray-600">
                                                    <span className="font-medium">Rata-rata: </span>
                                                    {(
                                                        employee.evaluatorScores.reduce(
                                                            (sum, e) => sum + e.aspectScores[aspectKey as keyof typeof e.aspectScores],
                                                            0,
                                                        ) / employee.evaluatorScores.length
                                                    ).toFixed(1)}
                                                    <span className="ml-4 font-medium">Selisih Max-Min: </span>
                                                    {(
                                                        Math.max(
                                                            ...employee.evaluatorScores.map(
                                                                (e) => e.aspectScores[aspectKey as keyof typeof e.aspectScores],
                                                            ),
                                                        ) -
                                                        Math.min(
                                                            ...employee.evaluatorScores.map(
                                                                (e) => e.aspectScores[aspectKey as keyof typeof e.aspectScores],
                                                            ),
                                                        )
                                                    ).toFixed(1)}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Evaluator Notes Comparison */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Catatan dan Feedback dari Penilai</CardTitle>
                                    <CardDescription>Insight kualitatif dari masing-masing penilai</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {employee.evaluatorScores.map((evaluator, index) => (
                                            <div key={index} className="rounded-r-lg border-l-4 border-l-indigo-500 bg-gray-50 p-4">
                                                <div className="mb-2 flex items-start justify-between">
                                                    <div>
                                                        <h5 className="text-lg font-bold">{evaluator.evaluatorName}</h5>
                                                        <p className="text-sm text-gray-600">
                                                            {evaluator.type === 'kepala-biro'
                                                                ? 'Kepala Biro'
                                                                : evaluator.type === 'kepala-bagian'
                                                                  ? 'Kepala Bagian'
                                                                  : 'Teman Setingkat'}{' '}
                                                            •{evaluator.evaluationDate}
                                                        </p>
                                                    </div>
                                                    <Badge className={`${getScoreBadgeColor(evaluator.overallScore)} border`}>
                                                        {evaluator.overallScore.toFixed(1)}
                                                    </Badge>
                                                </div>
                                                <p className="text-gray-700 italic">"{evaluator.notes}"</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab Content: Timeline */}
                        <TabsContent value="timeline" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Tren Kinerja Historis</CardTitle>
                                    <CardDescription>Perkembangan kinerja dari waktu ke waktu</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {employee.historicalScores.map((period, index) => (
                                            <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-800">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold">{period.period}</h4>
                                                        <p className="text-sm text-gray-600">Periode Evaluasi</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-2xl font-bold ${getScoreColor(period.score)}`}>
                                                        {period.score.toFixed(1)}
                                                    </div>
                                                    <Badge className={`${getScoreBadgeColor(period.score)} mt-1 border`}>
                                                        {getScoreLabel(period.score)}
                                                    </Badge>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Trend Analysis */}
                                    <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                        <h4 className="mb-2 font-bold text-blue-800">Analisis Tren:</h4>
                                        <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                                            <div>
                                                <span className="font-medium">Peningkatan Total: </span>
                                                <span className="font-bold text-green-600">
                                                    +
                                                    {(
                                                        employee.historicalScores[employee.historicalScores.length - 1].score -
                                                        employee.historicalScores[0].score
                                                    ).toFixed(1)}{' '}
                                                    poin
                                                </span>
                                            </div>
                                            <div>
                                                <span className="font-medium">Rata-rata per Periode: </span>
                                                <span className="font-bold text-blue-600">
                                                    {(
                                                        employee.historicalScores.reduce((sum, p) => sum + p.score, 0) /
                                                        employee.historicalScores.length
                                                    ).toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Evaluation Timeline */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Timeline Evaluasi Terkini</CardTitle>
                                    <CardDescription>Kronologi proses evaluasi periode ini</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {employee.evaluatorScores
                                            .sort((a, b) => new Date(a.evaluationDate).getTime() - new Date(b.evaluationDate).getTime())
                                            .map((evaluator, index) => (
                                                <div key={index} className="flex items-start space-x-4 rounded-lg border p-4">
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
                                                        ✓
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <h4 className="font-bold">{evaluator.evaluatorName}</h4>
                                                                <p className="text-sm text-gray-600">
                                                                    {evaluator.type === 'kepala-biro'
                                                                        ? 'Kepala Biro'
                                                                        : evaluator.type === 'kepala-bagian'
                                                                          ? 'Kepala Bagian'
                                                                          : 'Teman Setingkat'}
                                                                </p>
                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    Evaluasi selesai: {evaluator.evaluationDate}
                                                                </p>
                                                            </div>
                                                            <Badge className={`${getScoreBadgeColor(evaluator.overallScore)} border`}>
                                                                {evaluator.overallScore.toFixed(1)}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab Content: Rekomendasi */}
                        <TabsContent value="rekomendasi" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rekomendasi Pengembangan</CardTitle>
                                    <CardDescription>Saran untuk meningkatkan kinerja berdasarkan hasil evaluasi</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {employee.recommendations.map((rec, index) => (
                                            <div key={index} className="rounded-lg border p-6 transition-shadow hover:shadow-md">
                                                <div className="mb-3 flex items-start justify-between">
                                                    <div>
                                                        <h4 className="text-lg font-bold">{rec.category}</h4>
                                                        <p className="text-sm text-gray-600">Timeline: {rec.timeline}</p>
                                                    </div>
                                                    <Badge className={`${getPriorityColor(rec.priority)} border`}>Prioritas {rec.priority}</Badge>
                                                </div>
                                                <p className="leading-relaxed text-gray-700">{rec.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Plan */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Rencana Tindak Lanjut</CardTitle>
                                    <CardDescription>Langkah konkret untuk implementasi rekomendasi</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                                            <h4 className="mb-2 font-bold text-yellow-800">Prioritas Utama (1-3 bulan):</h4>
                                            <ul className="space-y-1 text-sm text-yellow-700">
                                                {employee.recommendations
                                                    .filter((r) => r.priority === 'Tinggi')
                                                    .map((rec, index) => (
                                                        <li key={index} className="flex items-start space-x-2">
                                                            <span className="text-yellow-600">•</span>
                                                            <span>{rec.description}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>

                                        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                            <h4 className="mb-2 font-bold text-blue-800">Rencana Jangka Menengah (3-6 bulan):</h4>
                                            <ul className="space-y-1 text-sm text-blue-700">
                                                {employee.recommendations
                                                    .filter((r) => r.priority === 'Sedang')
                                                    .map((rec, index) => (
                                                        <li key={index} className="flex items-start space-x-2">
                                                            <span className="text-blue-600">•</span>
                                                            <span>{rec.description}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>

                                        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                                            <h4 className="mb-2 font-bold text-green-800">Pengembangan Jangka Panjang (6+ bulan):</h4>
                                            <ul className="space-y-1 text-sm text-green-700">
                                                {employee.recommendations
                                                    .filter((r) => r.priority === 'Rendah')
                                                    .map((rec, index) => (
                                                        <li key={index} className="flex items-start space-x-2">
                                                            <span className="text-green-600">•</span>
                                                            <span>{rec.description}</span>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Tab Content: Detail */}
                        <TabsContent value="detail" className="space-y-6">
                            {/* Detailed Scores by Evaluator */}
                            {employee.evaluatorScores.map((evaluator, evalIndex) => (
                                <Card key={evalIndex} className="border-l-4 border-l-indigo-500 shadow-lg">
                                    <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white">
                                                    {evalIndex + 1}
                                                </div>
                                                <div>
                                                    <CardTitle className="text-2xl text-indigo-800">{evaluator.evaluatorName}</CardTitle>
                                                    <CardDescription className="text-lg text-indigo-600">
                                                        {evaluator.type === 'kepala-biro'
                                                            ? 'Kepala Biro'
                                                            : evaluator.type === 'kepala-bagian'
                                                              ? 'Kepala Bagian'
                                                              : 'Teman Setingkat'}
                                                        • Bobot: {(evaluator.weight * 100).toFixed(0)}% • {evaluator.evaluationDate}
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-4xl font-bold ${getScoreColor(evaluator.overallScore)}`}>
                                                    {evaluator.overallScore.toFixed(1)}
                                                </div>
                                                <p className="mt-1 text-sm text-gray-600">Nilai Keseluruhan</p>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-8 p-8">
                                        {/* Aspect Scores */}
                                        <div>
                                            <h4 className="mb-6 text-xl font-bold text-gray-800">Nilai per Aspek:</h4>
                                            <div className="grid grid-cols-3 gap-6">
                                                {Object.entries(evaluator.aspectScores).map(([aspectKey, score]) => (
                                                    <div
                                                        key={aspectKey}
                                                        className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition-shadow hover:shadow-md"
                                                    >
                                                        <div className={`mb-2 text-3xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
                                                        <p className="mb-2 font-medium text-gray-700">
                                                            {aspectNames[aspectKey as keyof typeof aspectNames]}
                                                        </p>
                                                        <Badge className={`${getScoreBadgeColor(score)} border`}>{getScoreLabel(score)}</Badge>
                                                        <Progress value={(score / 100) * 100} className="mt-3 h-2" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Criteria Scores */}
                                        <div>
                                            <h4 className="mb-6 text-xl font-bold text-gray-800">Nilai per Kriteria:</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {Object.entries(evaluator.criteriaScores).map(([criteriaKey, score]) => (
                                                    <div
                                                        key={criteriaKey}
                                                        className="flex items-center justify-between rounded-lg border-2 border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                                                    >
                                                        <div className="flex-1">
                                                            <span className="text-lg font-medium text-gray-800">
                                                                {criteriaNames[criteriaKey as keyof typeof criteriaNames]}
                                                            </span>
                                                            <p className="mt-1 text-sm text-gray-600">
                                                                {criteriaKey.includes('teknis')
                                                                    ? 'Aspek Teknis'
                                                                    : criteriaKey.includes('perilaku')
                                                                      ? 'Aspek Perilaku'
                                                                      : 'Aspek Keahlian'}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center space-x-3">
                                                            <div className="text-right">
                                                                <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
                                                                <div className={`h-4 w-4 rounded-full ${getProgressColor(score)} mt-1`}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Evaluator Notes */}
                                        {evaluator.notes && (
                                            <div className="rounded-r-lg border-l-4 border-yellow-400 bg-yellow-50 p-6">
                                                <div className="flex items-start space-x-3">
                                                    <Info className="mt-1 h-6 w-6 text-yellow-600" />
                                                    <div>
                                                        <h6 className="mb-2 text-lg font-bold text-yellow-800">
                                                            Catatan dari {evaluator.evaluatorName}:
                                                        </h6>
                                                        <p className="leading-relaxed text-yellow-700">{evaluator.notes}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Weighted Calculation Breakdown */}
                            <Card className="border-yellow-200 bg-yellow-50 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-3 text-2xl text-yellow-800">
                                        <Calculator className="h-7 w-7" />
                                        <span>Perhitungan Nilai Akhir (Sistem Berbobot)</span>
                                    </CardTitle>
                                    <CardDescription className="text-lg text-yellow-700">
                                        Berikut adalah breakdown perhitungan nilai akhir berdasarkan bobot yang telah direvisi
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-4">
                                        {employee.evaluatorScores.map((evaluator, index) => (
                                            <div
                                                key={index}
                                                className="flex items-center justify-between rounded-lg border-2 border-yellow-200 bg-white p-6 shadow-sm"
                                            >
                                                <div className="flex items-center space-x-4">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-white">
                                                        {index + 1}
                                                    </div>
                                                    <div>
                                                        <span className="text-lg font-bold text-gray-800">{evaluator.evaluatorName}</span>
                                                        <span className="ml-3 text-gray-600">
                                                            (
                                                            {evaluator.type === 'kepala-biro'
                                                                ? 'Kepala Biro'
                                                                : evaluator.type === 'kepala-bagian'
                                                                  ? 'Kepala Bagian'
                                                                  : 'Teman Setingkat'}
                                                            )
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="mb-1 font-mono text-lg text-gray-700">
                                                        {evaluator.overallScore.toFixed(1)} × {(evaluator.weight * 100).toFixed(0)}% ={' '}
                                                        <span className="font-bold text-indigo-600">
                                                            {(evaluator.overallScore * evaluator.weight).toFixed(2)}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-500">Kontribusi ke nilai akhir</div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mt-6 border-t-2 border-yellow-300 pt-6">
                                            <div className="flex items-center justify-between rounded-lg border-2 border-yellow-300 bg-gradient-to-r from-yellow-100 to-orange-100 p-6">
                                                <div className="flex items-center space-x-3">
                                                    <Star className="h-8 w-8 text-yellow-600" />
                                                    <span className="text-2xl font-bold text-gray-800">Nilai Akhir Berbobot:</span>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-4xl font-bold ${getScoreColor(employee.weightedOverallScore)}`}>
                                                        {employee.weightedOverallScore.toFixed(2)}
                                                    </span>
                                                    <div className="mt-1 text-lg text-gray-600">{getScoreLabel(employee.weightedOverallScore)}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
