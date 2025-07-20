"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Shield, Users, Building2, ArrowRight } from "lucide-react"

export default function HomePage() {
  const [showLogin, setShowLogin] = useState(false)

  if (showLogin) {
    window.location.href = "/login"
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-2xl shadow-lg">
              <ClipboardList className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Sistem Penilaian Kinerja</h1>
          <p className="text-xl text-gray-600 mb-2">Tenaga Kerja Outsourcing</p>
          <p className="text-gray-500 max-w-2xl mx-auto mb-8">
            Platform terintegrasi untuk mengelola dan melakukan penilaian kinerja pegawai outsourcing dengan sistem
            evaluasi yang komprehensif dan terstruktur.
          </p>

          <Card
            className="max-w-md mx-auto hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-blue-200 group"
            onClick={() => setShowLogin(true)}
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full w-fit group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-blue-700">Masuk ke Sistem</CardTitle>
              <CardDescription className="text-base">Login untuk mengakses dashboard Anda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center space-x-2 text-blue-600 font-medium">
                <span>Klik untuk login</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Fitur Unggulan Sistem</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Evaluasi Terstruktur</h3>
              <p className="text-sm text-gray-600">
                Sistem penilaian dengan 3 aspek utama: Teknis, Perilaku, dan Penilaian Lain
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Multi-Level Evaluator</h3>
              <p className="text-sm text-gray-600">
                Penilaian dari 3 tingkatan: Kepala Biro, Kepala Bagian, dan Teman Setingkat
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-md">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Manajemen Terpusat</h3>
              <p className="text-sm text-gray-600">
                Dashboard admin untuk mengelola master data dan melihat rekap hasil
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
