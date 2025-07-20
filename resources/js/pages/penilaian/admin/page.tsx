"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Users, BarChart3, LogOut, User, Building2, UserCog } from "lucide-react"
import MasterDataManager from "@/components/master-data-manager"
import PeerAssignment from "@/components/peer-assignment"
import ResultsRecap from "@/components/results-recap"
import UserManagement from "@/components/user-management"
import { useToast } from "@/hooks/use-toast"

// Mock user data - in real app this would come from auth context
const mockAdminUser = {
  id: 1,
  email: "admin@company.com",
  name: "Dr. Bambang Sutrisno",
  nip: "196801011990031001",
  position: "Administrator Sistem",
  unit: "Bagian Kepegawaian",
  role: "admin",
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("master-data")
  const [user, setUser] = useState(mockAdminUser)
  const { toast } = useToast()

  useEffect(() => {
    // In real app, check authentication here
    // If not authenticated, redirect to login
  }, [])

  const handleLogout = () => {
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    })
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
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
              className="flex items-center space-x-2 hover:bg-red-50 hover:border-red-200 hover:text-red-600 bg-transparent"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Admin Profile Card */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
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
              <div className="grid md:grid-cols-2 gap-4 text-sm">
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
            <TabsList className="grid w-full grid-cols-4 h-12">
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
  )
}
