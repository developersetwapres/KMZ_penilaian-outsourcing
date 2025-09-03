'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, TrendingUp, Trophy, Users } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const outsourcingData = {
    'os-it': [
        { name: 'PT Teknologi Maju', A: 35, B: 45, C: 20, total: 100, rank: 1 },
        { name: 'CV Digital Solutions', A: 30, B: 40, C: 25, total: 95, rank: 2 },
        { name: 'PT Inovasi Kreatif', A: 25, B: 35, C: 30, total: 90, rank: 3 },
        { name: 'CV Smart Systems', A: 28, B: 32, C: 25, total: 85, rank: 4 },
        { name: 'PT Global Tech', A: 20, B: 35, C: 25, total: 80, rank: 5 },
        { name: 'CV Solusi Prima', A: 22, B: 30, C: 23, total: 75, rank: 6 },
        { name: 'CV Cyber Solutions', A: 18, B: 28, C: 24, total: 70, rank: 7 },
        { name: 'CV Tech Innovate', A: 20, B: 25, C: 22, total: 67, rank: 8 },
        { name: 'PT Digital Hub', A: 15, B: 27, C: 23, total: 65, rank: 9 },
        { name: 'CV Code Masters', A: 17, B: 23, C: 22, total: 62, rank: 10 },
        { name: 'PT Software Plus', A: 16, B: 22, C: 21, total: 59, rank: 11 },
        { name: 'CV Web Experts', A: 14, B: 21, C: 20, total: 55, rank: 12 },
        { name: 'PT App Builders', A: 13, B: 20, C: 19, total: 52, rank: 13 },
        { name: 'CV Mobile Tech', A: 12, B: 18, C: 18, total: 48, rank: 14 },
        { name: 'PT Data Systems', A: 11, B: 17, C: 17, total: 45, rank: 15 },
        { name: 'CV Cloud Services', A: 10, B: 16, C: 16, total: 42, rank: 16 },
        { name: 'PT Network Pro', A: 9, B: 15, C: 15, total: 39, rank: 17 },
        { name: 'CV Security Tech', A: 8, B: 14, C: 14, total: 36, rank: 18 },
        { name: 'CV AI Solutions', A: 7, B: 13, C: 13, total: 33, rank: 19 },
        { name: 'CV Blockchain Co', A: 6, B: 12, C: 12, total: 30, rank: 20 },
    ],
    'os-protokol': [
        { name: 'PT Protokol Utama', A: 40, B: 35, C: 25, total: 100, rank: 1 },
        { name: 'CV Event Organizer', A: 35, B: 32, C: 28, total: 95, rank: 2 },
        { name: 'PT Acara Resmi', A: 30, B: 30, C: 30, total: 90, rank: 3 },
        { name: 'CV Tata Upacara', A: 28, B: 28, C: 29, total: 85, rank: 4 },
        { name: 'PT Seremonial Pro', A: 25, B: 27, C: 28, total: 80, rank: 5 },
        { name: 'CV Protokol Prima', A: 22, B: 26, C: 27, total: 75, rank: 6 },
        { name: 'PT Event Master', A: 20, B: 25, C: 25, total: 70, rank: 7 },
        { name: 'CV Upacara Negara', A: 18, B: 24, C: 24, total: 66, rank: 8 },
        { name: 'CV Ceremonial Plus', A: 17, B: 23, C: 23, total: 63, rank: 9 },
        { name: 'CV Tata Tertib', A: 16, B: 22, C: 22, total: 60, rank: 10 },
        { name: 'CV Protokol Resmi', A: 15, B: 21, C: 21, total: 57, rank: 11 },
        { name: 'CV Event Formal', A: 14, B: 20, C: 20, total: 54, rank: 12 },
        { name: 'CV Acara Kenegaraan', A: 13, B: 19, C: 19, total: 51, rank: 13 },
        { name: 'CV Seremonial Co', A: 12, B: 18, C: 18, total: 48, rank: 14 },
        { name: 'PT Protokol Daerah', A: 11, B: 17, C: 17, total: 45, rank: 15 },
        { name: 'CV Upacara Dinas', A: 10, B: 16, C: 16, total: 42, rank: 16 },
        { name: 'PT Event Pemerintah', A: 9, B: 15, C: 15, total: 39, rank: 17 },
        { name: 'CV Tata Cara Resmi', A: 8, B: 14, C: 14, total: 36, rank: 18 },
        { name: 'CV Protokol Khusus', A: 7, B: 13, C: 13, total: 33, rank: 19 },
        { name: 'CV Ceremonial Elite', A: 6, B: 12, C: 12, total: 30, rank: 20 },
    ],
    'os-keamanan': [
        { name: 'PT Keamanan Terpadu', A: 38, B: 37, C: 25, total: 100, rank: 1 },
        { name: 'CV Security Pro', A: 33, B: 35, C: 27, total: 95, rank: 2 },
        { name: 'PT Pengamanan Plus', A: 30, B: 32, C: 28, total: 90, rank: 3 },
        { name: 'CV Satpam Elite', A: 27, B: 30, C: 28, total: 85, rank: 4 },
        { name: 'PT Jaga Aman', A: 25, B: 28, C: 27, total: 80, rank: 5 },
        { name: 'CV Security Guard', A: 23, B: 26, C: 26, total: 75, rank: 6 },
        { name: 'PT Pengawalan VIP', A: 21, B: 24, C: 25, total: 70, rank: 7 },
        { name: 'CV Keamanan 24', A: 19, B: 23, C: 24, total: 66, rank: 8 },
        { name: 'CV Security System', A: 18, B: 22, C: 23, total: 63, rank: 9 },
        { name: 'CV Patrol Aman', A: 17, B: 21, C: 22, total: 60, rank: 10 },
        { name: 'CV Jaga Ketat', A: 16, B: 20, C: 21, total: 57, rank: 11 },
        { name: 'CV Security First', A: 15, B: 19, C: 20, total: 54, rank: 12 },
        { name: 'CV Pengamanan Khusus', A: 14, B: 18, C: 19, total: 51, rank: 13 },
        { name: 'CV Satpam Profesional', A: 13, B: 17, C: 18, total: 48, rank: 14 },
        { name: 'PT Keamanan Mandiri', A: 12, B: 16, C: 17, total: 45, rank: 15 },
        { name: 'CV Security Master', A: 11, B: 15, C: 16, total: 42, rank: 16 },
        { name: 'PT Jaga Prima', A: 10, B: 14, C: 15, total: 39, rank: 17 },
        { name: 'CV Pengamanan Total', A: 9, B: 13, C: 14, total: 36, rank: 18 },
        { name: 'PT Security Plus', A: 8, B: 12, C: 13, total: 33, rank: 19 },
        { name: 'CV Keamanan Utama', A: 7, B: 11, C: 12, total: 30, rank: 20 },
    ],
    'os-kebersihan': [
        { name: 'PT Kebersihan Terpadu', A: 36, B: 39, C: 25, total: 100, rank: 1 },
        { name: 'CV Cleaning Service', A: 32, B: 36, C: 27, total: 95, rank: 2 },
        { name: 'PT Sanitasi Prima', A: 29, B: 33, C: 28, total: 90, rank: 3 },
        { name: 'CV Bersih Sejahtera', A: 26, B: 31, C: 28, total: 85, rank: 4 },
        { name: 'PT Hygiene Pro', A: 24, B: 29, C: 27, total: 80, rank: 5 },
        { name: 'CV Clean Master', A: 22, B: 27, C: 26, total: 75, rank: 6 },
        { name: 'PT Sanitasi Plus', A: 20, B: 25, C: 25, total: 70, rank: 7 },
        { name: 'CV Kebersihan 24', A: 18, B: 24, C: 24, total: 66, rank: 8 },
        { name: 'PT Clean Service', A: 17, B: 23, C: 23, total: 63, rank: 9 },
        { name: 'CV Bersih Total', A: 16, B: 22, C: 22, total: 60, rank: 10 },
        { name: 'PT Hygiene Care', A: 15, B: 21, C: 21, total: 57, rank: 11 },
        { name: 'CV Sanitasi Mandiri', A: 14, B: 20, C: 20, total: 54, rank: 12 },
        { name: 'PT Clean Pro', A: 13, B: 19, C: 19, total: 51, rank: 13 },
        { name: 'PT Kebersihan Prima', A: 12, B: 18, C: 18, total: 48, rank: 14 },
        { name: 'PT Sanitasi Utama', A: 11, B: 17, C: 17, total: 45, rank: 15 },
        { name: 'CV Clean Elite', A: 10, B: 16, C: 16, total: 42, rank: 16 },
        { name: 'PT Hygiene Plus', A: 9, B: 15, C: 15, total: 39, rank: 17 },
        { name: 'CV Bersih Profesional', A: 8, B: 14, C: 14, total: 36, rank: 18 },
        { name: 'PT Clean System', A: 7, B: 13, C: 13, total: 33, rank: 19 },
        { name: 'CV Sanitasi Elite', A: 6, B: 12, C: 12, total: 30, rank: 20 },
    ],
};

const positions = [
    { value: 'os-it', label: 'Outsourcing IT' },
    { value: 'os-protokol', label: 'Outsourcing Protokol' },
    { value: 'os-keamanan', label: 'Outsourcing Keamanan' },
    { value: 'os-kebersihan', label: 'Outsourcing Kebersihan' },
];

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="rounded-lg border border-border bg-card p-4 shadow-lg">
                <p className="mb-2 font-semibold text-card-foreground">{label}</p>
                <div className="space-y-1">
                    <p className="text-sm">
                        <span className="mr-2 inline-block h-3 w-3 rounded bg-chart-1"></span>
                        Penilai A: <span className="font-medium">{data.A}</span>
                    </p>
                    <p className="text-sm">
                        <span className="mr-2 inline-block h-3 w-3 rounded bg-chart-2"></span>
                        Penilai B: <span className="font-medium">{data.B}</span>
                    </p>
                    <p className="text-sm">
                        <span className="mr-2 inline-block h-3 w-3 rounded bg-chart-3"></span>
                        Penilai C: <span className="font-medium">{data.C}</span>
                    </p>
                    <div className="mt-2 border-t pt-2">
                        <p className="font-semibold">Total Score: {data.total}</p>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default function OutsourcingRankingPage() {
    const [selectedPosition, setSelectedPosition] = useState('os-it');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;

    const currentData = outsourcingData[selectedPosition as keyof typeof outsourcingData] || [];

    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = currentData.slice(startIndex, endIndex);

    const handlePositionChange = (value: string) => {
        setSelectedPosition(value);
        setCurrentPage(1);
    };

    const topPerformer = currentData[0] || { name: 'N/A', total: 0 };
    const averageScore = currentData.length > 0 ? Math.round(currentData.reduce((sum, item) => sum + item.total, 0) / currentData.length) : 0;

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <CardHeader>
                    <CardTitle className="text-2xl">Ranking Evaluasi Outsourcing</CardTitle>
                    <CardDescription className="text-indigo-100">
                        Dashboard penilaian kinerja vendor outsourcing berdasarkan evaluasi multi-penilai.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    {/* Header Section */}
                    <div className="flex flex-col space-y-4">
                        {/* Filters */}
                        <div className="flex flex-wrap gap-4">
                            <div className="flex items-center space-x-2">
                                <Trophy className="h-4 w-4 text-muted-foreground" />
                                <Select value={selectedPosition} onValueChange={handlePositionChange}>
                                    <SelectTrigger className="w-56">
                                        <SelectValue placeholder="Pilih Jabatan Outsourcing" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {positions.map((position) => (
                                            <SelectItem key={position.value} value={position.value}>
                                                {position.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </CardHeader>

                <CardContent>
                    {/* Summary Cards */}
                    <div className="mb-4 grid grid-cols-1 gap-6 md:grid-cols-3">
                        <Card className="border-2 border-blue-200 bg-blue-50/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Top Performer</CardTitle>
                                <Trophy className="h-4 w-4 text-primary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-primary">{topPerformer.name}</div>
                                <p className="text-xs text-muted-foreground">Score: {topPerformer.total}/100</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200 bg-blue-50/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Rata-rata Score</CardTitle>
                                <TrendingUp className="h-4 w-4 text-secondary" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{averageScore}</div>
                                <p className="text-xs text-muted-foreground">Dari {currentData.length} vendor</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200 bg-blue-50/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Vendor</CardTitle>
                                <Users className="h-4 w-4 text-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentData.length}</div>
                                <p className="text-xs text-muted-foreground">Vendor aktif</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Chart */}
                    <Card className="mb-6 gap-0 border-l-4 border-l-indigo-500 pb-0">
                        <CardHeader>
                            <CardTitle className="text-xl">Ranking Score Outsourcing</CardTitle>
                            <CardDescription>
                                Visualisasi score berdasarkan penilaian dari 3 evaluator (A, B, C) -
                                {positions.find((p) => p.value === selectedPosition)?.label}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[600px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        layout="vertical"
                                        data={paginatedData}
                                        margin={{
                                            top: 20,
                                            right: 100,
                                            left: 150,
                                            bottom: 20,
                                        }}
                                        barCategoryGap="10%"
                                    >
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                                        <XAxis
                                            type="number"
                                            domain={[0, 100]}
                                            tick={{ fontSize: 12, fill: '#64748b' }}
                                            axisLine={{ stroke: '#cbd5e1' }}
                                            tickLine={{ stroke: '#cbd5e1' }}
                                        />
                                        <YAxis
                                            dataKey="name"
                                            type="category"
                                            width={150}
                                            tick={{ fontSize: 11, fill: '#64748b' }}
                                            axisLine={{ stroke: '#cbd5e1' }}
                                            tickLine={{ stroke: '#cbd5e1' }}
                                            interval={0}
                                        />
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="rect" />
                                        <Bar dataKey="A" stackId="score" fill="#3b82f6" name="Penilai A" radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="B" stackId="score" fill="#10b981" name="Penilai B" radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="C" stackId="score" fill="#f59e0b" name="Penilai C" radius={[0, 4, 4, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Menampilkan {startIndex + 1}-{Math.min(endIndex, currentData.length)} dari {currentData.length} vendor
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>
                                        <span className="text-sm">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Detailed Rankings Table */}
                    <Card className="gap-0 border-l-4 border-l-indigo-500 pb-0">
                        <CardHeader>
                            <CardTitle>Detail Ranking</CardTitle>
                            <CardDescription>
                                Breakdown lengkap score per vendor dan penilai -{positions.find((p) => p.value === selectedPosition)?.label}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="px-4 py-3 text-left font-semibold">Rank</th>
                                            <th className="px-4 py-3 text-left font-semibold">Vendor</th>
                                            <th className="px-4 py-3 text-center font-semibold">Penilai A</th>
                                            <th className="px-4 py-3 text-center font-semibold">Penilai B</th>
                                            <th className="px-4 py-3 text-center font-semibold">Penilai C</th>
                                            <th className="px-4 py-3 text-center font-semibold">Total Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((vendor, index) => (
                                            <tr key={vendor.name} className="border-b border-border hover:bg-muted/50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        {vendor.rank === 1 && <Trophy className="mr-2 h-4 w-4 text-primary" />}
                                                        <span className="font-medium">#{vendor.rank}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 font-medium">{vendor.name}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant="outline"
                                                        style={{ backgroundColor: 'hsl(var(--chart-1) / 0.1)', color: 'hsl(var(--chart-1))' }}
                                                    >
                                                        {vendor.A}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant="outline"
                                                        style={{ backgroundColor: 'hsl(var(--chart-2) / 0.1)', color: 'hsl(var(--chart-2))' }}
                                                    >
                                                        {vendor.B}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant="outline"
                                                        style={{ backgroundColor: 'hsl(var(--chart-3) / 0.1)', color: 'hsl(var(--chart-3))' }}
                                                    >
                                                        {vendor.C}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge variant={vendor.rank === 1 ? 'default' : 'secondary'} className="font-bold">
                                                        {vendor.total}
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-4 flex items-center justify-between border-t pt-4">
                                    <p className="text-sm text-muted-foreground">
                                        Menampilkan {startIndex + 1}-{Math.min(endIndex, currentData.length)} dari {currentData.length} vendor
                                    </p>
                                    <div className="flex items-center space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                            disabled={currentPage === 1}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                            Previous
                                        </Button>
                                        <span className="text-sm">
                                            Page {currentPage} of {totalPages}
                                        </span>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                            disabled={currentPage === totalPages}
                                        >
                                            Next
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
        </div>
    );
}
