'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, ClipboardCheck, FileText, Info, UserCheck } from 'lucide-react';

// Classification function (untouched)
const getScoreClassification = (score: number) => {
    if (score <= 50) return { label: 'SK (Sangat Kurang)', color: 'bg-red-100 text-red-800 border-red-200', range: '≤50' };
    if (score <= 75) return { label: 'K (Kurang)', color: 'bg-orange-100 text-orange-800 border-orange-200', range: '51-75' };
    if (score <= 90) return { label: 'B (Baik)', color: 'bg-blue-100 text-blue-800 border-blue-200', range: '76-90' };
    return { label: 'SB (Sangat Baik)', color: 'bg-green-100 text-green-800 border-green-200', range: '91-100' };
};

interface ViewScoreProps {
    employee: {
        id: number;
        name: string;
        email: string;
        jabatan: string;
        lokasi_kerja: string;
        unit_kerja: string;
        perusahaan: string;
        phone: string;
        image?: string;
    };
    evaluator: any;
    evaluationData: any;
    overallNotes: string;
    averageScore: any;
}

export default function ViewScore({ employee, averageScore, evaluator, evaluationData, overallNotes }: ViewScoreProps) {
    const aspects = Object.keys(evaluationData);

    // Average per aspect (kept for compatibility if needed elsewhere)
    const calculateAspectScore = (aspectKey: string) => {
        const aspect = evaluationData[aspectKey as keyof typeof evaluationData];
        if (!aspect) return 0;
        const criteriaScores = aspect.criteria.map((criterion: any) => criterion.score || 0);
        const totalScore = criteriaScores.reduce((sum: number, s: number) => sum + s, 0);
        return criteriaScores.length > 0 ? totalScore / criteriaScores.length : 0;
    };

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

    const overallScore =
        aspects.reduce((total, aspectKey) => {
            return total + calculateAspectScore(aspectKey);
        }, 0) / (aspects.length || 1);

    const getScoreColor = (score: number) => {
        if (score >= 91) return 'text-green-600 bg-green-50';
        if (score >= 81) return 'text-blue-600 bg-blue-50';
        if (score >= 71) return 'text-yellow-600 bg-yellow-50';
        if (score >= 61) return 'text-orange-600 bg-orange-50';
        return 'text-red-600 bg-red-50';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 91) return 'Sangat Baik';
        if (score >= 81) return 'Baik';
        if (score >= 71) return 'Butuh Perbaikan';
        if (score >= 61) return 'Kurang';
        return 'Sangat Kurang';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <Link href={route('evaluator.card')}>
                            <Button variant="ghost" className="flex items-center space-x-2">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    <div className="grid gap-8 md:grid-cols-2">
                        {/* Evaluator Card */}
                        <Card className="relative gap-1 overflow-hidden border-0 bg-gradient-to-br from-green-500 to-emerald-600 pb-0 text-white shadow-2xl">
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

                            <CardHeader className="relative">
                                <div className="mb-4 flex items-center space-x-3">
                                    <div className="rounded-full bg-white/20 p-2">
                                        <UserCheck className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <Badge className="border-white/30 bg-white/20 font-semibold text-white">PENILAI</Badge>
                                        <CardTitle className="mt-1 text-sm text-green-100">Yang Memberikan Penilaian</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="relative pb-8 text-center">
                                <div className="relative mx-2 mb-6">
                                    <div className="absolute inset-0 scale-110 animate-pulse rounded-full bg-white/20"></div>
                                    <img
                                        src={`/storage/${evaluator.image}`}
                                        alt={evaluator.name}
                                        className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>

                                <h3 className="mb-1 text-2xl font-bold text-white">{evaluator.name}</h3>
                                <p className="text-lg font-medium text-green-100">{evaluator.jabatan}</p>

                                <div className="mt-3">
                                    <Badge className="border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                                        {evaluator.role === 'atasan'
                                            ? 'Atasan'
                                            : evaluator.role === 'penerima_layanan'
                                              ? 'Penerima Layanan'
                                              : 'Teman Setingkat'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Employee Card */}
                        <Card className="relative gap-1 overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-indigo-600 pb-0 text-white shadow-2xl">
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

                            <CardHeader className="relative">
                                <div className="mb-4 flex items-center space-x-3">
                                    <div className="rounded-full bg-white/20 p-2">
                                        <ClipboardCheck className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <Badge className="border-white/30 bg-white/20 font-semibold text-white">YANG DINILAI</Badge>
                                        <CardTitle className="mt-1 text-sm text-blue-100">Pegawai yang Sedang Dievaluasi</CardTitle>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="relative pb-8 text-center">
                                <div className="relative mx-2 mb-6">
                                    <div className="absolute inset-0 scale-110 animate-pulse rounded-full bg-white/20"></div>
                                    <img
                                        src={`/storage/${employee.image}`}
                                        alt={employee.name}
                                        className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>

                                <h3 className="mb-1 text-2xl font-bold text-white">{employee.name}</h3>
                                <p className="text-lg font-medium text-blue-100">{employee.jabatan}</p>

                                <div className="mt-3">
                                    <Badge className="border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                                        {employee.unit_kerja}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        {/* Overall Summary Card - UPDATED to match evaluation-form.tsx concept */}
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
                                                    {aspectAKey ? evaluationData[aspectAKey as keyof typeof evaluationData].title : 'Aspek 1'}
                                                </div>
                                                <div className="text-xs text-blue-100">{`${a.avg} x ${weightA}%`}</div>
                                                <div className="mt-1 text-3xl font-extrabold tracking-tight">{`${aContribution}`}</div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-sm text-blue-100">
                                                    {aspectBKey ? evaluationData[aspectBKey as keyof typeof evaluationData].title : 'Aspek 2'}
                                                </div>
                                                <div className="text-xs text-blue-100">{`${b.avg} x ${weightB}%`}</div>
                                                <div className="mt-1 text-3xl font-extrabold tracking-tight">{`${bContribution}`}</div>
                                            </div>

                                            <div className="text-center">
                                                <div className="text-sm text-blue-100">Skor Akhir</div>
                                                <div className="text-xs text-blue-100">{`${aContribution} + ${bContribution}`}</div>
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
                                                    <CardDescription className="text-blue-600">{aspect.criteria.length} Kriteria</CardDescription>
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
                                                    <div key={criterion.id} className="rounded-lg border-l-4 border-l-gray-300 bg-gray-50 p-5">
                                                        <div className="mb-4 flex items-start justify-between">
                                                            <div className="flex flex-1 items-start space-x-3">
                                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-sm font-bold text-white">
                                                                    {aspectIndex + 1}.{criterionIndex + 1}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4 className="text-xl font-semibold text-gray-800">{criterion.name}</h4>
                                                                    <div className="mt-2 text-lg font-bold text-gray-900">Nilai: {score}</div>
                                                                </div>
                                                            </div>
                                                            <div className="ml-4">
                                                                <Badge className={`${classification.color} border px-3 py-1 text-sm font-semibold`}>
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

                        {/* Overall Notes */}
                        {overallNotes && (
                            <Card className="gap-0 border-l-4 border-l-yellow-500 py-4">
                                <CardHeader className="bg-yellow-50 py-2">
                                    <CardTitle className="flex items-center space-x-2 text-xl text-yellow-800">
                                        <FileText className="h-6 w-6" />
                                        <span>Catatan Keseluruhan</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="rounded-lg border border-yellow-200 bg-white p-4">
                                        <p className="leading-relaxed text-gray-800">{overallNotes}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
