"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Search, User, Shield, Building2, Phone, Mail, UserCog, Users, Crown } from "lucide-react"

// Dummy users data
const initialUsers = [
  {
    id: 1,
    email: "bambang.sutrisno@company.com",
    name: "Dr. Bambang Sutrisno",
    nip: "196801011990031001",
    position: "Administrator Sistem",
    unit: "Bagian Kepegawaian",
    role: "admin",
    phone: "081234567890",
    status: "active",
  },
  {
    id: 2,
    email: "andi.wijaya@company.com",
    name: "Dr. Andi Wijaya, M.Si",
    nip: "196505151990031002",
    rank: "Pembina Tk. I (IV/b)",
    position: "Kepala Biro SDM",
    unit: "Biro Sumber Daya Manusia",
    role: "kepala-biro",
    phone: "081234567891",
    status: "active",
  },
  {
    id: 3,
    email: "sari.dewi@company.com",
    name: "Ir. Sari Dewi, M.T",
    nip: "197203101995032001",
    rank: "Penata Tk. I (III/d)",
    position: "Kepala Bagian IT",
    unit: "Bagian Teknologi Informasi",
    role: "kepala-bagian",
    phone: "081234567892",
    status: "active",
  },
  {
    id: 4,
    email: "ahmad.fauzi@company.com",
    name: "Ahmad Fauzi",
    nip: "OUT-2023-001",
    rank: "Outsourcing",
    position: "IT Support Specialist",
    unit: "Bagian Teknologi Informasi",
    role: "outsourcing",
    phone: "081234567893",
    status: "active",
  },
  {
    id: 5,
    email: "linda.sari@company.com",
    name: "Linda Sari",
    nip: "OUT-2023-002",
    rank: "Outsourcing",
    position: "HR Assistant",
    unit: "Biro Sumber Daya Manusia",
    role: "outsourcing",
    phone: "081234567894",
    status: "active",
  },
]

const roleOptions = [
  { value: "admin", label: "Administrator", icon: Shield, color: "bg-red-100 text-red-800" },
  { value: "kepala-biro", label: "Kepala Biro", icon: Crown, color: "bg-purple-100 text-purple-800" },
  { value: "kepala-bagian", label: "Kepala Bagian", icon: UserCog, color: "bg-blue-100 text-blue-800" },
  { value: "outsourcing", label: "Outsourcing", icon: Users, color: "bg-green-100 text-green-800" },
]

const unitOptions = [
  "Bagian Kepegawaian",
  "Biro Sumber Daya Manusia",
  "Bagian Teknologi Informasi",
  "Bagian Keuangan",
  "Bagian Pemasaran",
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [filterRole, setFilterRole] = useState("all")
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    nip: "",
    position: "",
    unit: "",
    role: "",
    phone: "",
    rank: "",
  })

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.unit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    return matchesSearch && matchesRole
  })

  const handleAdd = () => {
    setEditingUser(null)
    setFormData({
      email: "",
      name: "",
      nip: "",
      position: "",
      unit: "",
      role: "",
      phone: "",
      rank: "",
    })
    setIsDialogOpen(true)
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      name: user.name,
      nip: user.nip,
      position: user.position,
      unit: user.unit,
      role: user.role,
      phone: user.phone,
      rank: user.rank || "",
    })
    setIsDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const handleSave = () => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map((user) => (user.id === editingUser.id ? { ...user, ...formData } : user)))
    } else {
      // Add new user
      const newUser = {
        id: Math.max(...users.map((u) => u.id)) + 1,
        ...formData,
        status: "active",
      }
      setUsers([...users, newUser])
    }
    setIsDialogOpen(false)
  }

  const getRoleInfo = (role: string) => {
    return roleOptions.find((r) => r.value === role) || roleOptions[0]
  }

  const toggleUserStatus = (id: number) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: user.status === "active" ? "inactive" : "active" } : user,
      ),
    )
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center space-x-2">
            <UserCog className="h-6 w-6" />
            <span>Manajemen User</span>
          </CardTitle>
          <CardDescription className="text-purple-100">
            Kelola user sistem: Administrator, Kepala Biro, Kepala Bagian, dan Outsourcing
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {roleOptions.map((role) => {
          const count = users.filter((u) => u.role === role.value).length
          const Icon = role.icon
          return (
            <Card key={role.value}>
              <CardContent className="p-4 text-center">
                <div className="flex items-center justify-center mb-2">
                  <div className={`p-2 rounded-full ${role.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{count}</div>
                <div className="text-sm text-gray-600">{role.label}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Daftar User</CardTitle>
              <CardDescription>Kelola semua user dalam sistem</CardDescription>
            </div>
            <Button onClick={handleAdd} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Tambah User</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Role</SelectItem>
                {roleOptions.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Users Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => {
              const roleInfo = getRoleInfo(user.role)
              const Icon = roleInfo.icon

              return (
                <Card key={user.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${roleInfo.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{user.name}</CardTitle>
                          <CardDescription>{user.position}</CardDescription>
                        </div>
                      </div>
                      <Badge
                        variant={user.status === "active" ? "default" : "secondary"}
                        className="cursor-pointer"
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === "active" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3" />
                        <span>{user.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">NIP:</span>
                        <span>{user.nip}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-3 w-3" />
                        <span className="text-xs">{user.unit}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{user.phone}</span>
                      </div>
                      {user.rank && (
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Pangkat:</span>
                          <span className="text-xs">{user.rank}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2 pt-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(user.id)}
                        className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="text-center py-12">
              <CardContent>
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada user ditemukan</h3>
                <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter</p>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingUser ? "Edit User" : "Tambah User Baru"}</DialogTitle>
            <DialogDescription>
              {editingUser ? "Edit informasi user" : "Tambahkan user baru ke sistem"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Masukkan email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  id="nip"
                  value={formData.nip}
                  onChange={(e) => setFormData({ ...formData, nip: e.target.value })}
                  placeholder="Masukkan NIP"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rank">Pangkat/Golongan</Label>
                <Input
                  id="rank"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  placeholder="Masukkan pangkat/golongan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="position">Jabatan</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                placeholder="Masukkan jabatan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="unit">Unit Kerja</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih unit kerja" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map((unit) => (
                    <SelectItem key={unit} value={unit}>
                      {unit}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">No. Telepon</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="Masukkan no. telepon"
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave}>{editingUser ? "Update" : "Simpan"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
