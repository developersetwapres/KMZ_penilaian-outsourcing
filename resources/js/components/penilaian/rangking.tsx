'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, TrendingUp, Trophy, Users } from 'lucide-react';
import { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const positions = [
    { value: 'pengemudi', label: 'Pengemudi' },
    { value: 'teknisi-kendaraan', label: 'Teknisi Kendaraan' },
    { value: 'staf-administrasi', label: 'Staf Administrasi' },
    { value: 'pramubakti-pramusaji', label: 'Pramubakti/Pramusaji' },
    { value: 'petugas-tata-tempat', label: 'Petugas Tata Tempat' },
    { value: 'teknisi-jaringan', label: 'Teknisi Jaringan' },
    { value: 'teknisi-komputer', label: 'Teknisi Komputer' },
    { value: 'juru-kamera-fotografer', label: 'Juru Kamera / Fotografer' },
    { value: 'desainer-grafis-multimedia', label: 'Desainer Grafis dan Multimedia' },
    { value: 'programmer', label: 'Programmer' },
    { value: 'koordinator-pengawas', label: 'Koordinator dan Pengawas' },
    { value: 'teknisi-mekanikal-elektrikal', label: 'Teknisi Mekanikal dan Elektrikal' },
    { value: 'resepsionis', label: 'Resepsionis' },
    { value: 'petugas-kebersihan', label: 'Petugas Kebersihan' },
    { value: 'petugas-taman', label: 'Petugas Taman' },
    { value: 'tenaga-administrasi', label: 'Tenaga Administrasi' },
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
                        <span className="mr-2 inline-block h-3 w-3 rounded bg-[#3b82f6]"></span>
                        Atasan: <span className="font-medium">{data.Atasan}</span>
                    </p>
                    <p className="text-sm">
                        <span className="mr-2 inline-block h-3 w-3 rounded bg-[#10b981]"></span>
                        Penerima Layanan: <span className="font-medium">{data['Penerima Layanan']}</span>
                    </p>
                    <p className="text-sm">
                        <span className="mr-2 inline-block h-3 w-3 rounded bg-[#f59e0b]"></span>
                        Teman Setingkat: <span className="font-medium">{data['Teman Setingkat']}</span>
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

export default function RankingPage({ outsourcingData }: any) {
    const [selectedPosition, setSelectedPosition] = useState('pengemudi');
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
                        Dashboard penilaian kinerja outsourcing outsourcing berdasarkan evaluasi multi-penilai.
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
                                <p className="text-xs text-muted-foreground">Dari {currentData.length} outsourcing</p>
                            </CardContent>
                        </Card>

                        <Card className="border-2 border-blue-200 bg-blue-50/30">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">Total Outsourcing</CardTitle>
                                <Users className="h-4 w-4 text-accent" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{currentData.length}</div>
                                <p className="text-xs text-muted-foreground">Outsourcing aktif</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Chart */}
                    <Card className="mb-6 gap-0 border-l-4 border-l-indigo-500">
                        <CardHeader>
                            <CardTitle className="text-xl">Ranking Score Outsourcing</CardTitle>
                            <CardDescription>
                                Visualisasi score berdasarkan penilaian dari 3 evaluator (Atasan, Penerima Layanan, Teman Setingkat) -
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
                                        <Bar dataKey="Atasan" stackId="score" fill="#3b82f6" name="Penilai Atasan" radius={[0, 0, 0, 0]} />
                                        <Bar
                                            dataKey="Penerima Layanan"
                                            stackId="score"
                                            fill="#10b981"
                                            name="Penilai Penerima Layanan"
                                            radius={[0, 0, 0, 0]}
                                        />
                                        <Bar
                                            dataKey="Teman Setingkat"
                                            stackId="score"
                                            fill="#f59e0b"
                                            name="Penilai Teman Setingkat"
                                            radius={[0, 4, 4, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-4 flex items-center justify-between">
                                    <p className="text-sm text-muted-foreground">
                                        Menampilkan {startIndex + 1}-{Math.min(endIndex, currentData.length)} dari {currentData.length} outsourcing
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
                    <Card className="gap-0 border-l-4 border-l-indigo-500">
                        <CardHeader>
                            <CardTitle>Detail Ranking</CardTitle>
                            <CardDescription>
                                Breakdown lengkap score per outsourcing dan penilai - {positions.find((p) => p.value === selectedPosition)?.label}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="px-4 py-3 text-left font-semibold">Rank</th>
                                            <th className="px-4 py-3 text-left font-semibold">Outsourcing</th>
                                            <th className="px-4 py-3 text-center font-semibold">Atasan</th>
                                            <th className="px-4 py-3 text-center font-semibold">Penerima Layanan</th>
                                            <th className="px-4 py-3 text-center font-semibold">Teman Setingkat</th>
                                            <th className="px-4 py-3 text-center font-semibold">Total Score</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginatedData.map((outsourcing, index) => (
                                            <tr key={outsourcing.name} className="border-b border-border hover:bg-muted/50">
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center">
                                                        {outsourcing.rank === 1 && <Trophy className="mr-2 h-4 w-4 text-primary" />}
                                                        <span className="font-medium">#{outsourcing.rank}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 font-medium">{outsourcing.name}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant="outline"
                                                        style={{ backgroundColor: 'hsl(var(--chart-1) / 0.1)', color: 'hsl(var(--chart-1))' }}
                                                    >
                                                        {outsourcing.A}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant="outline"
                                                        style={{ backgroundColor: 'hsl(var(--chart-2) / 0.1)', color: 'hsl(var(--chart-2))' }}
                                                    >
                                                        {outsourcing.B}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge
                                                        variant="outline"
                                                        style={{ backgroundColor: 'hsl(var(--chart-3) / 0.1)', color: 'hsl(var(--chart-3))' }}
                                                    >
                                                        {outsourcing.C}
                                                    </Badge>
                                                </td>
                                                <td className="px-4 py-3 text-center">
                                                    <Badge variant={outsourcing.rank === 1 ? 'default' : 'secondary'} className="font-bold">
                                                        {outsourcing.total}
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
                                        Menampilkan {startIndex + 1}-{Math.min(endIndex, currentData.length)} dari {currentData.length} outsourcing
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
