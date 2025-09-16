import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

export default function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button asChild className="w-full justify-start bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Propiedad
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
          <Link href="/dashboard/tenants/new">
            <Users className="mr-2 h-4 w-4" />
            Nuevo Inquilino
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
          <Link href="/dashboard/contracts/new">
            <FileText className="mr-2 h-4 w-4" />
            Nuevo Contrato
          </Link>
        </Button>

        <Button asChild variant="outline" className="w-full justify-start bg-transparent">
          <Link href="/dashboard/payments">
            <DollarSign className="mr-2 h-4 w-4" />
            Registrar Pago
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
