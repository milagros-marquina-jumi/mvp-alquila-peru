import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import PropertiesManagement from "@/components/properties-management"
import { mockProperties } from "@/lib/mock-data"

export default async function PropertiesPage() {
  const properties = mockProperties

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Propiedades</h1>
          <p className="text-gray-600 mt-2">Gestiona todas tus propiedades y anuncios</p>
        </div>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/dashboard/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Propiedad
          </Link>
        </Button>
      </div>

      <PropertiesManagement properties={properties} />
    </div>
  )
}
