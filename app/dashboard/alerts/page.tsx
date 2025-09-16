import AlertsSettings from "@/components/alerts-settings"
import AlertsHistory from "@/components/alerts-history"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockNotifications } from "@/lib/mock-data"

export default async function AlertsPage() {
  const alertSettings = {
    id: "settings-1",
    owner_id: "user-123",
    payment_reminder_days: 3,
    contract_expiry_days: 30,
    whatsapp_enabled: true,
    email_enabled: true,
  }

  const notifications = mockNotifications

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Sistema de Alertas</h1>
        <p className="text-gray-600 mt-2">Configura y gestiona las alertas automáticas por WhatsApp</p>
      </div>

      <Tabs defaultValue="settings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
        </TabsList>

        <TabsContent value="settings">
          <AlertsSettings settings={alertSettings} />
        </TabsContent>

        <TabsContent value="history">
          <AlertsHistory notifications={notifications} />
        </TabsContent>

        <TabsContent value="templates">
          <MessageTemplates />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MessageTemplates() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-3">Recordatorio de Pago</h3>
          <div className="bg-gray-50 p-4 rounded-lg text-sm">
            <p className="mb-2">
              <strong>Hola [NOMBRE_INQUILINO],</strong>
            </p>
            <p className="mb-2">
              Te recordamos que el pago de tu alquiler de la propiedad <strong>[PROPIEDAD]</strong> vence el{" "}
              <strong>[FECHA_VENCIMIENTO]</strong>.
            </p>
            <p className="mb-2">
              Monto: <strong>S/ [MONTO]</strong>
            </p>
            <p>Por favor, realiza el pago a tiempo para evitar inconvenientes.</p>
            <p className="mt-2">
              <em>
                Saludos,
                <br />
                [NOMBRE_PROPIETARIO]
              </em>
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="font-semibold text-lg mb-3">Renovación de Contrato</h3>
          <div className="bg-gray-50 p-4 rounded-lg text-sm">
            <p className="mb-2">
              <strong>Hola [NOMBRE_INQUILINO],</strong>
            </p>
            <p className="mb-2">
              Tu contrato de alquiler de la propiedad <strong>[PROPIEDAD]</strong> vence el{" "}
              <strong>[FECHA_VENCIMIENTO]</strong>.
            </p>
            <p className="mb-2">Si deseas renovar el contrato, por favor contáctame para coordinar los detalles.</p>
            <p>
              <em>
                Saludos,
                <br />
                [NOMBRE_PROPIETARIO]
              </em>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
