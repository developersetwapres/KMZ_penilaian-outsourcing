'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart3, Download, Eye, Search, User } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

// Dummy results data
const evaluationResults = [
    {
        id: 1,
        employeeName: 'Ahmad Rizki',
        unit: 'IT Support',
        position: 'Technical Support',
        overallScore: 3.2,
        aspectScores: {
            'aspek-teknis': 3.5,
            'aspek-perilaku': 3.0,
            'aspek-lain': 3.1,
        },
        evaluatorScores: [
            { evaluatorName: 'Dr. Andi Wijaya', type: 'kepala-biro', score: 3.3 },
            { evaluatorName: 'Ir. Sari Dewi', type: 'kepala-bagian', score: 3.2 },
            { evaluatorName: 'Ahmad Fauzi', type: 'teman-setingkat', score: 3.1 },
        ],
        status: 'completed',
    },
    {
        id: 2,
        employeeName: 'Siti Nurhaliza',
        unit: 'Human Resources',
        position: 'HR Assistant',
        overallScore: 3.6,
        aspectScores: {
            'aspek-teknis': 3.4,
            'aspek-perilaku': 3.8,
            'aspek-lain': 3.6,
        },
        evaluatorScores: [
            { evaluatorName: 'Dr. Andi Wijaya', type: 'kepala-biro', score: 3.7 },
            { evaluatorName: 'Linda Sari', type: 'teman-setingkat', score: 3.5 },
        ],
        status: 'completed',
    },
    {
        id: 3,
        employeeName: 'Budi Santoso',
        unit: 'Finance',
        position: 'Accounting Staff',
        overallScore: 2.8,
        aspectScores: {
            'aspek-teknis': 2.9,
            'aspek-perilaku': 2.7,
            'aspek-lain': 2.8,
        },
        evaluatorScores: [{ evaluatorName: 'Dr. Andi Wijaya', type: 'kepala-biro', score: 2.9 }],
        status: 'in-progress',
    },
];

const aspectNames = {
    'aspek-teknis': 'Aspek Teknis',
    'aspek-perilaku': 'Aspek Perilaku',
    'aspek-lain': 'Aspek Penilaian Lain',
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
        if (score >= 3.5) return 'text-green-600';
        if (score >= 2.5) return 'text-blue-600';
        if (score >= 1.5) return 'text-orange-600';
        return 'text-red-600';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 3.5) return 'Sangat Baik';
        if (score >= 2.5) return 'Baik';
        if (score >= 1.5) return 'Kurang';
        return 'Sangat Kurang';
    };

    const getProgressColor = (score: number) => {
        if (score >= 3.5) return 'bg-green-500';
        if (score >= 2.5) return 'bg-blue-500';
        if (score >= 1.5) return 'bg-orange-500';
        return 'bg-red-500';
    };

    const units = [...new Set(evaluationResults.map((r) => r.unit))];

    const handleViewDetail = (employee: any) => {
        setSelectedEmployee(employee);
        setIsDetailOpen(true);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Rekap Hasil Penilaian</CardTitle>
                    <CardDescription>Lihat dan analisis hasil penilaian kinerja pegawai outsourcing</CardDescription>
                </CardHeader>
                <CardContent>
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
                                            <div className="rounded-full bg-blue-100 p-2">
                                                <User className="h-5 w-5 text-blue-600" />
                                            </div>
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
                                    {/* Overall Score */}
                                    <div className="rounded-lg bg-gray-50 p-4 text-center">
                                        <div className={`text-3xl font-bold ${getScoreColor(result.overallScore)}`}>
                                            {result.overallScore.toFixed(1)}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">{getScoreLabel(result.overallScore)}</p>
                                        <Progress value={(result.overallScore / 4) * 100} className="mt-2 h-2" />
                                    </div>

                                    {/* Aspect Scores */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Skor per Aspek:</h4>
                                        {Object.entries(result.aspectScores).map(([aspect, score]) => (
                                            <div key={aspect} className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">{aspectNames[aspect as keyof typeof aspectNames]}</span>
                                                <span className={`font-medium ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Evaluators */}
                                    <div className="space-y-2">
                                        <h4 className="text-sm font-medium">Penilai ({result.evaluatorScores.length}):</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {result.evaluatorScores.map((evaluator, index) => (
                                                <Badge key={index} variant="outline" className="text-xs">
                                                    {evaluator.type.replace('-', ' ')}
                                                </Badge>
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

            {/* Detail Dialog */}
            <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Detail Penilaian - {selectedEmployee?.employeeName}</DialogTitle>
                        <DialogDescription>
                            {selectedEmployee?.unit} • {selectedEmployee?.position}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedEmployee && (
                        <div className="space-y-6 py-4">
                            {/* Overall Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Ringkasan Penilaian</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="rounded-lg bg-blue-50 p-4 text-center">
                                            <div className={`text-2xl font-bold ${getScoreColor(selectedEmployee.overallScore)}`}>
                                                {selectedEmployee.overallScore.toFixed(1)}
                                            </div>
                                            <p className="text-sm text-gray-600">Skor Keseluruhan</p>
                                        </div>
                                        <div className="rounded-lg bg-green-50 p-4 text-center">
                                            <div className="text-2xl font-bold text-green-600">{selectedEmployee.evaluatorScores.length}</div>
                                            <p className="text-sm text-gray-600">Jumlah Penilai</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Aspect Breakdown */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Breakdown per Aspek</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {Object.entries(selectedEmployee.aspectScores).map(([aspect, score]) => (
                                        <div key={aspect} className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{aspectNames[aspect as keyof typeof aspectNames]}</span>
                                                <span className={`font-bold ${getScoreColor(score)}`}>{score.toFixed(1)}</span>
                                            </div>
                                            <Progress value={(score / 4) * 100} className="h-2" />
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Evaluator Scores */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Skor per Penilai</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    {selectedEmployee.evaluatorScores.map((evaluator, index) => (
                                        <div key={index} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                            <div>
                                                <p className="font-medium">{evaluator.evaluatorName}</p>
                                                <Badge className="mt-1 text-xs" variant="outline">
                                                    {evaluator.type.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                                                </Badge>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-xl font-bold ${getScoreColor(evaluator.score)}`}>
                                                    {evaluator.score.toFixed(1)}
                                                </div>
                                                <p className="text-xs text-gray-500">{getScoreLabel(evaluator.score)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Evaluation Type Breakdown */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">Tipe Penilaian</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <BarChart
                                            width={500}
                                            height={200}
                                            data={selectedEmployee.evaluatorScores.map((e) => ({
                                                name: e.evaluatorName,
                                                score: e.score,
                                            }))}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis domain={[0, 4]} />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="score" fill="#8884d8" minPointSize={0} />
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
