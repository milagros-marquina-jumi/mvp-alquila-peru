"use client"

import ContractsTable from "@/components/contracts-table"
import ContractFormModal from "@/components/contract-form-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus, AlertCircle, CheckCircle, Clock } from "lucide-react"
import { mockContracts } from "@/lib/mock-data"
import { useState } from "react"

export default function ContractsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const activeContracts = mockContracts.filter(contract => contract.contract_status === "active")
  const expiredContracts = mockContracts.filter(contract => contract.contract_status === "expired")
  const pendingContracts = mockContracts.filter(contract => contract.contract_status === "pending")

  const handleCreateContract = (data: any) => {
    console.log("Creating contract:", data)
    // Here you would typically save to your backend
    // For now, we'll just log the data
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gestión de Contratos</h1>
            <p className="mt-1 text-sm text-gray-500">
              Administra todos los contratos de alquiler de tus propiedades
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Contratos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockContracts.length}</div>
            <p className="text-xs text-muted-foreground">
              Todos los contratos registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Activos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeContracts.length}</div>
            <p className="text-xs text-muted-foreground">
              Contratos vigentes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Vencidos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{expiredContracts.length}</div>
            <p className="text-xs text-muted-foreground">
              Requieren renovación
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Por Vencer</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">0</div>
            <p className="text-xs text-muted-foreground">
              Próximos 30 días
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Contracts Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Lista de Contratos</CardTitle>
            <CardDescription>
              Gestiona todos los contratos de alquiler de tus propiedades
            </CardDescription>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Contrato
          </Button>
        </CardHeader>
        <CardContent>
          <ContractsTable contracts={mockContracts} />
        </CardContent>
      </Card>

      {/* Contract Form Modal */}
      <ContractFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateContract}
        mode="create"
      />
    </div>
  )
}