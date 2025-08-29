'use client';

import HeadingSmall from '@/components/heading-small';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { BarChart3, ClipboardList, Loader2, Trash2, Users } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Import settings',
        href: '/settings/import',
    },
];

function App() {
    const [loadingStates, setLoadingStates] = useState({
        users: false,
        penugasan: false,
        indikator: false,
    });

    const simulateResetUsers = async () => {
        setLoadingStates((prev) => ({ ...prev, users: true }));

        router.delete(route('user.reset'), {
            onSuccess: () => {
                toast({
                    title: 'Reset Berhasil',
                    description: 'Data Users berhasil direset.',
                });

                setLoadingStates((prev) => ({ ...prev, users: false }));
                router.get(route('dashboard'));
            },
            onError: (err) => {
                console.log(err);
                toast({
                    title: 'Reset Gagal',
                    description: 'Terjadi kesalahan saat mereset data Users.',
                    variant: 'destructive',
                });
            },
        });
    };

    const simulateResetPenugasan = async () => {
        setLoadingStates((prev) => ({ ...prev, penugasan: true }));

        router.delete(route('penugasan.reset'), {
            onSuccess: () => {
                toast({
                    title: 'Reset Berhasil',
                    description: 'Data Indikator berhasil direset. 45 data telah dihapus.',
                });

                setLoadingStates((prev) => ({ ...prev, penugasan: false }));
                router.get(route('dashboard'));
            },
            onError: (err) => {
                console.log(err);
                toast({
                    title: 'Reset Gagal',
                    description: 'Terjadi kesalahan saat mereset data Indikator.',
                    variant: 'destructive',
                });
            },
        });
    };

    const simulateResetIndikator = async () => {
        setLoadingStates((prev) => ({ ...prev, indikator: true }));

        router.delete(route('indikator.reset'), {
            onSuccess: () => {
                toast({
                    title: 'Reset Berhasil',
                    description: 'Data Penugasan berhasil direset.',
                });
                setLoadingStates((prev) => ({ ...prev, indikator: false }));
                router.get(route('dashboard'));
            },
            onError: (err) => {
                console.log(err);
                toast({
                    title: 'Reset Gagal',
                    description: 'Terjadi kesalahan saat mereset data Penugasan.',
                    variant: 'destructive',
                });
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Reset Data Aplikasi" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Reset Data Aplikasi" description="Reset data User App, Penugasan Peer dan Indikator Kriteria" />

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                Reset data Users
                            </CardTitle>
                            <CardDescription>Menghapus semua data pengguna aplikasi. Tindakan ini tidak dapat dibatalkan.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={loadingStates.users} className="w-full sm:w-auto">
                                        {loadingStates.users ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Mereset...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Reset Data Users
                                            </>
                                        )}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Reset Data Users</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin mereset semua data users? Tindakan ini akan menghapus semua data pengguna dan
                                            tidak dapat dibatalkan.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction onClick={simulateResetUsers} className="bg-destructive text-white hover:bg-destructive/90">
                                            Ya, Reset Data
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5" />
                                Reset data Penugasan
                            </CardTitle>
                            <CardDescription>Menghapus semua data penugasan peer review. Tindakan ini tidak dapat dibatalkan.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={loadingStates.penugasan} className="w-full sm:w-auto">
                                        {loadingStates.penugasan ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Mereset...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Reset Data Penugasan
                                            </>
                                        )}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Reset Data Penugasan</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin mereset semua data penugasan? Tindakan ini akan menghapus semua data penugasan
                                            peer review dan tidak dapat dibatalkan.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={simulateResetPenugasan}
                                            className="bg-destructive text-white hover:bg-destructive/90"
                                        >
                                            Ya, Reset Data
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BarChart3 className="h-5 w-5" />
                                Reset data Indikator
                            </CardTitle>
                            <CardDescription>Menghapus semua data indikator kriteria penilaian. Tindakan ini tidak dapat dibatalkan.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" disabled={loadingStates.indikator} className="w-full sm:w-auto">
                                        {loadingStates.indikator ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Mereset...
                                            </>
                                        ) : (
                                            <>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Reset Data Indikator
                                            </>
                                        )}
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Konfirmasi Reset Data Indikator</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Apakah Anda yakin ingin mereset semua data indikator? Tindakan ini akan menghapus semua data indikator
                                            kriteria dan tidak dapat dibatalkan.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={simulateResetIndikator}
                                            className="bg-destructive text-white hover:bg-destructive/90"
                                        >
                                            Ya, Reset Data
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </CardContent>
                    </Card>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

export default App;
