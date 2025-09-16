"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { MessageCircle, Mail, Save, TestTube } from "lucide-react"
import { useState } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface AlertSettings {
  id: string
  owner_id: string
  payment_reminder_days: number
  contract_expiry_days: number
  whatsapp_enabled: boolean
  email_enabled: boolean
}

interface AlertsSettingsProps {
  settings: AlertSettings
}

export default function AlertsSettings({ settings }: AlertsSettingsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    payment_reminder_days: settings.payment_reminder_days,
    contract_expiry_days: settings.contract_expiry_days,
    whatsapp_enabled: settings.whatsapp_enabled,
    email_enabled: settings.email_enabled,
  })

  const handleSave = async () => {
    setIsLoading(true)

    const { error } = await supabase.from("alert_settings").update(formData).eq("id", settings.id)

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo guardar la configuración",
        variant: "destructive",
      })
    } else {
      toast({
        title: "Configuración guardada",
        description: "Los cambios se han guardado correctamente",
      })
      router.refresh()
    }

    setIsLoading(false)
  }

  const sendTestMessage = async () => {
    // This would integrate with a WhatsApp API service
    toast({
      title: "Mensaje de prueba",
      description: "Funcionalidad de prueba - integrar con API de WhatsApp",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-emerald-600" />
              Configuración de WhatsApp
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Alertas por WhatsApp</Label>
                <p className="text-sm text-gray-500">Enviar recordatorios automáticos</p>
              </div>
              <Switch
                checked={formData.whatsapp_enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, whatsapp_enabled: checked })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="payment-days">Recordatorio de pago (días antes)</Label>
              <Input
                id="payment-days"
                type="number"
                min="1"
                max="30"
                value={formData.payment_reminder_days}
                onChange={(e) =>
                  setFormData({ ...formData, payment_reminder_days: Number.parseInt(e.target.value) || 3 })
                }
              />
              <p className="text-xs text-gray-500">
                Enviar recordatorio {formData.payment_reminder_days} días antes del vencimiento
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract-days">Renovación de contrato (días antes)</Label>
              <Input
                id="contract-days"
                type="number"
                min="1"
                max="90"
                value={formData.contract_expiry_days}
                onChange={(e) =>
                  setFormData({ ...formData, contract_expiry_days: Number.parseInt(e.target.value) || 30 })
                }
              />
              <p className="text-xs text-gray-500">
                Enviar alerta {formData.contract_expiry_days} días antes del vencimiento del contrato
              </p>
            </div>

            <Button
              onClick={sendTestMessage}
              variant="outline"
              className="w-full bg-transparent"
              disabled={!formData.whatsapp_enabled}
            >
              <TestTube className="mr-2 h-4 w-4" />
              Enviar Mensaje de Prueba
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Mail className="mr-2 h-5 w-5 text-blue-600" />
              Configuración de Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Alertas por Email</Label>
                <p className="text-sm text-gray-500">Recibir copias por correo</p>
              </div>
              <Switch
                checked={formData.email_enabled}
                onCheckedChange={(checked) => setFormData({ ...formData, email_enabled: checked })}
              />
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Las alertas por email te permiten tener un respaldo de todas las notificaciones
                enviadas a tus inquilinos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mensaje Personalizado</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="custom-message">Mensaje adicional (opcional)</Label>
            <Textarea
              id="custom-message"
              placeholder="Agrega un mensaje personalizado que se incluirá en todas las alertas..."
              rows={3}
            />
            <p className="text-xs text-gray-500">Este mensaje se agregará al final de todas las alertas automáticas</p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isLoading} className="bg-emerald-600 hover:bg-emerald-700">
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? "Guardando..." : "Guardar Configuración"}
        </Button>
      </div>
    </div>
  )
}
