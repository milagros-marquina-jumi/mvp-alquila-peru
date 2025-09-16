import type React from "react"
import DashboardSidebar from "@/components/dashboard-sidebar"
import DashboardHeader from "@/components/dashboard-header"
import { mockUser } from "@/lib/mock-data"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = { id: mockUser.id, email: mockUser.email, user_metadata: { full_name: mockUser.full_name } }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="lg:pl-64">
        <DashboardHeader user={user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
