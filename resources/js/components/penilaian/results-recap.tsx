'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { BarChart3, Calculator, Download, Eye, Search } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Updated dummy results data with weighted scoring
const evaluationResults = [
    {
        id: 1,
        employeeName: 'Ahmad Rizki',
        unit: 'IT Support',
        position: 'Technical Support',
        photo: '/placeholder.svg?height=60&width=60&text=AR',
        // Individual evaluator scores
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
            },
            {
                evaluatorName: 'Ir. Sari Dewi',
                type: 'kepala-bagian',
                weight: 0.25,
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
                weight: 0.1,
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
        // Calculated weighted scores
        weightedOverallScore: 80.1, // 50% * 80.0 + 25% * 79.5 + 10% * 82.7
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
                weight: 0.1,
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
        weightedOverallScore: 87.6, // 50% * 87.8 + 10% * 86.0 (no kepala bagian)
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

export default function ResultsRecap() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    const [filterUnit, setFilterUnit] = useState('all');

    const filteredResults = evaluationResults.filter((result) => {
        const matchesSearch =
            result.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || result.unit.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUnit = filterUnit === 'all' || result.unit === filterUnit;
        return matchesSearch && matchesUnit;
    });

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

    const units = [...new Set(evaluationResults.map((r) => r.unit))];

    const handleViewDetail = (employee: any) => {
        router.post(route('evaluasi.scoredetail'), employee, {
            onError: (error) => {
                console.error('Error fetching employee details:', error);
            },
        });
        // setSelectedEmployee(employee);
        // setIsDetailOpen(true);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Rekap Hasil Penilaian</CardTitle>
                    <CardDescription>Lihat dan analisis hasil penilaian kinerja pegawai outsourcing dengan sistem bobot</CardDescription>
                </CardHeader>
                <CardContent>
                    {/* Weighted Scoring Info */}
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                            <Calculator className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-800">Sistem Penilaian Berbobot</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-blue-700">
                            <div className="rounded bg-blue-100 p-2 text-center">
                                <div className="font-bold">50%</div>
                                <div>Kepala Biro</div>
                            </div>
                            <div className="rounded bg-blue-100 p-2 text-center">
                                <div className="font-bold">25%</div>
                                <div>Kepala Bagian</div>
                            </div>
                            <div className="rounded bg-blue-100 p-2 text-center">
                                <div className="font-bold">10%</div>
                                <div>Teman Setingkat</div>
                            </div>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                            <Input
                                placeholder="Cari pegawai atau unit..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={filterUnit} onValueChange={setFilterUnit}>
                            <SelectTrigger className="w-full sm:w-48">
                                <SelectValue placeholder="Filter Unit" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Semua Unit</SelectItem>
                                {units.map((unit) => (
                                    <SelectItem key={unit} value={unit}>
                                        {unit}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button className="flex items-center space-x-2">
                            <Download className="h-4 w-4" />
                            <span>Export</span>
                        </Button>
                    </div>

                    {/* Results Grid */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredResults.map((result) => (
                            <Card key={result.id} className="transition-shadow hover:shadow-lg">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={result.photo || '/placeholder.svg'}
                                                alt={result.employeeName}
                                                className="h-12 w-12 rounded-full border-2 border-blue-100"
                                            />
                                            <div>
                                                <CardTitle className="text-lg">{result.employeeName}</CardTitle>
                                                <CardDescription>
                                                    {result.unit} • {result.position}
                                                </CardDescription>
                                            </div>
                                        </div>
                                        <Badge variant={result.status === 'completed' ? 'default' : 'secondary'}>
                                            {result.status === 'completed' ? 'Selesai' : 'Progress'}
                                        </Badge>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    {/* Weighted Overall Score */}
                                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                                        <div className={`text-3xl font-bold ${getScoreColor(result.weightedOverallScore)}`}>
                                            {result.weightedOverallScore.toFixed(1)}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">Nilai Akhir (Berbobot)</p>
                                        <p className="text-xs text-gray-500">{getScoreLabel(result.weightedOverallScore)}</p>
                                        <Progress value={(result.weightedOverallScore / 100) * 100} className="mt-2 h-2" />
                                    </div>

                                    {/* Evaluators */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Penilai ({result.evaluatorScores.length}):</h4>
                                        <div className="space-y-1">
                                            {result.evaluatorScores.map((evaluator, index) => (
                                                <div key={index} className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600">
                                                        {evaluator.type === 'kepala-biro'
                                                            ? 'Kepala Biro'
                                                            : evaluator.type === 'kepala-bagian'
                                                              ? 'Kepala Bagian'
                                                              : 'Teman Setingkat'}
                                                    </span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className={`font-medium ${getScoreColor(evaluator.overallScore)}`}>
                                                            {evaluator.overallScore.toFixed(1)}
                                                        </span>
                                                        <span className="text-gray-400">({(evaluator.weight * 100).toFixed(0)}%)</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button onClick={() => handleViewDetail(result)} className="flex w-full items-center space-x-2" variant="outline">
                                        <Eye className="h-4 w-4" />
                                        <span>Lihat Detail</span>
                                    </Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {filteredResults.length === 0 && (
                        <Card className="py-12 text-center">
                            <CardContent>
                                <BarChart3 className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                                <h3 className="mb-2 text-lg font-medium text-gray-900">Tidak ada hasil ditemukan</h3>
                                <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            {/* Meski tidak terpakai tapi tetap disimpan untuk referensi, keren soalnya! */}
            {/* Detail Dialog */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[900px]">
                    <DialogHeader>
                        <DialogTitle className="flex items-center space-x-3">
                            <img
                                src={selectedEmployee?.photo || '/placeholder.svg'}
                                alt={selectedEmployee?.employeeName}
                                className="h-10 w-10 rounded-full"
                            />
                            <span>Detail Penilaian - {selectedEmployee?.employeeName}</span>
                        </DialogTitle>
                        <DialogDescription>
                            {selectedEmployee?.unit} • {selectedEmployee?.position}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEmployee && (
                        <div className="space-y-6 py-4">
                            {/* Weighted Summary */}
                            <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                <CardHeader>
                                    <CardTitle className="text-lg">Nilai Akhir Berbobot</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="text-center">
                                            <div className="text-3xl font-bold">{selectedEmployee.weightedOverallScore.toFixed(1)}</div>
                                            <p className="text-blue-100">Nilai Akhir</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-3xl font-bold">{selectedEmployee.evaluatorScores.length}</div>
                                            <p className="text-blue-100">Jumlah Penilai</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Detailed Scores by Evaluator */}
                            {selectedEmployee.evaluatorScores.map((evaluator: any, evalIndex: any) => (
                                <Card key={evalIndex} className="border-l-4 border-l-indigo-500">
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle className="text-lg">{evaluator.evaluatorName}</CardTitle>
                                                <CardDescription>
                                                    {evaluator.type === 'kepala-biro'
                                                        ? 'Kepala Biro'
                                                        : evaluator.type === 'kepala-bagian'
                                                          ? 'Kepala Bagian'
                                                          : 'Teman Setingkat'}
                                                    • Bobot: {(evaluator.weight * 100).toFixed(0)}%
                                                </CardDescription>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-2xl font-bold ${getScoreColor(evaluator.overallScore)}`}>
                                                    {evaluator.overallScore.toFixed(1)}
                                                </div>
                                                <p className="text-xs text-gray-500">Nilai Keseluruhan</p>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        {/* Aspect Scores */}
                                        <div>
                                            <h4 className="mb-3 font-medium">Nilai per Aspek:</h4>
                                            <div className="grid grid-cols-3 gap-4">
                                                {Object.entries(evaluator.aspectScores).map(([aspectKey, score]) => (
                                                    <div key={aspectKey} className="rounded-lg bg-gray-50 p-3 text-center">
                                                        <div className={`text-xl font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</div>
                                                        <p className="mt-1 text-xs text-gray-600">
                                                            {aspectNames[aspectKey as keyof typeof aspectNames]}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Criteria Scores */}
                                        <div>
                                            <h4 className="mb-3 font-medium">Nilai per Kriteria:</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {Object.entries(evaluator.criteriaScores).map(([criteriaKey, score]) => (
                                                    <div
                                                        key={criteriaKey}
                                                        className="flex items-center justify-between rounded-lg border bg-white p-3"
                                                    >
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {criteriaNames[criteriaKey as keyof typeof criteriaNames]}
                                                        </span>
                                                        <div className="flex items-center space-x-2">
                                                            <span className={`font-bold ${getScoreColor(score)}`}>{score}</span>
                                                            <div className={`h-2 w-2 rounded-full ${getProgressColor(score)}`}></div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}

                            {/* Weighted Calculation Breakdown */}
                            <Card className="border-yellow-200 bg-yellow-50">
                                <CardHeader>
                                    <CardTitle className="flex items-center space-x-2 text-lg text-yellow-800">
                                        <Calculator className="h-5 w-5" />
                                        <span>Perhitungan Nilai Akhir</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {selectedEmployee.evaluatorScores.map((evaluator: any, index: any) => (
                                            <div key={index} className="flex items-center justify-between rounded-lg border bg-white p-3">
                                                <div>
                                                    <span className="font-medium">{evaluator.evaluatorName}</span>
                                                    <span className="ml-2 text-sm text-gray-500">
                                                        (
                                                        {evaluator.type === 'kepala-biro'
                                                            ? 'Kepala Biro'
                                                            : evaluator.type === 'kepala-bagian'
                                                              ? 'Kepala Bagian'
                                                              : 'Teman Setingkat'}
                                                        )
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm text-gray-600">
                                                        {evaluator.overallScore.toFixed(1)} × {(evaluator.weight * 100).toFixed(0)}% ={' '}
                                                        {(evaluator.overallScore * evaluator.weight).toFixed(1)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="mt-3 border-t pt-3">
                                            <div className="flex items-center justify-between text-lg font-bold">
                                                <span>Nilai Akhir:</span>
                                                <span className={getScoreColor(selectedEmployee.weightedOverallScore)}>
                                                    {selectedEmployee.weightedOverallScore.toFixed(1)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Chart Visualization */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Visualisasi Penilaian</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart
                                            data={selectedEmployee.evaluatorScores.map((e: any) => ({
                                                name: e.evaluatorName.split(' ')[0],
                                                score: e.overallScore,
                                                weight: e.weight * 100,
                                            }))}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip
                                                formatter={(value, name) => [
                                                    name === 'score' ? `${value} poin` : `${value}%`,
                                                    name === 'score' ? 'Nilai' : 'Bobot',
                                                ]}
                                            />
                                            <Legend />
                                            <Bar dataKey="score" fill="#3b82f6" name="Nilai" />
                                            <Bar dataKey="weight" fill="#10b981" name="Bobot (%)" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
