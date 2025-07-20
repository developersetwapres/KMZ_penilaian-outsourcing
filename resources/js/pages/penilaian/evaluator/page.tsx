"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ClipboardList, Search, User, Building2, CheckCircle, Clock, LogOut, Phone, Mail, MapPin } from "lucide-react"
import EvaluationForm from "@/components/evaluation-form"
import { useToast } from "@/hooks/use-toast"

// Mock user data - in real app this would come from auth context
const mockEvaluatorUser = {
  id: 4,
  email: "ahmad.fauzi@company.com",
  name: "Ahmad Fauzi",
  nip: "OUT-2023-001",
  rank: "Outsourcing",
  position: "IT Support Specialist",
  unit: "Bagian Teknologi Informasi",
  type: "outsourcing",
  role: "evaluator",
}

// Dummy employees data with more detailed info
const employees = [
  {
    id: 1,
    name: "Ahmad Rizki Pratama",
    position: "Technical Support Specialist",
    unit: "Bagian Teknologi Informasi",
    contact: "081234567890",
    email: "ahmad.rizki@company.com",
    status: "draft",
    assignedTo: ["kepala-biro", "kepala-bagian", "out001"], // out001 is peer evaluator
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    position: "HR Assistant",
    unit: "Biro Sumber Daya Manusia",
    contact: "081234567891",
    email: "siti.nurhaliza@company.com",
    status: "completed",
    assignedTo: ["kepala-biro", "out002"], // out002 is peer evaluator
  },
  {
    id: 3,
    name: "Budi Santoso",
    position: "Finance Assistant",
    unit: "Bagian Keuangan",
    contact: "081234567892",
    email: "budi.santoso@company.com",
    status: "draft",
    assignedTo: ["kepala-biro", "kepala-bagian"],
  },
  {
    id: 4,
    name: "Maya Sari Dewi",
    position: "Marketing Assistant",
    unit: "Bagian Pemasaran",
    contact: "081234567893",
    email: "maya.sari@company.com",
    status: "draft",
    assignedTo: ["kepala-biro", "kepala-bagian"],
  },
]

// Peer assignments for outsourcing evaluators
const peerAssignments = {
  "ahmad.fauzi@company.com": [1], // Ahmad Fauzi evaluates Ahmad Rizki
  "linda.sari@company.com": [2], // Linda Sari evaluates Siti Nurhaliza
}

export default function EvaluatorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)
  const [user, setUser] = useState(mockEvaluatorUser)
  const { toast } = useToast()

  useEffect(() => {
    // In real app, check authentication here
    // If not authenticated, redirect to login
  }, [])

  // Filter employees based on user type
  const getAssignedEmployees = () => {
    if (user.type === "outsourcing") {
      // Outsourcing only sees assigned peer
      const assignedIds = peerAssignments[user.email as keyof typeof peerAssignments] || []
      return employees.filter((emp) => assignedIds.includes(emp.id))
    } else if (user.type === "kepala-bagian") {
      // Kepala Bagian sees employees in their unit
      return employees.filter((emp) => emp.unit === user.unit)
    } else if (user.type === "kepala-biro") {
      // Kepala Biro sees all employees in their biro
      return employees.filter((emp) => (emp.unit.includes("Biro") ? emp.unit === user.unit : true))
    }
    return []
  }

  const assignedEmployees = getAssignedEmployees()
  const filteredEmployees = assignedEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.unit.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleLogout = () => {
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari sistem",
    })
    setTimeout(() => {
      window.location.href = "/"
    }, 1000)
  }

  if (selectedEmployee) {
    const employee = employees.find((emp) => emp.id === selectedEmployee)
    return <EvaluationForm employee={employee!} evaluator={user} onBack={() => setSelectedEmployee(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <ClipboardList className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Dashboard Penilai</h1>
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
          {/* User Profile Card */}
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <div className="flex items-center space-x-4">
                <div className="bg-white/20 p-3 rounded-full">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-white">{user.name}</CardTitle>
                  <CardDescription className="text-green-100">
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
                    <span className="font-medium">Pangkat/Gol:</span>
                    <span>{user.rank}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span>{user.unit}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {user.type.replace("-", " ").replace(/\b\w/g, (l: string) => l.toUpperCase())}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Stats */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Daftar Pegawai yang Dinilai</h2>
              <p className="text-gray-600">
                {user.type === "outsourcing"
                  ? "Pegawai teman setingkat yang harus Anda nilai"
                  : `Pegawai outsourcing di ${user.unit} yang harus dinilai`}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{assignedEmployees.length}</div>
                <div className="text-sm text-gray-500">Total Pegawai</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {assignedEmployees.filter((emp) => emp.status === "completed").length}
                </div>
                <div className="text-sm text-gray-500">Selesai</div>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari pegawai atau unit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Employees Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <Card
                key={employee.id}
                className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <CardDescription className="flex items-center space-x-1">
                          <Building2 className="h-3 w-3" />
                          <span>{employee.unit}</span>
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      variant={employee.status === "completed" ? "default" : "secondary"}
                      className="flex items-center space-x-1"
                    >
                      {employee.status === "completed" ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <Clock className="h-3 w-3" />
                      )}
                      <span>{employee.status === "completed" ? "Selesai" : "Draft"}</span>
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">Jabatan:</span>
                      <span>{employee.position}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{employee.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-3 w-3" />
                      <span className="text-xs">{employee.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-3 w-3" />
                      <span>{employee.unit}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedEmployee(employee.id)}
                    className="w-full"
                    variant={employee.status === "completed" ? "outline" : "default"}
                  >
                    <ClipboardList className="h-4 w-4 mr-2" />
                    {employee.status === "completed" ? "Lihat Penilaian" : "Mulai Penilaian"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredEmployees.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {assignedEmployees.length === 0 ? "Tidak ada pegawai yang ditugaskan" : "Tidak ada pegawai ditemukan"}
                </h3>
                <p className="text-gray-500">
                  {assignedEmployees.length === 0
                    ? "Hubungi administrator untuk penugasan penilaian"
                    : "Coba ubah kata kunci pencarian Anda"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
