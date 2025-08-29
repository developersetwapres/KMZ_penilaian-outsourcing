'use client';

import MasterDataManager from '@/components/penilaian/master-data-manager';
import PeerAssignment from '@/components/penilaian/peer-assignment';
import ResultsRecap from '@/components/penilaian/results-recap';
import UserManagement from '@/components/penilaian/user-management';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useToast } from '@/hooks/use-toast';
import { SharedData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { BarChart3, Building2, LogOut, Settings, User, UserCog, Users } from 'lucide-react';
import { useState } from 'react';

export default function AdminPage({ outsourcing, masterData, users, evaluationResults }: any) {
    const { auth } = usePage<SharedData>().props;
    const [activeTab, setActiveTab] = useState('results');
    const { toast } = useToast();

    const user = auth.user;

    const cleanup = useMobileNavigation();

    const handleLogout = () => {
        cleanup();
        router.flushAll();

        router.post(
            route('logout'),
            {},
            {
                onSuccess: () => {
                    toast({
                        title: 'Logout Berhasil',
                        description: 'Anda telah keluar dari sistem',
                    });
                },
            },
        );
    };

    return (
        <>
            <Head title="Dashboard" />
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                {/* Header */}
                <header className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-blue-600 p-2">
                                    <Settings className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">Dashboard Administrator</h1>
                                    <p className="text-sm text-gray-500">Sistem Penilaian Kinerja Outsourcing</p>
                                </div>
                            </div>

                            <Button
                                variant="outline"
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-transparent hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* Admin Profile Card */}
                        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                            <CardHeader>
                                <div className="flex items-center space-x-4">
                                    <div className="rounded-full bg-white/20 p-3">
                                        <User className="h-8 w-8 text-white" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
                                        <CardDescription className="text-blue-100">
                                            {user.jabatan} • {user.unit_kerja}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid gap-4 text-sm md:grid-cols-2">
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">Email:</span>
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">Role:</span>
                                            <span>System Administrator</span>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Building2 className="h-4 w-4" />
                                            <span>{user.unit_kerja}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <span className="font-medium">Akses:</span>
                                            <a href={route('profile.edit')}>Full System Access</a>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Main Content */}
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                            <TabsList className="grid h-12 w-full grid-cols-4">
                                <TabsTrigger value="results" className="flex items-center space-x-2 text-sm">
                                    <BarChart3 className="h-4 w-4" />
                                    <span>Rekap Hasil</span>
                                </TabsTrigger>
                                <TabsTrigger value="assignment" className="flex items-center space-x-2 text-sm">
                                    <Users className="h-4 w-4" />
                                    <span>Penugasan Peer</span>
                                </TabsTrigger>
                                <TabsTrigger value="master-data" className="flex items-center space-x-2 text-sm">
                                    <Settings className="h-4 w-4" />
                                    <span>Evaluasi 360</span>
                                </TabsTrigger>
                                <TabsTrigger value="users" className="flex items-center space-x-2 text-sm">
                                    <UserCog className="h-4 w-4" />
                                    <span>Kelola User</span>
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="results">
                                <ResultsRecap evaluationResults={evaluationResults} />
                            </TabsContent>

                            <TabsContent value="assignment">
                                <PeerAssignment outsourcingEmployees={outsourcing} />
                            </TabsContent>

                            <TabsContent value="master-data">
                                <MasterDataManager masterData={masterData} />
                            </TabsContent>

                            <TabsContent value="users">
                                <UserManagement initialUsers={users} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </main>
            </div>
        </>
    );
}
