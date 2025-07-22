'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, Building, Building2, CheckCircle, FileText, Mail, MapPin, Phone, Target, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';

// Validation schema
const evaluationSchema = z.object({
    scores: z.record(z.string(), z.number().min(0).max(100)),
    overallNotes: z.string().optional(),
});

// Dummy evaluation data
const evaluationData = {
    'aspek-teknis': {
        title: 'Aspek Teknis',
        criteria: [
            {
                id: 'teknis-1',
                name: 'Penguasaan Teknologi',
                indicators: [
                    { id: 't1-1', text: 'Kemampuan menggunakan software/aplikasi kerja sesuai bidang tugas' },
                    { id: 't1-2', text: 'Pemahaman terhadap sistem dan prosedur teknis yang berlaku' },
                    { id: 't1-3', text: 'Kemampuan troubleshooting dan mengatasi masalah teknis dasar' },
                ],
            },
            {
                id: 'teknis-2',
                name: 'Kualitas Kerja',
                indicators: [
                    { id: 't2-1', text: 'Ketepatan dan keakuratan dalam menyelesaikan tugas' },
                    { id: 't2-2', text: 'Kesesuaian hasil kerja dengan standar yang ditetapkan' },
                    { id: 't2-3', text: 'Kemampuan menyelesaikan pekerjaan sesuai deadline' },
                ],
            },
        ],
    },
    'aspek-perilaku': {
        title: 'Aspek Perilaku',
        criteria: [
            {
                id: 'perilaku-1',
                name: 'Disiplin',
                indicators: [
                    { id: 'p1-1', text: 'Kehadiran dan ketepatan waktu dalam bekerja' },
                    { id: 'p1-2', text: 'Kepatuhan terhadap aturan dan tata tertib perusahaan' },
                    { id: 'p1-3', text: 'Konsistensi dalam menjalankan tugas dan tanggung jawab' },
                ],
            },
            {
                id: 'perilaku-2',
                name: 'Kerjasama dan Komunikasi',
                indicators: [
                    { id: 'p2-1', text: 'Kemampuan bekerja dalam tim dan berkolaborasi' },
                    { id: 'p2-2', text: 'Komunikasi yang efektif dengan rekan kerja dan atasan' },
                    { id: 'p2-3', text: 'Sikap saling membantu dan mendukung rekan kerja' },
                ],
            },
        ],
    },
    'aspek-keahlian': {
        title: 'Aspek Keahlian',
        criteria: [
            {
                id: 'keahlian-1',
                name: 'Inisiatif dan Kreativitas',
                indicators: [
                    { id: 'k1-1', text: 'Proaktif dalam mengidentifikasi dan mengatasi masalah' },
                    { id: 'k1-2', text: 'Memberikan saran dan ide untuk perbaikan proses kerja' },
                    { id: 'k1-3', text: 'Inisiatif dalam mengembangkan kemampuan diri' },
                ],
            },
            {
                id: 'keahlian-2',
                name: 'Adaptabilitas',
                indicators: [
                    { id: 'k2-1', text: 'Kemampuan menyesuaikan diri dengan perubahan kebijakan' },
                    { id: 'k2-2', text: 'Fleksibilitas dalam menjalankan tugas yang bervariasi' },
                    { id: 'k2-3', text: 'Kemampuan belajar hal-hal baru dengan cepat' },
                ],
            },
        ],
    },
};

// Classification function
const getScoreClassification = (score: number) => {
    if (score <= 50) return { label: 'SK (Sangat Kurang)', color: 'bg-red-100 text-red-800 border-red-200', range: '≤50' };
    if (score <= 75) return { label: 'K (Kurang)', color: 'bg-orange-100 text-orange-800 border-orange-200', range: '51-75' };
    if (score <= 90) return { label: 'B (Baik)', color: 'bg-blue-100 text-blue-800 border-blue-200', range: '76-90' };
    return { label: 'SB (Sangat Baik)', color: 'bg-green-100 text-green-800 border-green-200', range: '91-100' };
};

const scoreRanges = [
    { label: 'SK (Sangat Kurang)', range: '≤50', color: 'bg-red-100 text-red-800' },
    { label: 'K (Kurang)', range: '51-75', color: 'bg-orange-100 text-orange-800' },
    { label: 'B (Baik)', range: '76-90', color: 'bg-blue-100 text-blue-800' },
    { label: 'SB (Sangat Baik)', range: '91-100', color: 'bg-green-100 text-green-800' },
];

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
    };
    evaluator: any;
    onBack: () => void;
}

export default function EvaluationForm({ employee, evaluator, onBack }: EvaluationFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [scores, setScores] = useState<Record<string, number>>({});
    const [overallNotes, setOverallNotes] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const { toast } = useToast();

    const aspects = Object.keys(evaluationData);
    const currentAspect = aspects[currentStep];
    const aspectData = evaluationData[currentAspect as keyof typeof evaluationData];
    const progress = ((currentStep + 1) / aspects.length) * 100;

    // Scroll to top when step changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentStep]);

    const handleScoreChange = (indicatorId: string, value: string) => {
        const numValue = value === '' ? 0 : Math.min(100, Math.max(0, Number.parseInt(value) || 0));
        setScores((prev) => ({ ...prev, [indicatorId]: numValue }));
    };

    const canProceed = () => {
        const currentIndicators = aspectData.criteria.flatMap((c) => c.indicators.map((i) => i.id));
        return currentIndicators.every((id) => scores[id] !== undefined && scores[id] > 0);
    };

    const handleNext = () => {
        if (currentStep < aspects.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            setShowReview(true);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 0) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);

        router.post(
            route('evaluator.store'),
            {
                evaluator: {
                    id: evaluator.id,
                    name: evaluator.name,
                },
                outsourcing: {
                    id: employee.id,
                    name: employee.name,
                },
                scores: scores,
                catatan: overallNotes,
            },
            {
                onSuccess: () => {
                    toast({
                        title: 'Penilaian Berhasil Disimpan!',
                        description: 'Terima kasih atas penilaian yang telah diberikan.',
                    });
                    setIsSubmitting(false);
                    onBack();
                },
                onError: () => {
                    setIsSubmitting(false);
                },
            },
        );
    };

    const calculateAspectScore = (aspectKey: string) => {
        const aspect = evaluationData[aspectKey as keyof typeof evaluationData];
        if (!aspect) return 0;

        const totalIndicators = aspect.criteria.reduce((count, criterion) => count + criterion.indicators.length, 0);
        let totalScore = 0;

        aspect.criteria.forEach((criterion) => {
            criterion.indicators.forEach((indicator) => {
                const score = scores[indicator.id];
                if (score) {
                    totalScore += score;
                }
            });
        });

        return totalIndicators > 0 ? totalScore / totalIndicators : 0;
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
                                    {Object.values(evaluationData).reduce(
                                        (total, aspect) => total + aspect.criteria.reduce((sum, criterion) => sum + criterion.indicators.length, 0),
                                        0,
                                    )}
                                </div>
                                <div className="text-blue-100">Total Indikator</div>
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
                                            <CardDescription className="text-blue-600">
                                                {aspect.criteria.length} Kriteria • {aspect.criteria.reduce((sum, c) => sum + c.indicators.length, 0)}{' '}
                                                Indikator
                                            </CardDescription>
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
                                    {aspect.criteria.map((criterion, criterionIndex) => (
                                        <div key={criterion.id} className="rounded-lg border-l-4 border-l-gray-300 bg-gray-50 p-5">
                                            <div className="mb-4 flex items-center space-x-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-600 text-sm font-bold text-white">
                                                    {aspectIndex + 1}.{criterionIndex + 1}
                                                </div>
                                                <h4 className="text-xl font-semibold text-gray-800">{criterion.name}</h4>
                                            </div>

                                            <div className="grid gap-3">
                                                {criterion.indicators.map((indicator, indicatorIndex) => {
                                                    const score = scores[indicator.id] || 0;
                                                    const classification = getScoreClassification(score);

                                                    return (
                                                        <div key={indicator.id} className="rounded-lg border border-gray-200 bg-white p-4">
                                                            <div className="flex items-start justify-between">
                                                                <div className="flex flex-1 items-start space-x-3">
                                                                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-600">
                                                                        {indicatorIndex + 1}
                                                                    </div>
                                                                    <div className="flex-1">
                                                                        <p className="font-medium text-gray-800">{indicator.text}</p>
                                                                        <div className="mt-2 text-lg font-bold text-gray-900">Nilai: {score}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="my-auto ml-4">
                                                                    <Badge
                                                                        className={`${classification.color} border px-3 py-1 text-sm font-semibold`}
                                                                    >
                                                                        {classification.label}
                                                                    </Badge>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ))}
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

                {/* Submit Button */}
                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-6 text-center">
                        <div className="space-y-4">
                            <div>
                                <h3 className="mb-2 text-xl font-semibold">Konfirmasi Penilaian</h3>
                                <p className="text-green-100">
                                    Pastikan semua penilaian sudah benar sebelum melakukan submit final. Setelah submit, penilaian tidak dapat diubah
                                    lagi.
                                </p>
                            </div>
                            <Button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                size="lg"
                                className="bg-white px-8 py-3 font-semibold text-green-600 hover:bg-green-50"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-green-600"></div>
                                        Menyimpan Penilaian...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="mr-2 h-5 w-5" />
                                        Submit Penilaian Final
                                    </>
                                )}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    };

    if (showReview) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <Button variant="ghost" onClick={() => setShowReview(false)} className="flex items-center space-x-2">
                                <ArrowLeft className="h-4 w-4" />
                                <span>Kembali</span>
                            </Button>
                        </div>
                    </div>
                </header>
                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="space-y-8">{renderReview()}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between py-4">
                        <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Kembali</span>
                        </Button>

                        <div className="flex items-center space-x-4">
                            <Badge variant="outline" className="px-3 py-1">
                                Step {currentStep + 1} dari {aspects.length}
                            </Badge>
                            <div className="text-sm text-gray-600">Progress: {Math.round(progress)}%</div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="space-y-8">
                    {/* Evaluator and Employee Info */}
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Evaluator Info */}
                        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg text-white">
                                    <User className="h-5 w-5" />
                                    <span>Penilai</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <strong>Nama:</strong> {evaluator.name}
                                </div>
                                <div>
                                    <strong>NIP:</strong> {evaluator.nip}
                                </div>
                                <div>
                                    <strong>Pangkat/Gol:</strong> {evaluator.rank}
                                </div>
                                <div>
                                    <strong>Jabatan:</strong> {evaluator.position}
                                </div>
                                <div>
                                    <strong>Unit Kerja:</strong> {evaluator.unit}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Employee Info */}
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardHeader>
                                <CardTitle className="flex items-center space-x-2 text-lg text-white">
                                    <User className="h-5 w-5" />
                                    <span>Yang Dinilai</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm">
                                <div>
                                    <strong>Nama:</strong> {employee.name}
                                </div>
                                <div>
                                    <strong>Jabatan:</strong> {employee.jabatan}
                                </div>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-3 w-3" />
                                    <span>{employee.lokasi_kerja}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Building2 className="h-3 w-3" />
                                    <span className="text-xs">{employee.unit_kerja}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Building className="h-3 w-3" />
                                    <span className="text-xs">{employee.perusahaan}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Phone className="h-3 w-3" />
                                    <span>{employee.phone}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Mail className="h-3 w-3" />
                                    <span className="text-xs">{employee.email}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Progress */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Progress Penilaian</span>
                                    <span>{Math.round(progress)}%</span>
                                </div>
                                <Progress value={progress} className="h-3" />
                                <div className="flex justify-between text-xs text-gray-500">
                                    {aspects.map((aspect, index) => (
                                        <span key={aspect} className={index <= currentStep ? 'font-medium text-blue-600' : ''}>
                                            {evaluationData[aspect as keyof typeof evaluationData].title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Score Classification Reference */}
                    <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50">
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-lg text-purple-800">
                                <Target className="h-5 w-5" />
                                <span>Panduan Klasifikasi Penilaian</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                                {scoreRanges.map((range, index) => (
                                    <div key={index} className={`rounded-lg border-2 p-3 ${range.color} border-opacity-50`}>
                                        <div className="text-center">
                                            <div className="text-sm font-bold">{range.label}</div>
                                            <div className="mt-1 text-xs opacity-75">{range.range}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Evaluation Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2 text-2xl text-blue-600">
                                <div className="rounded-full bg-blue-100 p-2">
                                    <span className="text-lg font-bold text-blue-600">{currentStep + 1}</span>
                                </div>
                                <span>{aspectData.title}</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {aspectData.criteria.map((criterion) => (
                                <div key={criterion.id} className="space-y-6">
                                    <h3 className="border-b-2 border-blue-200 pb-3 text-xl font-semibold text-gray-900">{criterion.name}</h3>

                                    {criterion.indicators.map((indicator, index) => {
                                        const currentScore = scores[indicator.id] || 0;
                                        const classification = getScoreClassification(currentScore);

                                        return (
                                            <div key={indicator.id} className="space-y-4 rounded-xl border-l-4 border-l-blue-400 bg-gray-50 p-6">
                                                <div className="flex items-start space-x-3">
                                                    <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-sm font-bold text-white">
                                                        {index + 1}
                                                    </div>
                                                    <h4 className="flex-1 font-medium text-gray-800">{indicator.text}</h4>
                                                </div>

                                                <div className="ml-9 space-y-4">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="flex-1">
                                                            <Label htmlFor={indicator.id} className="mb-2 block text-sm font-medium text-gray-700">
                                                                Masukkan Nilai (0-100):
                                                            </Label>
                                                            <Input
                                                                id={indicator.id}
                                                                type="number"
                                                                min="0"
                                                                max="100"
                                                                value={currentScore || ''}
                                                                onChange={(e) => handleScoreChange(indicator.id, e.target.value)}
                                                                className="w-32 text-center text-lg font-bold"
                                                                placeholder="0"
                                                            />
                                                        </div>
                                                        {currentScore > 0 && (
                                                            <div className="flex-1">
                                                                <div className="mb-2 text-sm text-gray-600">Klasifikasi:</div>
                                                                <Badge
                                                                    className={`${classification.color} animate-pulse border-2 px-4 py-2 text-sm font-semibold`}
                                                                >
                                                                    {classification.label}
                                                                </Badge>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Real-time feedback */}
                                                    {currentScore > 0 && (
                                                        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-4">
                                                            <div className="flex items-center space-x-3">
                                                                <div className="text-2xl font-bold text-gray-800">{currentScore}</div>
                                                                <div className="flex-1">
                                                                    <div className="text-sm text-gray-600">Nilai yang dimasukkan</div>
                                                                    <div
                                                                        className={`text-sm font-medium ${classification.color.replace('bg-', 'text-').replace('-100', '-800')}`}
                                                                    >
                                                                        Termasuk kategori: {classification.label}
                                                                    </div>
                                                                </div>
                                                                <div className="text-right">
                                                                    <div className="text-xs text-gray-500">Range: {classification.range}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}

                            {/* Overall Notes - Show only on last step */}
                            {currentStep === aspects.length - 1 && (
                                <Card className="border-yellow-200 bg-yellow-50">
                                    <CardHeader>
                                        <CardTitle className="text-lg text-yellow-800">Catatan Keseluruhan</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            placeholder="Berikan catatan keseluruhan untuk penilaian ini (opsional)..."
                                            value={overallNotes}
                                            onChange={(e) => setOverallNotes(e.target.value)}
                                            className="min-h-[120px] bg-white"
                                        />
                                    </CardContent>
                                </Card>
                            )}
                        </CardContent>
                    </Card>

                    {/* Navigation */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between">
                                <Button
                                    variant="outline"
                                    onClick={handlePrevious}
                                    disabled={currentStep === 0}
                                    className="flex items-center space-x-2 bg-transparent"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    <span>Sebelumnya</span>
                                </Button>

                                {currentStep < aspects.length - 1 ? (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                                    >
                                        <span>Selanjutnya</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!canProceed()}
                                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                                    >
                                        <span>Lihat Review</span>
                                        <ArrowRight className="h-4 w-4" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
