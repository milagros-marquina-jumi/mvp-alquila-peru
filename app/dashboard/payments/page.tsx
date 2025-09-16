import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import PaymentsTable from "@/components/payments-table"
import { mockPayments } from "@/lib/mock-data"

export default async function PaymentsPage() {
  const payments = mockPayments

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Pagos</h1>
          <p className="text-gray-600 mt-2">Controla todos los pagos de tus propiedades</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/payments/new">
            <Plus className="mr-2 h-4 w-4" />
            Registrar Pago
          </Link>
        </Button>
      </div>

      <PaymentsTable payments={payments} />
    </div>
  )
}
