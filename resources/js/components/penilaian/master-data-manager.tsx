'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CheckSquare, Edit, FileText, Plus, Shield, Target, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Dummy master data
const masterData = {
    aspects: [
        {
            id: 1,
            name: 'Aspek Teknis',
            description: 'Penilaian terhadap kemampuan teknis dan profesional dalam menjalankan tugas.',
            criteriaCount: 3,
            isFixed: true,
        },
        {
            id: 2,
            name: 'Aspek Perilaku',
            description: 'Penilaian terhadap sikap, disiplin, dan perilaku kerja sehari-hari.',
            criteriaCount: 4,
            isFixed: true,
        },
        {
            id: 3,
            name: 'Aspek Keahlian',
            description: 'Penilaian terhadap keahlian khusus, inisiatif, dan kemampuan adaptasi.',
            criteriaCount: 2,
            isFixed: true,
        },
    ],
    criteria: [
        {
            id: 1,
            aspectId: 1,
            name: 'Responsif',
            description: 'Cepat tanggap terhadap kebutuhan pelanggan.',
            indicatorCount: 3,
        },
        {
            id: 2,
            aspectId: 1,
            name: 'Ramah',
            description: 'Menyambut pelanggan dengan senyum dan sopan.',
            indicatorCount: 2,
        },
        {
            id: 3,
            aspectId: 1,
            name: 'Solutif',
            description: 'Memberikan solusi yang tepat dan efektif.',
            indicatorCount: 2,
        },
        {
            id: 4,
            aspectId: 2,
            name: 'Kecepatan',
            description: 'Menyelesaikan tugas dengan cepat.',
            indicatorCount: 3,
        },
        {
            id: 5,
            aspectId: 2,
            name: 'Ketepatan',
            description: 'Tidak melakukan kesalahan dalam bekerja.',
            indicatorCount: 2,
        },
        {
            id: 6,
            aspectId: 2,
            name: 'Organisasi',
            description: 'Mampu mengatur pekerjaan dengan baik.',
            indicatorCount: 2,
        },
        {
            id: 7,
            aspectId: 3,
            name: 'Proaktif',
            description: 'Mengambil inisiatif tanpa disuruh.',
            indicatorCount: 3,
        },
        {
            id: 8,
            aspectId: 3,
            name: 'Kreatif',
            description: 'Memberikan ide-ide baru yang inovatif.',
            indicatorCount: 2,
        },
        {
            id: 9,
            aspectId: 4,
            name: 'Komunikasi',
            description: 'Berkomunikasi dengan jelas dan efektif.',
            indicatorCount: 2,
        },
        {
            id: 10,
            aspectId: 4,
            name: 'Kolaborasi',
            description: 'Bekerja sama dengan baik dalam tim.',
            indicatorCount: 3,
        },
        {
            id: 11,
            aspectId: 4,
            name: 'Dukungan',
            description: 'Memberikan dukungan kepada anggota tim lainnya.',
            indicatorCount: 2,
        },
    ],
    indicators: [
        { id: 1, criteriaId: 1, text: 'Memberikan respon cepat terhadap pertanyaan pelanggan.' },
        { id: 2, criteriaId: 1, text: 'Menanggapi keluhan pelanggan dengan segera.' },
        { id: 3, criteriaId: 1, text: 'Menyediakan informasi yang akurat dan relevan.' },
        { id: 4, criteriaId: 2, text: 'Menyapa pelanggan dengan senyum dan ramah.' },
        { id: 5, criteriaId: 2, text: 'Menggunakan bahasa yang sopan dan santun.' },
        { id: 6, criteriaId: 3, text: 'Menawarkan solusi yang sesuai dengan masalah pelanggan.' },
        { id: 7, criteriaId: 3, text: 'Menindaklanjuti masalah pelanggan hingga selesai.' },
        { id: 8, criteriaId: 4, text: 'Menyelesaikan tugas sesuai dengan target waktu.' },
        { id: 9, criteriaId: 4, text: 'Tidak menunda-nunda pekerjaan.' },
        { id: 10, criteriaId: 4, text: 'Bekerja dengan cepat dan efisien.' },
        { id: 11, criteriaId: 5, text: 'Tidak melakukan kesalahan dalam perhitungan.' },
        { id: 12, criteriaId: 5, text: 'Memastikan data yang dimasukkan akurat.' },
        { id: 13, criteriaId: 6, text: 'Menyusun jadwal kerja yang teratur.' },
        { id: 14, criteriaId: 6, text: 'Mengelola waktu dengan efektif.' },
        { id: 15, criteriaId: 7, text: 'Mencari cara untuk meningkatkan kinerja.' },
        { id: 16, criteriaId: 7, text: 'Mengajukan ide-ide baru untuk perbaikan.' },
        { id: 17, criteriaId: 8, text: 'Menghasilkan solusi yang inovatif.' },
        { id: 18, criteriaId: 8, text: 'Menciptakan ide-ide yang orisinal.' },
        { id: 19, criteriaId: 9, text: 'Berbicara dengan jelas dan mudah dimengerti.' },
        { id: 20, criteriaId: 9, text: 'Mendengarkan dengan seksama pendapat orang lain.' },
        { id: 21, criteriaId: 10, text: 'Berkontribusi dalam diskusi tim.' },
        { id: 22, criteriaId: 10, text: 'Membantu anggota tim lainnya.' },
        { id: 23, criteriaId: 11, text: 'Memberikan semangat kepada rekan kerja.' },
        { id: 24, criteriaId: 11, text: 'Menawarkan bantuan kepada yang membutuhkan.' },
    ],
};

export default function MasterDataManager() {
    const [selectedLevel, setSelectedLevel] = useState<'aspects' | 'criteria' | 'indicators'>('aspects');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsDialogOpen(true);
    };

    const handleEdit = (item: any) => {
        setEditingItem(item);
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            // Handle delete logic
            console.log('Delete item:', id);
        }
    };

    const renderAspects = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Aspek Penilaian (Absolut)</h3>
                <div className="rounded-full bg-blue-50 px-3 py-1">
                    <span className="text-sm font-medium text-blue-700">3 Aspek Tetap</span>
                </div>
            </div>

            {/* <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="mb-2 flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Aspek Penilaian Bersifat Absolut</span>
                </div>
                <p className="text-sm text-blue-700">
                    Sistem menggunakan 3 aspek penilaian yang telah ditetapkan dan tidak dapat diubah atau ditambah.
                </p>
            </div> */}

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                {masterData.aspects.map((aspect, index) => (
                    <Card key={aspect.id} className="border-2 border-blue-200 bg-blue-50/30">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <CardTitle className="text-base text-blue-800">{aspect.name}</CardTitle>
                                </div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    {aspect.criteriaCount} kriteria
                                </Badge>
                            </div>
                            <CardDescription className="text-blue-700">{aspect.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex items-center space-x-2 text-sm text-blue-600">
                                <Shield className="h-4 w-4" />
                                <span className="font-medium">Aspek Tetap</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderCriteria = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Kriteria Penilaian</h3>
                <Button onClick={handleAdd} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Tambah Kriteria</span>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                {masterData.criteria.map((criteria) => {
                    const aspect = masterData.aspects.find((a) => a.id === criteria.aspectId);
                    return (
                        <Card key={criteria.id}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Target className="h-5 w-5 text-green-600" />
                                        <CardTitle className="text-base">{criteria.name}</CardTitle>
                                    </div>
                                    <Badge variant="secondary">{criteria.indicatorCount} indikator</Badge>
                                </div>
                                <CardDescription>
                                    <Badge variant="outline" className="mb-2">
                                        {aspect?.name}
                                    </Badge>
                                    <br />
                                    {criteria.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="flex space-x-2">
                                    <Button size="sm" variant="outline" onClick={() => handleEdit(criteria)}>
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                    <Button size="sm" variant="outline" onClick={() => handleDelete(criteria.id)}>
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );

    const renderIndicators = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Indikator Penilaian</h3>
                <Button onClick={handleAdd} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Tambah Indikator</span>
                </Button>
            </div>

            <div className="space-y-3">
                {masterData.indicators.map((indicator) => {
                    const criteria = masterData.criteria.find((c) => c.id === indicator.criteriaId);
                    const aspect = masterData.aspects.find((a) => a.id === criteria?.aspectId);
                    return (
                        <Card key={indicator.id}>
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-start space-x-3">
                                        <CheckSquare className="mt-0.5 h-5 w-5 text-purple-600" />
                                        <div>
                                            <p className="font-medium">{indicator.text}</p>
                                            <div className="mt-1 flex items-center space-x-2">
                                                <Badge variant="outline" className="text-xs">
                                                    {aspect?.name}
                                                </Badge>
                                                <span className="text-xs text-gray-400">•</span>
                                                <Badge variant="outline" className="text-xs">
                                                    {criteria?.name}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(indicator)}>
                                            <Edit className="h-3 w-3" />
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => handleDelete(indicator.id)}>
                                            <Trash2 className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Kelola Master Data</CardTitle>
                    <CardDescription>Kelola aspek, kriteria, dan indikator penilaian kinerja</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex space-x-2">
                        <Button
                            variant={selectedLevel === 'aspects' ? 'default' : 'outline'}
                            onClick={() => setSelectedLevel('aspects')}
                            className="flex items-center space-x-2"
                        >
                            <FileText className="h-4 w-4" />
                            <span>Aspek</span>
                        </Button>
                        <Button
                            variant={selectedLevel === 'criteria' ? 'default' : 'outline'}
                            onClick={() => setSelectedLevel('criteria')}
                            className="flex items-center space-x-2"
                        >
                            <Target className="h-4 w-4" />
                            <span>Kriteria</span>
                        </Button>
                        <Button
                            variant={selectedLevel === 'indicators' ? 'default' : 'outline'}
                            onClick={() => setSelectedLevel('indicators')}
                            className="flex items-center space-x-2"
                        >
                            <CheckSquare className="h-4 w-4" />
                            <span>Indikator</span>
                        </Button>
                    </div>

                    {selectedLevel === 'aspects' && renderAspects()}
                    {selectedLevel === 'criteria' && renderCriteria()}
                    {selectedLevel === 'indicators' && renderIndicators()}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? 'Edit' : 'Tambah'}{' '}
                            {selectedLevel === 'aspects' ? 'Aspek' : selectedLevel === 'criteria' ? 'Kriteria' : 'Indikator'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingItem ? 'Edit' : 'Tambahkan'}{' '}
                            {selectedLevel === 'aspects' ? 'aspek' : selectedLevel === 'criteria' ? 'kriteria' : 'indikator'} penilaian baru
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        {selectedLevel === 'criteria' && (
                            <div className="space-y-2">
                                <Label htmlFor="aspect">Aspek</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih aspek" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {masterData.aspects.map((aspect) => (
                                            <SelectItem key={aspect.id} value={aspect.id.toString()}>
                                                {aspect.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        {selectedLevel === 'indicators' && (
                            <div className="space-y-2">
                                <Label htmlFor="criteria">Kriteria</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih kriteria" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {masterData.criteria.map((criteria) => (
                                            <SelectItem key={criteria.id} value={criteria.id.toString()}>
                                                {criteria.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">{selectedLevel === 'indicators' ? 'Teks Indikator' : 'Nama'}</Label>
                            <Input
                                id="name"
                                placeholder={`Masukkan ${selectedLevel === 'indicators' ? 'teks indikator' : 'nama'}`}
                                defaultValue={editingItem?.name || editingItem?.text || ''}
                            />
                        </div>
                        {selectedLevel !== 'indicators' && (
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea id="description" placeholder="Masukkan deskripsi" defaultValue={editingItem?.description || ''} />
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={() => setIsDialogOpen(false)}>
                            {editingItem ? 'Update' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
