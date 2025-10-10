'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { router } from '@inertiajs/react';
import { ClipboardList, Edit, FileText, Plus, Settings, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const jabatan = [
    'Pengemudi',
    'Pramubakti/Pramusaji',
    'Sekretaris/Administrasi',
    'Petugas Tata Tempat',
    'Teknisi IT',
    'Teknisi ME',
    'Cleaning Service',
];

export default function MasterDataManager({ masterData }: any) {
    const [selectedLevel, setSelectedLevel] = useState<'aspects' | 'criteria'>('aspects');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);
    const [indicators, setIndicators] = useState<string[]>(['']);
    const [isKriteriaKeahlian, setKriteriaKeahlian] = useState(false);
    const [selectedCriteria, setSelectedCriteria] = useState('');
    const [selectedJenis, setSelectedJenis] = useState('');

    const handleAdd = () => {
        setEditingItem(null);
        setIndicators(['']);
        setIsDialogOpen(true);
    };

    const handleEdit = (item: any) => {
        setKriteriaKeahlian(false);
        setSelectedJenis('');

        setEditingItem(item);
        if (selectedLevel === 'criteria' && item.indikator) {
            setIndicators(item.indikator);
        } else {
            setIndicators(['']);
        }
        setIsDialogOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
            console.log('Delete item:', id);
        }
    };

    const addIndicator = () => {
        setIndicators([...indicators, '']);
    };

    const removeIndicator = (index: number) => {
        if (indicators.length > 1) {
            setIndicators(indicators.filter((_, i) => i !== index));
        }
    };

    const updateIndicator = (index: number, value: string) => {
        const newIndicators = [...indicators];
        newIndicators[index] = value;
        setIndicators(newIndicators);
    };

    const handleSave = () => {
        const nameInput = document.querySelector('#name') as HTMLInputElement;
        const descriptionInput = document.querySelector('#description') as HTMLTextAreaElement;

        let idAspek = editingItem?.get_aspek.id;
        if (selectedCriteria) {
            idAspek = selectedCriteria;
        }

        let jenis = selectedJenis;
        let nama = 'Keahlian';
        if (selectedJenis == '') {
            jenis = 'umum';
            nama = nameInput?.value || '';
        }

        const formData: Record<string, any> = {
            name: nama,
        };

        if (selectedLevel === 'aspects') {
            formData.description = descriptionInput?.value || '';
        }

        if (selectedLevel === 'criteria') {
            formData.aspek_id = idAspek;
            formData.jenis = jenis;
            formData.indicators = indicators.filter((indicator) => indicator.trim() !== '');
        }

        if (editingItem) {
            router.put(route('kriteria.update', editingItem.id), formData, {
                onSuccess: () => {
                    //
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        } else {
            router.post(route('kriteria.store'), formData, {
                onSuccess: () => {
                    //
                },
                onError: (err) => {
                    console.log(err);
                },
            });
        }

        setIsDialogOpen(false);
    };

    const renderAspects = () => (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Aspek Penilaian</h3>
                <Button onClick={handleAdd} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Tambah Aspek</span>
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                {masterData.aspects.map((aspect: any, index: number) => (
                    <Card key={aspect.nama} className="border-2 border-blue-200 bg-blue-50/30">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <CardTitle className="text-base text-blue-800">{aspect.nama}</CardTitle>
                                </div>
                                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                                    {aspect.count_kriteria_count} kriteria
                                </Badge>
                            </div>
                            <CardDescription className="text-blue-700">{aspect.deskripsi}</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleEdit(aspect)}>
                                    <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleDelete(aspect.id)}>
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );

    const renderCriteria = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Kriteria Penilaian</h3>
                <Button onClick={handleAdd} className="flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Tambah Kriteria</span>
                </Button>
            </div>

            {masterData.aspects.map((aspect: any, index: number) => {
                const aspectCriteria = masterData.criteria.filter((c: any) => c.aspek_id === aspect.id);
                if (aspectCriteria.length === 0) return null;

                return (
                    <div key={index} className="space-y-4">
                        <div className="flex items-center space-x-3 rounded-lg border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-transparent p-3 pb-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                {index + 1}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-blue-800">{aspect.nama}</h4>
                                <p className="text-sm text-blue-600">{aspectCriteria.length} kriteria penilaian</p>
                            </div>
                        </div>

                        <div className="grid gap-4 pl-4 lg:grid-cols-2">
                            {aspectCriteria.map((criteria: any) => (
                                <Card key={criteria.id} className="gap-0 border-l-4 border-l-blue-500 transition-shadow hover:shadow-md">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-2">
                                                <ClipboardList className="h-5 w-5 text-blue-600" />
                                                <CardTitle className="text-base">{criteria?.nama}</CardTitle>
                                            </div>
                                            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                                {criteria?.get_indikators.length} indikator
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <div className="mb-3">
                                            <p className="mb-2 text-sm font-medium text-gray-700">Indikator Penilaian:</p>
                                            <ul className="max-h-24 space-y-1 overflow-y-auto text-xs text-gray-600">
                                                {criteria?.get_indikators.map((indicator: any, idx: number) => (
                                                    <li key={idx} className="flex items-start space-x-1">
                                                        <span className="font-bold text-blue-400">•</span>
                                                        <span className="leading-relaxed">{indicator?.indikator}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
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
                            ))}
                        </div>
                    </div>
                );
            })}

            {/* <div className="space-y-4">
                <div className="flex items-center space-x-3 rounded-lg border-b-2 border-blue-200 bg-gradient-to-r from-blue-50 to-transparent p-3 pb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {masterData.aspects.length + 1}
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-blue-800">Khusus Kriteria Keahlian</h4>
                        <p className="text-sm text-blue-600">{masterData.criteriaKhusus.length} kriteria penilaian</p>
                    </div>
                </div>

                <div className="grid gap-4 pl-4 md:grid-cols-2 lg:grid-cols-3">
                    {masterData.criteriaKhusus.map((criteria: any) => (
                        <Card key={criteria.id} className="gap-0 border-l-4 border-l-blue-500 transition-shadow hover:shadow-md">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-2">
                                        <ClipboardList className="h-5 w-5 text-blue-600" />
                                        <CardTitle className="text-base">{criteria?.nama}</CardTitle>
                                    </div>
                                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                                        {criteria.indikator.length} indikator
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="mb-3">
                                    <p className="mb-2 text-sm font-medium text-gray-700">Indikator Penilaian:</p>
                                    <ul className="max-h-24 space-y-1 overflow-y-auto text-xs text-gray-600">
                                        {criteria.indikator.map((indicator: any, idx: number) => (
                                            <li key={idx} className="flex items-start space-x-1">
                                                <span className="font-bold text-blue-400">•</span>
                                                <span className="leading-relaxed">{indicator}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
                    ))}
                </div>
            </div> */}
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header Card */}
            <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Settings className="h-6 w-6" />
                        <span>Kelola Master Data Penilaian Outsourcing</span>
                    </CardTitle>
                    <CardDescription className="text-purple-100">
                        Kelola aspek dan kriteria penilaian kinerja outsourcing beserta indikatornya
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
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
                            <ClipboardList className="h-4 w-4" />
                            <span>Kriteria</span>
                        </Button>
                    </div>

                    {selectedLevel === 'aspects' && renderAspects()}
                    {selectedLevel === 'criteria' && renderCriteria()}
                </CardContent>
            </Card>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {editingItem ? 'Edit' : 'Tambah'} {selectedLevel === 'aspects' ? 'Aspek' : 'Kriteria'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingItem ? 'Edit' : 'Tambahkan'} {selectedLevel === 'aspects' ? 'aspek' : 'kriteria'} penilaian
                            {selectedLevel === 'criteria' && ' beserta indikatornya'}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        {selectedLevel === 'criteria' && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="aspect">Aspek</Label>
                                    <Select
                                        defaultValue={editingItem?.get_aspek.id}
                                        onValueChange={(value) => {
                                            setSelectedCriteria(value);
                                        }}
                                    >
                                        <SelectTrigger id="aspect">
                                            <SelectValue placeholder="Pilih aspek" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {masterData.aspects.map((aspect: any) => (
                                                <SelectItem key={aspect.id} value={aspect.id}>
                                                    {aspect.nama}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {
                                    <div className="flex items-center space-x-3">
                                        <Checkbox
                                            id="keahlian"
                                            name="keahlian"
                                            checked={isKriteriaKeahlian}
                                            onClick={() => setKriteriaKeahlian(!isKriteriaKeahlian)}
                                        />
                                        <Label htmlFor="keahlian">Kriteria Keahlian ?</Label>
                                    </div>
                                }

                                {isKriteriaKeahlian && (
                                    <div className="space-y-2">
                                        <Label htmlFor="jenis">Jabatan</Label>
                                        <Select
                                            onValueChange={(value) => {
                                                setSelectedJenis(value);
                                            }}
                                        >
                                            <SelectTrigger id="jenis">
                                                <SelectValue placeholder="Pilih aspek" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {jabatan.map((jabatan: any) => (
                                                    <SelectItem key={jabatan} value={jabatan}>
                                                        {jabatan}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </>
                        )}

                        {!isKriteriaKeahlian && (
                            <div className="space-y-2">
                                <Label htmlFor="name">Nama {selectedLevel === 'aspects' ? 'Aspek' : 'Kriteria'}</Label>
                                <Input
                                    id="name"
                                    placeholder={`Masukkan nama ${selectedLevel === 'aspects' ? 'aspek' : 'kriteria'}`}
                                    defaultValue={editingItem?.nama || ''}
                                />
                            </div>
                        )}

                        {selectedLevel === 'aspects' && (
                            <div className="space-y-2">
                                <Label htmlFor="description">Deskripsi</Label>
                                <Textarea id="description" placeholder="Masukkan deskripsi aspek" defaultValue={editingItem?.description || ''} />
                            </div>
                        )}

                        {selectedLevel === 'criteria' && (
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label>Indikator Penilaian</Label>
                                </div>
                                <div className="max-h-64 space-y-3 overflow-y-auto">
                                    {indicators.map((indicator, index) => (
                                        <div key={index} className="flex items-start space-x-2">
                                            <Textarea
                                                placeholder={`Indikator ${index + 1}`}
                                                value={indicator}
                                                onChange={(e) => updateIndicator(index, e.target.value)}
                                                className="min-h-[60px] flex-1"
                                                rows={2}
                                            />
                                            {indicators.length > 1 && (
                                                <Button type="button" size="sm" variant="outline" onClick={() => removeIndicator(index)}>
                                                    <X className="h-3 w-3" />
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    type="button"
                                    size="sm"
                                    onClick={addIndicator}
                                    className="flex items-center space-x-1 border bg-transparent text-gray-600 hover:bg-gray-100"
                                >
                                    <Plus className="h-3 w-3" />
                                    <span>Tambah Indikator</span>
                                </Button>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>
                            {editingItem ? 'Update' : 'Simpan'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
