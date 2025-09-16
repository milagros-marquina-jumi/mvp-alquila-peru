"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu, ArrowLeft, Home, User, Building2, Search, Settings, FileText, Bell } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface MobileNavigationProps {
  userType?: "tenant" | "owner"
  currentPage?: string
  showBackButton?: boolean
  backUrl?: string
}

export default function MobileNavigation({
  userType,
  currentPage = "",
  showBackButton = true,
  backUrl,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleBack = () => {
    if (backUrl) {
      router.push(backUrl)
    } else {
      router.back()
    }
  }

  const tenantMenuItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Search, label: "Buscar Propiedades", href: "/#search" },
    { icon: User, label: "Mi Perfil", href: "/profile" },
    { icon: FileText, label: "Mis Documentos", href: "/documents" },
    { icon: Bell, label: "Notificaciones", href: "/notifications" },
  ]

  const ownerMenuItems = [
    { icon: Home, label: "Inicio", href: "/" },
    { icon: Building2, label: "Dashboard", href: "/dashboard" },
    { icon: Building2, label: "Mis Propiedades", href: "/dashboard/properties" },
    { icon: User, label: "Inquilinos", href: "/dashboard/tenants" },
    { icon: FileText, label: "Reportes", href: "/dashboard/reports" },
    { icon: Bell, label: "Alertas", href: "/dashboard/alerts" },
    { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
  ]

  const menuItems = userType === "owner" ? ownerMenuItems : tenantMenuItems

  return (
    <div className="flex items-center justify-between w-full">
      {showBackButton && (
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Volver</span>
        </Button>
      )}

      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-gray-900">{currentPage}</h1>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2 hover:bg-gray-100 relative">
            <Menu className="w-6 h-6 text-gray-600" />
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg opacity-20 animate-pulse"></div>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 bg-white">
          <SheetHeader className="border-b pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-2 rounded-lg">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <SheetTitle className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ALQUILA PERÚ
                </SheetTitle>
                <p className="text-sm text-gray-500">
                  {userType === "owner" ? "Panel de Propietario" : "Panel de Inquilino"}
                </p>
              </div>
            </div>
          </SheetHeader>

          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors group"
              >
                <item.icon className="w-5 h-5 text-gray-500 group-hover:text-emerald-600" />
                <span className="font-medium text-gray-700 group-hover:text-gray-900">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
              <p className="text-sm text-gray-600 text-center">
                {userType === "owner" ? "¡Gestiona tus propiedades de forma eficiente!" : "¡Encuentra tu hogar ideal!"}
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
