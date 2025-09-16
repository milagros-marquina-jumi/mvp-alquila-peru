import DashboardStats from "@/components/dashboard-stats"
import RecentActivity from "@/components/recent-activity"
import QuickActions from "@/components/quick-actions"
import { mockStats } from "@/lib/mock-data"

export default async function DashboardPage() {
  const stats = mockStats

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Bienvenido de vuelta, Carlos Mendoza</p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  )
}
