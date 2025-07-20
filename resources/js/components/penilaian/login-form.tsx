"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import AdminDashboard from "@/components/admin-dashboard"
import EvaluatorDashboard from "@/components/evaluator-dashboard"

const loginSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
})

// Updated users data with role determined by backend
const users = [
  {
    id: 1,
    username: "admin001",
    password: "admin123",
    name: "Dr. Bambang Sutrisno",
    nip: "196801011990031001",
    position: "Administrator Sistem",
    unit: "Bagian Kepegawaian",
    role: "admin",
  },
  {
    id: 2,
    username: "biro001",
    password: "biro123",
    name: "Dr. Andi Wijaya, M.Si",
    nip: "196505151990031002",
    rank: "Pembina Tk. I (IV/b)",
    position: "Kepala Biro SDM",
    unit: "Biro Sumber Daya Manusia",
    type: "kepala-biro",
    role: "evaluator",
  },
  {
    id: 3,
    username: "bagian001",
    password: "bagian123",
    name: "Ir. Sari Dewi, M.T",
    nip: "197203101995032001",
    rank: "Penata Tk. I (III/d)",
    position: "Kepala Bagian IT",
    unit: "Bagian Teknologi Informasi",
    type: "kepala-bagian",
    role: "evaluator",
  },
  {
    id: 4,
    username: "out001",
    password: "out123",
    name: "Ahmad Fauzi",
    nip: "OUT-2023-001",
    rank: "Outsourcing",
    position: "IT Support Specialist",
    unit: "Bagian Teknologi Informasi",
    type: "outsourcing",
    role: "evaluator",
  },
  {
    id: 5,
    username: "out002",
    password: "out123",
    name: "Linda Sari",
    nip: "OUT-2023-002",
    rank: "Outsourcing",
    position: "HR Assistant",
    unit: "Biro Sumber Daya Manusia",
    type: "outsourcing",
    role: "evaluator",
  },
]

interface LoginFormProps {
  onBack: () => void
}

export default function LoginForm({ onBack }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [loggedInUser, setLoggedInUser] = useState<any>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const validatedData = loginSchema.parse(formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user by username and password - backend will determine role
      const user = users.find((u) => u.username === validatedData.username && u.password === validatedData.password)

      if (user) {
        setLoggedInUser(user)
      } else {
        setErrors({ general: "Username atau password tidak valid" })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(fieldErrors)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setLoggedInUser(null)
    setFormData({ username: "", password: "" })
  }

  if (loggedInUser) {
    if (loggedInUser.role === "admin") {
      return <AdminDashboard user={loggedInUser} onLogout={handleLogout} />
    } else {
      return <EvaluatorDashboard user={loggedInUser} onLogout={handleLogout} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" onClick={onBack} className="mb-6 flex items-center space-x-2 hover:bg-white/50">
          <ArrowLeft className="h-4 w-4" />
          <span>Kembali</span>
        </Button>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full w-fit">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Login Sistem</CardTitle>
            <CardDescription>Masukkan kredensial Anda untuk mengakses sistem</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Masukkan username"
                  value={formData.username}
                  onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                  className={errors.username ? "border-red-500" : ""}
                />
                {errors.username && <p className="text-sm text-red-600">{errors.username}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
              </div>

              {errors.general && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.general}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Masuk"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-sm text-gray-700 mb-2">Demo Credentials:</h4>
              <div className="space-y-1 text-xs text-gray-600">
                <p>
                  <strong>Admin:</strong> admin001 / admin123
                </p>
                <p>
                  <strong>Kepala Biro:</strong> biro001 / biro123
                </p>
                <p>
                  <strong>Kepala Bagian:</strong> bagian001 / bagian123
                </p>
                <p>
                  <strong>Outsourcing:</strong> out001 / out123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
