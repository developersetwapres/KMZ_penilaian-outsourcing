'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Award, Building2, Calculator, Star, User } from 'lucide-react';
import { useEffect, useState } from 'react';

// Updated dummy results data with new weighted scoring (50%, 30%, 20%)
const evaluationResults = [
    {
        id: 1,
        employeeName: 'Ahmad Rizki',
        unit: 'IT Support',
        position: 'Technical Support',
        photo: '/placeholder.svg?height=60&width=60&text=AR',
        evaluatorScores: [
            {
                evaluatorName: 'Dr. Andi Wijaya',
                type: 'kepala-biro',
                weight: 0.5, // 50%
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
            },
            {
                evaluatorName: 'Ir. Sari Dewi',
                type: 'kepala-bagian',
                weight: 0.3, // 30%
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
            },
            {
                evaluatorName: 'Ahmad Fauzi',
                type: 'teman-setingkat',
                weight: 0.2, // 20%
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
            },
        ],
        // Updated weighted calculation: 50% * 80.0 + 30% * 79.5 + 20% * 82.7 = 80.39
        weightedOverallScore: 80.4,
        status: 'completed',
    },
    {
        id: 2,
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
            },
        ],
        // Updated: 50% * 87.8 + 20% * 86.0 = 61.1 (no kepala bagian, so normalized)
        weightedOverallScore: 87.3,
        status: 'completed',
    },
    {
        id: 3,
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
            },
        ],
        weightedOverallScore: 70.0, // Only kepala biro evaluated
        status: 'in-progress',
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

const params = {
    id: '2',
};

export default function ResultDetailPage() {
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

    useEffect(() => {
        const employeeId = Number.parseInt(params.id as string);
        const employee = evaluationResults.find((emp) => emp.id === employeeId);
        setSelectedEmployee(employee);
    }, [params.id]);

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

    if (!selectedEmployee) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <Card className="w-96">
                    <CardContent className="py-12 text-center">
                        <div className="mb-2 text-lg font-medium text-gray-900">Data tidak ditemukan</div>
                        <p className="mb-4 text-gray-500">Employee dengan ID tersebut tidak ditemukan</p>
                        <Button
                        //  onClick={() => router.back()}
                        >
                            Kembali
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <Button
                            variant="ghost"
                            //  onClick={() => router.back() }
                            className="flex items-center space-x-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            <span>Kembali ke Rekap Hasil</span>
                        </Button>

                        <div className="flex items-center space-x-3">
                            <img
                                src={selectedEmployee.photo || '/placeholder.svg'}
                                alt={selectedEmployee.employeeName}
                                className="h-8 w-8 rounded-full"
                            />
                            <div className="text-right">
                                <div className="font-medium text-gray-900">{selectedEmployee.employeeName}</div>
                                <div className="text-sm text-gray-500">
                                    {selectedEmployee.unit} • {selectedEmployee.position}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* Employee Profile Header */}
                    <Card className="relative overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                        <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

                        <CardHeader className="relative z-10">
                            <div className="flex items-center space-x-6">
                                <div className="relative">
                                    <img
                                        src={selectedEmployee.photo || '/placeholder.svg'}
                                        alt={selectedEmployee.employeeName}
                                        className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
                                    />
                                    <div className="absolute -top-2 -right-2 rounded-full bg-yellow-400 p-2 text-yellow-900 shadow-lg">
                                        <Award className="h-5 w-5" />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="mb-2 text-3xl font-bold">{selectedEmployee.employeeName}</CardTitle>
                                    <CardDescription className="text-lg text-indigo-100">
                                        {selectedEmployee.position} • {selectedEmployee.unit}
                                    </CardDescription>
                                    <div className="mt-4 flex items-center space-x-4">
                                        <Badge className="border-white/30 bg-white/20 px-3 py-1 text-white">
                                            {selectedEmployee.status === 'completed' ? 'Evaluasi Selesai' : 'Dalam Progress'}
                                        </Badge>
                                        <div className="flex items-center space-x-2 text-indigo-100">
                                            <User className="h-4 w-4" />
                                            <span>{selectedEmployee.evaluatorScores.length} Penilai</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                    </Card>

                    {/* Updated Weighted Scoring Info */}
                    <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-emerald-800">
                                <Calculator className="h-6 w-6" />
                                <span>Sistem Penilaian Berbobot (Direvisi)</span>
                            </CardTitle>
                            <CardDescription className="text-emerald-700">
                                Perhitungan nilai akhir menggunakan sistem bobot yang telah diperbarui
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="rounded-xl border-2 border-emerald-200 bg-emerald-100 p-4 text-center">
                                    <div className="mb-2 text-3xl font-bold text-emerald-800">50%</div>
                                    <div className="font-medium text-emerald-700">Kepala Biro</div>
                                    <div className="mt-1 text-sm text-emerald-600">Bobot Tertinggi</div>
                                </div>
                                <div className="rounded-xl border-2 border-teal-200 bg-teal-100 p-4 text-center">
                                    <div className="mb-2 text-3xl font-bold text-teal-800">30%</div>
                                    <div className="font-medium text-teal-700">Kepala Bagian</div>
                                    <div className="mt-1 text-sm text-teal-600">Bobot Menengah</div>
                                </div>
                                <div className="rounded-xl border-2 border-cyan-200 bg-cyan-100 p-4 text-center">
                                    <div className="mb-2 text-3xl font-bold text-cyan-800">20%</div>
                                    <div className="font-medium text-cyan-700">Teman Setingkat</div>
                                    <div className="mt-1 text-sm text-cyan-600">Bobot Dasar</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Weighted Summary */}
                    <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-3 text-2xl">
                                <div className="rounded-full bg-white/20 p-3">
                                    <Star className="h-8 w-8" />
                                </div>
                                <span>Nilai Akhir Berbobot</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-3">
                                <div className="text-center">
                                    <div className="mb-2 text-5xl font-bold">{selectedEmployee.weightedOverallScore.toFixed(1)}</div>
                                    <div className="text-lg text-blue-100">Nilai Akhir</div>
                                    <div className="mt-1 text-sm text-blue-200">{getScoreLabel(selectedEmployee.weightedOverallScore)}</div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-5xl font-bold">{selectedEmployee.evaluatorScores.length}</div>
                                    <div className="text-lg text-blue-100">Jumlah Penilai</div>
                                    <div className="mt-1 text-sm text-blue-200">Yang Memberikan Penilaian</div>
                                </div>
                                <div className="text-center">
                                    <div className="mb-2 text-5xl font-bold">6</div>
                                    <div className="text-lg text-blue-100">Total Kriteria</div>
                                    <div className="mt-1 text-sm text-blue-200">Yang Dinilai</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Detailed Scores by Evaluator */}
                    {selectedEmployee.evaluatorScores.map((evaluator: any, evalIndex: any) => (
                        <Card key={evalIndex} className="border-l-4 border-l-indigo-500 shadow-lg">
                            <CardHeader className="bg-gradient-to-r from-gray-50 to-indigo-50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold text-white">
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
                                                • Bobot: {(evaluator.weight * 100).toFixed(0)}%
                                            </CardDescription>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-4xl font-bold ${getScoreColor(evaluator.overallScore)}`}>
                                            {evaluator.overallScore.toFixed(1)}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Nilai Keseluruhan</p>
                                        <Badge
                                            className={`mt-2 ${getScoreColor(evaluator.overallScore).replace('text-', 'bg-').replace('-600', '-100')} ${getScoreColor(evaluator.overallScore).replace('-600', '-800')} border-2`}
                                        >
                                            {getScoreLabel(evaluator.overallScore)}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-6 p-6">
                                {/* Aspect Scores */}
                                <div>
                                    <h4 className="mb-4 text-xl font-bold text-gray-800">Nilai per Aspek:</h4>
                                    <div className="grid grid-cols-3 gap-6">
                                        {Object.entries(evaluator.aspectScores).map(([aspectKey, score]) => (
                                            <div
                                                key={aspectKey}
                                                className="rounded-xl border-2 border-gray-200 bg-gray-50 p-4 text-center transition-shadow hover:shadow-md"
                                            >
                                                <div className={`mb-2 text-3xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
                                                <p className="text-sm font-medium text-gray-700">
                                                    {aspectNames[aspectKey as keyof typeof aspectNames]}
                                                </p>
                                                <div
                                                    className={`mt-3 h-2 w-full rounded-full ${getProgressColor(score)}`}
                                                    style={{ width: `${(score / 100) * 100}%` }}
                                                ></div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Criteria Scores */}
                                <div>
                                    <h4 className="mb-4 text-xl font-bold text-gray-800">Nilai per Kriteria:</h4>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {Object.entries(evaluator.criteriaScores).map(([criteriaKey, score]) => (
                                            <div
                                                key={criteriaKey}
                                                className="flex items-center justify-between rounded-xl border-2 border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
                                            >
                                                <div className="flex-1">
                                                    <span className="block text-sm font-semibold text-gray-800">
                                                        {criteriaNames[criteriaKey as keyof typeof criteriaNames]}
                                                    </span>
                                                    <span className="text-xs text-gray-500">Kriteria Penilaian</span>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}</span>
                                                    <div className={`h-3 w-3 rounded-full ${getProgressColor(score)}`}></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}

                    {/* Weighted Calculation Breakdown */}
                    <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 shadow-lg">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-3 text-2xl text-yellow-800">
                                <div className="rounded-full bg-yellow-200 p-3">
                                    <Calculator className="h-6 w-6 text-yellow-800" />
                                </div>
                                <span>Perhitungan Nilai Akhir (Sistem Baru)</span>
                            </CardTitle>
                            <CardDescription className="text-lg text-yellow-700">
                                Breakdown perhitungan dengan bobot yang telah direvisi
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {selectedEmployee.evaluatorScores.map((evaluator: any, index: any) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between rounded-xl border-2 border-yellow-200 bg-white p-4 shadow-sm"
                                    >
                                        <div className="flex items-center space-x-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-600 font-bold text-white">
                                                {index + 1}
                                            </div>
                                            <div>
                                                <span className="text-lg font-bold text-gray-800">{evaluator.evaluatorName}</span>
                                                <div className="text-sm text-gray-600">
                                                    {evaluator.type === 'kepala-biro'
                                                        ? 'Kepala Biro'
                                                        : evaluator.type === 'kepala-bagian'
                                                          ? 'Kepala Bagian'
                                                          : 'Teman Setingkat'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="mb-1 font-mono text-lg text-gray-700">
                                                {evaluator.overallScore.toFixed(1)} × {(evaluator.weight * 100).toFixed(0)}% ={' '}
                                                <span className="font-bold text-yellow-800">
                                                    {(evaluator.overallScore * evaluator.weight).toFixed(1)}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500">Kontribusi ke nilai akhir</div>
                                        </div>
                                    </div>
                                ))}

                                <div className="mt-6 border-t-2 border-yellow-300 pt-4">
                                    <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 p-6 text-white shadow-lg">
                                        <div>
                                            <span className="text-2xl font-bold">Nilai Akhir Berbobot:</span>
                                            <div className="mt-1 text-sm opacity-90">Hasil perhitungan dengan sistem bobot baru</div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-4xl font-bold">{selectedEmployee.weightedOverallScore.toFixed(1)}</span>
                                            <div className="text-lg opacity-90">{getScoreLabel(selectedEmployee.weightedOverallScore)}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Performance Summary */}
                    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-3 text-2xl text-purple-800">
                                <div className="rounded-full bg-purple-200 p-3">
                                    <Building2 className="h-6 w-6 text-purple-800" />
                                </div>
                                <span>Ringkasan Kinerja</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-purple-800">Kekuatan:</h4>
                                    <ul className="space-y-2">
                                        {selectedEmployee.evaluatorScores.map((evaluator: any, index: any) => {
                                            const bestAspect = Object.entries(evaluator.aspectScores).reduce((a, b) => (a[1] > b[1] ? a : b));
                                            return (
                                                <li key={index} className="flex items-center space-x-2 text-sm">
                                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                                    <span>
                                                        <strong>{aspectNames[bestAspect[0] as keyof typeof aspectNames]}</strong> (
                                                        {bestAspect[1].toFixed(1)}) - menurut {evaluator.evaluatorName}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-lg font-bold text-purple-800">Area Pengembangan:</h4>
                                    <ul className="space-y-2">
                                        {selectedEmployee.evaluatorScores.map((evaluator: any, index: any) => {
                                            const weakestAspect = Object.entries(evaluator.aspectScores).reduce((a, b) => (a[1] < b[1] ? a : b));
                                            return (
                                                <li key={index} className="flex items-center space-x-2 text-sm">
                                                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                                    <span>
                                                        <strong>{aspectNames[weakestAspect[0] as keyof typeof aspectNames]}</strong> (
                                                        {weakestAspect[1].toFixed(1)}) - menurut {evaluator.evaluatorName}
                                                    </span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
