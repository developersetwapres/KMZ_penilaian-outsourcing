'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { router } from '@inertiajs/react';
import { BarChart3, Download, Eye, Search } from 'lucide-react';
import { useState } from 'react';

export default function ResultsRecap({ evaluationResults }: any) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterUnit, setFilterUnit] = useState('all');

    const filteredResults = evaluationResults.filter((result: any) => {
        const matchesSearch =
            result.name.toLowerCase().includes(searchTerm.toLowerCase()) || result.unit_kerja.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesUnit = filterUnit === 'all' || result.unit_kerja === filterUnit;
        return matchesSearch && matchesUnit;
    });

    const getScoreColor = (score: number) => {
        if (score >= 91) return 'text-green-600';
        if (score >= 81) return 'text-blue-600';
        if (score >= 71) return 'text-yellow-600';
        if (score >= 61) return 'text-orange-600';
        return 'text-red-600';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 91) return 'Sangat Baik';
        if (score >= 81) return 'Baik';
        if (score >= 71) return 'Butuh Perbaikan';
        if (score >= 61) return 'Kurang';
        return 'Sangat Kurang';
    };

    const units = [...new Set(evaluationResults.map((r) => r.unit_kerja))];

    const handleViewDetail = (slug: string) => {
        router.get(
            route('evaluasi.scoredetail', slug),
            {},
            {
                onError: (error) => {
                    console.error('Error fetching employee details:', error);
                },
            },
        );
    };

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <BarChart3 className="h-6 w-6" />
                        <span>Ringkasan Evaluasi</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                        Lihat hasil akhir evaluasi dari berbagai penilai, termasuk skor total dan grafik performa.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                {/* <CardHeader>
                    <CardTitle>Rekap Hasil Penilaian</CardTitle>
                    <CardDescription>Lihat dan analisis hasil penilaian kinerja pegawai outsourcing dengan sistem bobot</CardDescription>
                </CardHeader> */}
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
                        {filteredResults.map((result: any) => (
                            <Card key={result.id} className="gap-0 transition-shadow hover:shadow-lg">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <img
                                                src={`/storage/${result.image}` || '/placeholder.svg'}
                                                alt={result.name}
                                                className="h-12 w-12 rounded-full border-2 border-blue-100 object-cover"
                                            />

                                            <div>
                                                <CardTitle className="text-lg">{result.name}</CardTitle>
                                                <CardDescription>
                                                    {result.unit_kerja} • {result.jabatan}
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
                                        <p className="mt-1 text-sm text-gray-600">Nilai Akhir</p>
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
                                                        {evaluator.type === 'atasan'
                                                            ? 'Atasan'
                                                            : evaluator.type === 'penerima_layanan'
                                                              ? 'Penerima Layanan'
                                                              : 'Teman Setingkat'}
                                                    </span>
                                                    <div className="flex items-center space-x-2 font-mono">
                                                        <span className={`font-medium ${getScoreColor(evaluator.averageScore)}`}>
                                                            {evaluator.averageScore.toFixed(1)}
                                                        </span>
                                                        <span>
                                                            {' × '} {evaluator.weight * 100 + '%'}
                                                        </span>
                                                        <span>
                                                            {' = '} {evaluator.weightedScore}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <Button
                                        onClick={() => handleViewDetail(result.slug)}
                                        className="flex w-full items-center space-x-2"
                                        variant="outline"
                                    >
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
        </div>
    );
}
