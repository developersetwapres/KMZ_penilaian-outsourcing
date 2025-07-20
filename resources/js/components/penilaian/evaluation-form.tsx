"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, CheckCircle, User, Phone, Mail, MapPin } from "lucide-react"
import { z } from "zod"
import { useToast } from "@/hooks/use-toast"

// Validation schema
const evaluationSchema = z.object({
  scores: z.record(z.string(), z.string()),
  overallNotes: z.string().optional(),
})

// Dummy evaluation data
const evaluationData = {
  "aspek-teknis": {
    title: "Aspek Teknis",
    criteria: [
      {
        id: "teknis-1",
        name: "Penguasaan Teknologi",
        indicators: [
          { id: "t1-1", text: "Kemampuan menggunakan software/aplikasi kerja sesuai bidang tugas" },
          { id: "t1-2", text: "Pemahaman terhadap sistem dan prosedur teknis yang berlaku" },
          { id: "t1-3", text: "Kemampuan troubleshooting dan mengatasi masalah teknis dasar" },
        ],
      },
      {
        id: "teknis-2",
        name: "Kualitas Kerja",
        indicators: [
          { id: "t2-1", text: "Ketepatan dan keakuratan dalam menyelesaikan tugas" },
          { id: "t2-2", text: "Kesesuaian hasil kerja dengan standar yang ditetapkan" },
          { id: "t2-3", text: "Kemampuan menyelesaikan pekerjaan sesuai deadline" },
        ],
      },
    ],
  },
  "aspek-perilaku": {
    title: "Aspek Perilaku",
    criteria: [
      {
        id: "perilaku-1",
        name: "Disiplin",
        indicators: [
          { id: "p1-1", text: "Kehadiran dan ketepatan waktu dalam bekerja" },
          { id: "p1-2", text: "Kepatuhan terhadap aturan dan tata tertib perusahaan" },
          { id: "p1-3", text: "Konsistensi dalam menjalankan tugas dan tanggung jawab" },
        ],
      },
      {
        id: "perilaku-2",
        name: "Kerjasama dan Komunikasi",
        indicators: [
          { id: "p2-1", text: "Kemampuan bekerja dalam tim dan berkolaborasi" },
          { id: "p2-2", text: "Komunikasi yang efektif dengan rekan kerja dan atasan" },
          { id: "p2-3", text: "Sikap saling membantu dan mendukung rekan kerja" },
        ],
      },
    ],
  },
  "aspek-lain": {
    title: "Aspek Penilaian Lain",
    criteria: [
      {
        id: "lain-1",
        name: "Inisiatif dan Kreativitas",
        indicators: [
          { id: "l1-1", text: "Proaktif dalam mengidentifikasi dan mengatasi masalah" },
          { id: "l1-2", text: "Memberikan saran dan ide untuk perbaikan proses kerja" },
          { id: "l1-3", text: "Inisiatif dalam mengembangkan kemampuan diri" },
        ],
      },
      {
        id: "lain-2",
        name: "Adaptabilitas",
        indicators: [
          { id: "l2-1", text: "Kemampuan menyesuaikan diri dengan perubahan kebijakan" },
          { id: "l2-2", text: "Fleksibilitas dalam menjalankan tugas yang bervariasi" },
          { id: "l2-3", text: "Kemampuan belajar hal-hal baru dengan cepat" },
        ],
      },
    ],
  },
}

const scoreOptions = [
  { value: "1", label: "SK (≤50)", color: "bg-red-100 text-red-800", description: "Sangat Kurang" },
  { value: "2", label: "K (51-75)", color: "bg-orange-100 text-orange-800", description: "Kurang" },
  { value: "3", label: "B (76-90)", color: "bg-blue-100 text-blue-800", description: "Baik" },
  { value: "4", label: "SB (91-100)", color: "bg-green-100 text-green-800", description: "Sangat Baik" },
]

interface EvaluationFormProps {
  employee: {
    id: number
    name: string
    unit: string
    position: string
    contact: string
    email: string
  }
  evaluator: any
  onBack: () => void
}

export default function EvaluationForm({ employee, evaluator, onBack }: EvaluationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [scores, setScores] = useState<Record<string, string>>({})
  const [overallNotes, setOverallNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const { toast } = useToast()

  const aspects = Object.keys(evaluationData)
  const currentAspect = aspects[currentStep]
  const aspectData = evaluationData[currentAspect as keyof typeof evaluationData]
  const progress = ((currentStep + 1) / aspects.length) * 100

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [currentStep])

  const handleScoreChange = (indicatorId: string, score: string) => {
    setScores((prev) => ({ ...prev, [indicatorId]: score }))
  }

  const canProceed = () => {
    const currentIndicators = aspectData.criteria.flatMap((c) => c.indicators.map((i) => i.id))
    return currentIndicators.every((id) => scores[id])
  }

  const handleNext = () => {
    if (currentStep < aspects.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      setShowReview(true)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    toast({
      title: "Penilaian Berhasil Disimpan!",
      description: "Terima kasih atas penilaian yang telah diberikan.",
    })
    setIsSubmitting(false)
    onBack()
  }

  const calculateAspectScore = (aspectKey: string) => {
    const aspect = evaluationData[aspectKey as keyof typeof evaluationData]
    if (!aspect) return 0

    const totalIndicators = aspect.criteria.reduce((count, criterion) => count + criterion.indicators.length, 0)
    let totalScore = 0

    aspect.criteria.forEach((criterion) => {
      criterion.indicators.forEach((indicator) => {
        const score = scores[indicator.id]
        if (score) {
          totalScore += Number.parseInt(score)
        }
      })
    })

    return totalIndicators > 0 ? (totalScore / totalIndicators) * 25 : 0
  }

  const renderReview = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl text-blue-600">Review Penilaian</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {aspects.map((aspectKey) => {
          const aspect = evaluationData[aspectKey as keyof typeof evaluationData]
          const aspectScore = calculateAspectScore(aspectKey)

          return (
            <div key={aspectKey} className="space-y-2">
              <h3 className="text-xl font-semibold">{aspect.title}</h3>
              <p className="text-gray-700">Nilai: {aspectScore.toFixed(2)}</p>
              {aspect.criteria.map((criterion) => (
                <div key={criterion.id} className="space-y-1">
                  <h4 className="text-lg font-medium">{criterion.name}</h4>
                  {criterion.indicators.map((indicator) => (
                    <div key={indicator.id} className="flex items-center justify-between">
                      <span>{indicator.text}</span>
                      <Badge variant="secondary">
                        {scoreOptions.find((option) => option.value === scores[indicator.id])?.label || "Belum Dinilai"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        })}

        {/* Overall Notes */}
        {overallNotes && (
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Catatan Keseluruhan</h3>
            <p className="text-gray-700">{overallNotes}</p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
        >
          <CheckCircle className="h-4 w-4" />
          <span>{isSubmitting ? "Menyimpan..." : "Submit Final"}</span>
        </Button>
      </CardContent>
    </Card>
  )

  if (showReview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <header className="bg-white shadow-sm border-b sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              <Button variant="ghost" onClick={() => setShowReview(false)} className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4" />
                <span>Kembali</span>
              </Button>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-8">{renderReview()}</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Button variant="ghost" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Kembali</span>
            </Button>

            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="px-3 py-1">
                Step {currentStep + 1} dari {aspects.length}
              </Badge>
              <div className="text-sm text-gray-600">Progress: {Math.round(progress)}%</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Evaluator and Employee Info */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Evaluator Info */}
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Penilai</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <strong>Nama:</strong> {evaluator.name}
                </div>
                <div>
                  <strong>NIP:</strong> {evaluator.nip}
                </div>
                <div>
                  <strong>Pangkat/Gol:</strong> {evaluator.rank}
                </div>
                <div>
                  <strong>Jabatan:</strong> {evaluator.position}
                </div>
                <div>
                  <strong>Unit Kerja:</strong> {evaluator.unit}
                </div>
              </CardContent>
            </Card>

            {/* Employee Info */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Yang Dinilai</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <strong>Nama:</strong> {employee.name}
                </div>
                <div>
                  <strong>Jabatan:</strong> {employee.position}
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
              </CardContent>
            </Card>
          </div>

          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Progress Penilaian</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-3" />
                <div className="flex justify-between text-xs text-gray-500">
                  {aspects.map((aspect, index) => (
                    <span key={aspect} className={index <= currentStep ? "text-blue-600 font-medium" : ""}>
                      {evaluationData[aspect as keyof typeof evaluationData].title}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-blue-600 flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <span className="text-lg font-bold text-blue-600">{currentStep + 1}</span>
                </div>
                <span>{aspectData.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {aspectData.criteria.map((criterion) => (
                <div key={criterion.id} className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 border-b-2 border-blue-200 pb-3">
                    {criterion.name}
                  </h3>

                  {criterion.indicators.map((indicator, index) => (
                    <div
                      key={indicator.id}
                      className="space-y-4 p-6 bg-gray-50 rounded-xl border-l-4 border-l-blue-400"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-1">
                          {index + 1}
                        </div>
                        <h4 className="font-medium text-gray-800 flex-1">{indicator.text}</h4>
                      </div>

                      <RadioGroup
                        value={scores[indicator.id] || ""}
                        onValueChange={(value) => handleScoreChange(indicator.id, value)}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4"
                      >
                        {scoreOptions.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-white transition-colors"
                          >
                            <RadioGroupItem value={option.value} id={`${indicator.id}-${option.value}`} />
                            <Label htmlFor={`${indicator.id}-${option.value}`} className="cursor-pointer flex-1">
                              <div className={`px-3 py-2 rounded-md text-center ${option.color}`}>
                                <div className="font-bold">{option.label}</div>
                                <div className="text-xs mt-1">{option.description}</div>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              ))}

              {/* Overall Notes - Show only on last step */}
              {currentStep === aspects.length - 1 && (
                <Card className="bg-yellow-50 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-800">Catatan Keseluruhan</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Berikan catatan keseluruhan untuk penilaian ini (opsional)..."
                      value={overallNotes}
                      onChange={(e) => setOverallNotes(e.target.value)}
                      className="min-h-[120px] bg-white"
                    />
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Sebelumnya</span>
                </Button>

                {currentStep < aspects.length - 1 ? (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <span>Selanjutnya</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700"
                  >
                    <span>Lihat Review</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
