import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

export default async function RecentActivity() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Get recent payments
  const { data: recentPayments } = await supabase
    .from("payments")
    .select(`
      *,
      rental_contracts (
        properties (
          title
        )
      )
    `)
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actividad Reciente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentPayments && recentPayments.length > 0 ? (
            recentPayments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">
                    Pago - {payment.rental_contracts?.properties?.title || "Propiedad"}
                  </p>
                  <p className="text-xs text-gray-500">
                    Vence: {new Date(payment.due_date).toLocaleDateString("es-PE")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">S/ {payment.amount.toLocaleString()}</p>
                  <Badge
                    variant={
                      payment.status === "paid" ? "default" : payment.status === "pending" ? "secondary" : "destructive"
                    }
                    className="text-xs"
                  >
                    {payment.status === "paid" ? "Pagado" : payment.status === "pending" ? "Pendiente" : "Vencido"}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No hay actividad reciente</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
