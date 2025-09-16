"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Eye, Edit, Trash2, MoreHorizontal, FileDown, Calendar, DollarSign } from "lucide-react"
import { useState } from "react"

interface Contract {
  id: string
  property_id: string
  tenant_id: string
  start_date: string
  end_date: string
  monthly_rent: number
  deposit: number
  contract_status: "active" | "expired" | "pending" | "terminated"
  contract_type: string
  payment_day: number
  late_fee: number
  notes: string
  created_at: string
  properties: {
    title: string
    address: string
    district: string
  }
  tenants: {
    full_name: string
    email: string
    phone: string
  }
}

interface ContractsTableProps {
  contracts: Contract[]
}

export default function ContractsTable({ contracts }: ContractsTableProps) {
  const [filter, setFilter] = useState<string>("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activo</Badge>
      case "expired":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Vencido</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendiente</Badge>
      case "terminated":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Terminado</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getContractType = (type: string) => {
    switch (type) {
      case "annual":
        return "Anual"
      case "short_term":
        return "Corto plazo"
      case "monthly":
        return "Mensual"
      default:
        return type
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("es-PE", {
      style: "currency",
      currency: "PEN",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-PE", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const isContractExpiringSoon = (endDate: string) => {
    const today = new Date()
    const contractEnd = new Date(endDate)
    const diffTime = contractEnd.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays > 0
  }

  const filteredContracts = contracts.filter(contract => {
    if (filter === "all") return true
    return contract.contract_status === filter
  })

  if (contracts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileDown className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hay contratos</h3>
          <p className="text-gray-500 text-center">
            Comienza creando tu primer contrato de alquiler.
          </p>
          <Button className="mt-4">
            Crear Primer Contrato
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filter buttons */}
      <div className="flex space-x-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Todos ({contracts.length})
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("active")}
        >
          Activos ({contracts.filter(c => c.contract_status === "active").length})
        </Button>
        <Button
          variant={filter === "expired" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("expired")}
        >
          Vencidos ({contracts.filter(c => c.contract_status === "expired").length})
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("pending")}
        >
          Pendientes ({contracts.filter(c => c.contract_status === "pending").length})
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Propiedad</TableHead>
              <TableHead>Inquilino</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Renta Mensual</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContracts.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{contract.properties.title}</div>
                    <div className="text-sm text-gray-500">
                      {contract.properties.district}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{contract.tenants.full_name}</div>
                    <div className="text-sm text-gray-500">
                      {contract.tenants.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatDate(contract.start_date)}</div>
                    <div className="text-gray-500">
                      hasta {formatDate(contract.end_date)}
                    </div>
                    {isContractExpiringSoon(contract.end_date) && (
                      <Badge variant="outline" className="mt-1 text-yellow-600 border-yellow-600">
                        <Calendar className="h-3 w-3 mr-1" />
                        Vence pronto
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">
                    {formatCurrency(contract.monthly_rent)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Día {contract.payment_day}
                  </div>
                </TableCell>
                <TableCell>
                  {getStatusBadge(contract.contract_status)}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {getContractType(contract.contract_type)}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileDown className="mr-2 h-4 w-4" />
                        Descargar PDF
                      </DropdownMenuItem>
                      {contract.contract_status === "active" && (
                        <DropdownMenuItem>
                          <DollarSign className="mr-2 h-4 w-4" />
                          Registrar pago
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No se encontraron contratos con el filtro seleccionado.
          </p>
        </div>
      )}
    </div>
  )
}