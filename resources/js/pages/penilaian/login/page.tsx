"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"

const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(1, "Password harus diisi"),
})

// Updated users data with email instead of username
const users = [
  {
    id: 1,
    email: "admin@company.com",
    password: "admin123",
    name: "Dr. Bambang Sutrisno",
    nip: "196801011990031001",
    position: "Administrator Sistem",
    unit: "Bagian Kepegawaian",
    role: "admin",
  },
  {
    id: 2,
    email: "biro@company.com",
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
    email: "bagian@company.com",
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
    email: "ahmad.fauzi@company.com",
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
    email: "linda.sari@company.com",
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

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    try {
      const validatedData = loginSchema.parse(formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Find user by email and password - backend will determine role
      const user = users.find((u) => u.email === validatedData.email && u.password === validatedData.password)

      if (user) {
        toast({
          title: "Login Berhasil",
          description: `Selamat datang, ${user.name}!`,
        })

        // Redirect based on role
        setTimeout(() => {
          if (user.role === "admin") {
            window.location.href = "/admin"
          } else {
            window.location.href = "/evaluator"
          }
        }, 1000)
      } else {
        setErrors({ general: "Email atau password tidak valid" })
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => (window.location.href = "/")}
          className="mb-6 flex items-center space-x-2 hover:bg-white/50"
        >
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Masukkan email"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
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
                  <strong>Admin:</strong> admin@company.com / admin123
                </p>
                <p>
                  <strong>Kepala Biro:</strong> biro@company.com / biro123
                </p>
                <p>
                  <strong>Kepala Bagian:</strong> bagian@company.com / bagian123
                </p>
                <p>
                  <strong>Outsourcing:</strong> ahmad.fauzi@company.com / out123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
