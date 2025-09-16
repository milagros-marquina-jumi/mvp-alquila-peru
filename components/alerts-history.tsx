import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Clock, CheckCircle, XCircle } from "lucide-react"

interface Notification {
  id: string
  notification_type: string
  title: string
  message: string
  scheduled_date: string
  sent_date: string | null
  status: string
  whatsapp_sent: boolean
  rental_contracts?: {
    properties?: {
      title: string
    }
    tenants?: {
      full_name: string
      whatsapp_number: string
    }
  }
}

interface AlertsHistoryProps {
  notifications: Notification[]
}

export default function AlertsHistory({ notifications }: AlertsHistoryProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <Clock className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-800"
      case "failed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "sent":
        return "Enviado"
      case "failed":
        return "Fallido"
      default:
        return "Pendiente"
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "payment_reminder":
        return "Recordatorio de Pago"
      case "contract_expiry":
        return "Renovación de Contrato"
      case "maintenance":
        return "Mantenimiento"
      default:
        return "Personalizado"
    }
  }

  if (notifications.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-12">
          <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No hay alertas en el historial</p>
          <p className="text-gray-400">Las alertas enviadas aparecerán aquí</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getStatusIcon(notification.status)}
                <div>
                  <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                  <p className="text-sm text-gray-500">
                    {getTypeLabel(notification.notification_type)} •{" "}
                    {notification.rental_contracts?.properties?.title || "Propiedad"}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(notification.status)}>{getStatusLabel(notification.status)}</Badge>
                {notification.whatsapp_sent && (
                  <div className="flex items-center mt-1 text-xs text-green-600">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    WhatsApp
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700 whitespace-pre-wrap">{notification.message}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <div>
                <strong>Para:</strong> {notification.rental_contracts?.tenants?.full_name || "Inquilino"}{" "}
                {notification.rental_contracts?.tenants?.whatsapp_number && (
                  <span>({notification.rental_contracts.tenants.whatsapp_number})</span>
                )}
              </div>
              <div>
                <strong>Programado:</strong> {new Date(notification.scheduled_date).toLocaleString("es-PE")}
                {notification.sent_date && (
                  <>
                    {" • "}
                    <strong>Enviado:</strong> {new Date(notification.sent_date).toLocaleString("es-PE")}
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
