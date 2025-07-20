'use client';

import MasterDataManager from '@/components/penilaian/master-data-manager';
import PeerAssignment from '@/components/penilaian/peer-assignment';
import ResultsRecap from '@/components/penilaian/results-recap';
import UserManagement from '@/components/penilaian/user-management';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Building2, LogOut, Settings, User, UserCog, Users } from 'lucide-react';
import { useState } from 'react';

interface AdminDashboardProps {
    user: any;
    onLogout: () => void;
}

export default function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
    const [activeTab, setActiveTab] = useState('master-data');

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
                            onClick={onLogout}
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
                                        {user.position} • {user.unit}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 text-sm md:grid-cols-2">
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">NIP:</span>
                                        <span>{user.nip}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">Role:</span>
                                        <span>System Administrator</span>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Building2 className="h-4 w-4" />
                                        <span>{user.unit}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="font-medium">Akses:</span>
                                        <span>Full System Access</span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

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
                            <PeerAssignment />
                        </TabsContent>

                        <TabsContent value="results">
                            <ResultsRecap />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
