"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, Settings, Eye, Home, Bell } from "lucide-react"
import Link from "next/link"
import { signOut } from "@/lib/actions"

interface DashboardHeaderProps {
  user: {
    email?: string
    user_metadata?: {
      full_name?: string
    }
  }
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const notifications = [
    { id: 1, type: "payment_due", message: "Pago vencido - Depto San Isidro", time: "2 horas", urgent: true },
    { id: 2, type: "payment_reminder", message: "Recordatorio pago - Casa La Molina", time: "1 día", urgent: false },
    {
      id: 3,
      type: "contract_renewal",
      message: "Renovación contrato - Oficina San Borja",
      time: "3 días",
      urgent: false,
    },
  ]

  const urgentCount = notifications.filter((n) => n.urgent).length

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <Link href="/" className="flex items-center gap-x-3 hover:opacity-80 transition-opacity">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl shadow-lg">
            <Home className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              ALQUILA PERÚ
            </h1>
            <span className="text-xs text-gray-500 -mt-1">Panel de Propietario</span>
          </div>
        </Link>

        <div className="flex flex-1"></div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                {urgentCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs animate-pulse">
                    {urgentCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel>Notificaciones de Pagos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3">
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-sm ${notification.urgent ? "text-red-600 font-medium" : "text-gray-900"}`}>
                      {notification.message}
                    </span>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  {notification.urgent && <Badge className="mt-1 bg-red-100 text-red-800 text-xs">Urgente</Badge>}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/notifications" className="text-center w-full">
                  Ver todas las notificaciones
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button asChild variant="outline" size="sm">
            <Link href="/" target="_blank">
              <Eye className="h-4 w-4 mr-2" />
              Ver Marketplace
            </Link>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-emerald-600" />
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || "Usuario"}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action={signOut}>
                  <button type="submit" className="flex w-full items-center">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
