"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Home, Building, Users, FileText, DollarSign, Bell, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Propiedades", href: "/dashboard/properties", icon: Building },
  { name: "Inquilinos", href: "/dashboard/tenants", icon: Users },
  { name: "Contratos", href: "/dashboard/contracts", icon: FileText },
  { name: "Pagos", href: "/dashboard/payments", icon: DollarSign },
  { name: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
  { name: "Alertas", href: "/dashboard/alerts", icon: Bell },
  { name: "Configuración", href: "/dashboard/settings", icon: Settings },
]

export default function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white border-r border-gray-200 px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-green-600">
            ALQUILA PERÚ
          </Link>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Button
                      asChild
                      variant="ghost"
                      className={cn(
                        "w-full justify-start",
                        pathname === item.href
                          ? "bg-green-50 text-green-700 hover:bg-green-50"
                          : "text-gray-700 hover:bg-gray-50",
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-3 h-5 w-5" />
                        {item.name}
                      </Link>
                    </Button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}
