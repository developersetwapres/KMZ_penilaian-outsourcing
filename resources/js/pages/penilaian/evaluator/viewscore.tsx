'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';
import { ArrowLeft, CheckCircle, ClipboardCheck, FileText, Info, UserCheck } from 'lucide-react';

// Classification function
const getScoreClassification = (score: number) => {
    if (score <= 50) return { label: 'SK (Sangat Kurang)', color: 'bg-red-100 text-red-800 border-red-200', range: '≤50' };
    if (score <= 75) return { label: 'K (Kurang)', color: 'bg-orange-100 text-orange-800 border-orange-200', range: '51-75' };
    if (score <= 90) return { label: 'B (Baik)', color: 'bg-blue-100 text-blue-800 border-blue-200', range: '76-90' };
    return { label: 'SB (Sangat Baik)', color: 'bg-green-100 text-green-800 border-green-200', range: '91-100' };
};

interface EvaluationFormProps {
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
}

export default function ViewScore({ employee, evaluator, evaluationData, overallNotes }: EvaluationFormProps) {
    const aspects = Object.keys(evaluationData);

    const calculateAspectScore = (aspectKey: string) => {
        const aspect = evaluationData[aspectKey as keyof typeof evaluationData];
        if (!aspect) return 0;

        const criteriaScores = aspect.criteria.map((criterion: any) => criterion.score || 0);
        const totalScore = criteriaScores.reduce((sum: any, score: any) => sum + score, 0);

        return criteriaScores.length > 0 ? totalScore / criteriaScores.length : 0;
    };

    const renderReview = () => {
        const overallScore =
            aspects.reduce((total, aspectKey) => {
                return total + calculateAspectScore(aspectKey);
            }, 0) / aspects.length;

        const getScoreColor = (score: number) => {
            if (score > 90) return 'text-green-600 bg-green-50';
            if (score > 75) return 'text-blue-600 bg-blue-50';
            if (score > 50) return 'text-orange-600 bg-orange-50';
            return 'text-red-600 bg-red-50';
        };

        const getScoreLabel = (score: number) => {
            if (score > 90) return 'Sangat Baik';
            if (score > 75) return 'Baik';
            if (score > 50) return 'Kurang';
            return 'Sangat Kurang';
        };

        return (
            <div className="space-y-8">
                {/* Overall Summary Card */}
                <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-3 text-2xl">
                            <div className="rounded-full bg-white/20 p-3">
                                <CheckCircle className="h-8 w-8" />
                            </div>
                            <span>Review Penilaian Keseluruhan</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold">{overallScore.toFixed(1)}</div>
                                <div className="text-blue-100">Nilai Keseluruhan</div>
                                <div className="mt-1 text-sm text-blue-200">{getScoreLabel(overallScore)}</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold">{aspects.length}</div>
                                <div className="text-blue-100">Aspek Dinilai</div>
                                <div className="mt-1 text-sm text-blue-200">Aspek Penilaian</div>
                            </div>
                            <div className="text-center">
                                <div className="mb-2 text-4xl font-bold">
                                    {Object.values(evaluationData).reduce((total, aspect) => total + aspect.criteria.length, 0)}
                                </div>
                                <div className="text-blue-100">Total Kriteria</div>
                                <div className="mt-1 text-sm text-blue-200">Yang Dinilai</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Detailed Review by Aspect */}
                {aspects.map((aspectKey, aspectIndex) => {
                    const aspect = evaluationData[aspectKey as keyof typeof evaluationData];
                    const aspectScore = calculateAspectScore(aspectKey);

                    return (
                        <Card key={aspectKey} className="border-l-4 border-l-blue-500">
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
                                    <div className={`rounded-xl px-6 py-3 ${getScoreColor(aspectScore)}`}>
                                        <div className="text-3xl font-bold">{aspectScore.toFixed(1)}</div>
                                        <div className="text-sm font-medium">{getScoreLabel(aspectScore)}</div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-6">
                                <div className="space-y-6">
                                    {aspect.criteria.map((criterion: any, criterionIndex: any) => {
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

                                                {/* Indicators as information */}
                                                <div className="mt-4 rounded-lg border border-gray-200 bg-white p-4">
                                                    <h5 className="mb-2 flex items-center space-x-2 font-medium text-gray-700">
                                                        <Info className="h-4 w-4" />
                                                        <span>Indikator Penilaian:</span>
                                                    </h5>
                                                    <ul className="space-y-1 text-sm text-gray-600">
                                                        {criterion.indicators.map((indicator: any, idx: any) => (
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
                    <Card className="border-l-4 border-l-yellow-500">
                        <CardHeader className="bg-yellow-50">
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
        );
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
                        {/* Evaluator Card - Enhanced with Clear Label */}
                        <Card className="relative gap-1 overflow-hidden border-0 bg-gradient-to-br from-green-500 to-emerald-600 pb-0 text-white shadow-2xl">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

                            <CardHeader className="relative z-10">
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
                                {/* Photo with Enhanced Styling */}
                                <div className="relative mx-2 mb-6">
                                    <div className="absolute inset-0 scale-110 animate-pulse rounded-full bg-white/20"></div>
                                    <img
                                        src={`/storage/${evaluator.image}`}
                                        alt={evaluator.name}
                                        className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>

                                {/* Name and Position */}
                                <h3 className="mb-1 text-2xl font-bold text-white">{evaluator.name}</h3>
                                <p className="text-lg font-medium text-green-100">{evaluator.jabatan}</p>

                                {/* Role Badge */}
                                <div className="mt-4">
                                    <Badge className="border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                                        {evaluator.type === 'kepala-biro'
                                            ? 'Kepala Biro'
                                            : evaluator.type === 'kepala-bagian'
                                              ? 'Kepala Bagian'
                                              : 'Teman Setingkat'}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Employee Card - Enhanced with Clear Label */}
                        <Card className="relative gap-1 overflow-hidden border-0 bg-gradient-to-br from-blue-500 to-indigo-600 pb-0 text-white shadow-2xl">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
                            <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

                            <CardHeader className="relative z-10">
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
                                {/* Photo with Enhanced Styling */}
                                <div className="relative mx-2 mb-6">
                                    <div className="absolute inset-0 scale-110 animate-pulse rounded-full bg-white/20"></div>
                                    <img
                                        src={`/storage/${employee.image}`}
                                        alt={employee.name}
                                        className="mx-auto h-20 w-20 rounded-full border-4 border-white shadow-lg"
                                    />
                                </div>

                                {/* Name and Position */}
                                <h3 className="mb-1 text-2xl font-bold text-white">{employee.name}</h3>
                                <p className="text-lg font-medium text-blue-100">{employee.jabatan}</p>

                                {/* Unit Badge */}
                                <div className="mt-4">
                                    <Badge className="border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-white">
                                        {employee.unit_kerja}
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {renderReview()}
                </div>
            </main>
        </div>
    );
}
