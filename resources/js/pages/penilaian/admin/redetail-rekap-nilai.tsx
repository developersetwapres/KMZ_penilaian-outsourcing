'use client';

import MasterDataManager from '@/components/penilaian/master-data-manager';
import PeerAssignment from '@/components/penilaian/peer-assignment';
import ResultsRecap from '@/components/penilaian/results-recap';
import UserManagement from '@/components/penilaian/user-management';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { useToast } from '@/hooks/use-toast';
import { router } from '@inertiajs/react';
import { BarChart3, LogOut, Settings, UserCog, Users } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock user data - in real app this would come from auth context
const mockAdminUser = {
    id: 1,
    email: 'admin@company.com',
    name: 'Dr. Bambang Sutrisno',
    nip: '196801011990031001',
    position: 'Administrator Sistem',
    unit: 'Bagian Kepegawaian',
    role: 'admin',
};

export default function DetailRekapNilai({ outsourcing }: any) {
    const [activeTab, setActiveTab] = useState('master-data');
    const [user, setUser] = useState(mockAdminUser);
    const { toast } = useToast();

    useEffect(() => {
        // In real app, check authentication here
        // If not authenticated, redirect to login
    }, []);

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
                {/* Main Content */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <TabsList className="grid h-12 w-full grid-cols-4">
                        <TabsTrigger value="master-data" className="flex items-center space-x-2 text-sm">
                            <Settings className="h-4 w-4" />
                            <span>Master Data</span>
                        </TabsTrigger>
                        <TabsTrigger value="users" className="flex items-center space-x-2 text-sm">
                            <UserCog className="h-4 w-4" />
                            <span>Kelola User</span>
                        </TabsTrigger>
                        <TabsTrigger value="assignment" className="flex items-center space-x-2 text-sm">
                            <Users className="h-4 w-4" />
                            <span>Penugasan Peer</span>
                        </TabsTrigger>
                        <TabsTrigger value="results" className="flex items-center space-x-2 text-sm">
                            <BarChart3 className="h-4 w-4" />
                            <span>Rekap Hasil</span>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="master-data">
                        <MasterDataManager />
                    </TabsContent>

                    <TabsContent value="users">
                        <UserManagement />
                    </TabsContent>

                    <TabsContent value="assignment">
                        <PeerAssignment outsourcingEmployees={outsourcing} />
                    </TabsContent>

                    <TabsContent value="results">
                        <ResultsRecap />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
}
