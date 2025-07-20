"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Users, UserPlus, Edit, Trash2, Search } from "lucide-react"

// Dummy data
const employees = [
  { id: 1, name: "Ahmad Rizki", unit: "IT Support", position: "Technical Support" },
  { id: 2, name: "Siti Nurhaliza", unit: "Human Resources", position: "HR Assistant" },
  { id: 3, name: "Budi Santoso", unit: "Finance", position: "Accounting Staff" },
  { id: 4, name: "Maya Sari", unit: "Marketing", position: "Marketing Assistant" },
]

const evaluators = [
  { id: 1, name: "Dr. Andi Wijaya", position: "Kepala Biro SDM", type: "kepala-biro" },
  { id: 2, name: "Ir. Sari Dewi", position: "Kepala Bagian IT", type: "kepala-bagian" },
  { id: 3, name: "Ahmad Fauzi", position: "Senior Staff", type: "teman-setingkat" },
  { id: 4, name: "Linda Sari", position: "Senior Staff", type: "teman-setingkat" },
]

const assignments = [
  { id: 1, employeeId: 1, evaluatorId: 1, evaluatorType: "kepala-biro", status: "active" },
  { id: 2, employeeId: 1, evaluatorId: 2, evaluatorType: "kepala-bagian", status: "active" },
  { id: 3, employeeId: 1, evaluatorId: 3, evaluatorType: "teman-setingkat", status: "active" },
  { id: 4, employeeId: 2, evaluatorId: 1, evaluatorType: "kepala-biro", status: "active" },
  { id: 5, employeeId: 2, evaluatorId: 4, evaluatorType: "teman-setingkat", status: "active" },
]

export default function EvaluatorAssignment() {
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null)

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.unit.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getEmployeeAssignments = (employeeId: number) => {
    return assignments
      .filter((a) => a.employeeId === employeeId)
      .map((assignment) => {
        const evaluator = evaluators.find((e) => e.id === assignment.evaluatorId)
        return { ...assignment, evaluator }
      })
  }

  const getEvaluatorTypeColor = (type: string) => {
    switch (type) {
      case "kepala-biro":
        return "bg-blue-100 text-blue-800"
      case "kepala-bagian":
        return "bg-green-100 text-green-800"
      case "teman-setingkat":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getEvaluatorTypeLabel = (type: string) => {
    switch (type) {
      case "kepala-biro":
        return "Kepala Biro"
      case "kepala-bagian":
        return "Kepala Bagian"
      case "teman-setingkat":
        return "Teman Setingkat"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Penugasan Penilai</CardTitle>
          <CardDescription>Kelola penugasan penilai untuk setiap pegawai outsourcing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Cari pegawai..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            {filteredEmployees.map((employee) => {
              const employeeAssignments = getEmployeeAssignments(employee.id)

              return (
                <Card key={employee.id} className="border-l-4 border-l-blue-500">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <CardDescription>
                          {employee.position} • {employee.unit}
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedEmployee(employee.id)
                          setIsDialogOpen(true)
                        }}
                        className="flex items-center space-x-2"
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>Atur Penilai</span>
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {employeeAssignments.length > 0 ? (
                      <div className="space-y-3">
                        <h4 className="font-medium text-sm text-gray-700">Penilai yang Ditugaskan:</h4>
                        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                          {employeeAssignments.map((assignment) => (
                            <div
                              key={assignment.id}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                            >
                              <div>
                                <p className="font-medium text-sm">{assignment.evaluator?.name}</p>
                                <Badge className={`text-xs mt-1 ${getEvaluatorTypeColor(assignment.evaluatorType)}`}>
                                  {getEvaluatorTypeLabel(assignment.evaluatorType)}
                                </Badge>
                              </div>
                              <div className="flex space-x-1">
                                <Button size="sm" variant="ghost">
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <Users className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                        <p>Belum ada penilai yang ditugaskan</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Assignment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Atur Penilai</DialogTitle>
            <DialogDescription>
              Pilih penilai untuk pegawai {employees.find((e) => e.id === selectedEmployee)?.name}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-3">
              <Label>Kepala Biro</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kepala Biro" />
                </SelectTrigger>
                <SelectContent>
                  {evaluators
                    .filter((e) => e.type === "kepala-biro")
                    .map((evaluator) => (
                      <SelectItem key={evaluator.id} value={evaluator.id.toString()}>
                        {evaluator.name} - {evaluator.position}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Kepala Bagian</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Kepala Bagian" />
                </SelectTrigger>
                <SelectContent>
                  {evaluators
                    .filter((e) => e.type === "kepala-bagian")
                    .map((evaluator) => (
                      <SelectItem key={evaluator.id} value={evaluator.id.toString()}>
                        {evaluator.name} - {evaluator.position}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Teman Setingkat</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Teman Setingkat" />
                </SelectTrigger>
                <SelectContent>
                  {evaluators
                    .filter((e) => e.type === "teman-setingkat")
                    .map((evaluator) => (
                      <SelectItem key={evaluator.id} value={evaluator.id.toString()}>
                        {evaluator.name} - {evaluator.position}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={() => setIsDialogOpen(false)}>Simpan Penugasan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
