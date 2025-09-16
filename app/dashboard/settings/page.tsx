"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Bell,
  MessageSquare,
  Mail,
  Calendar,
  Settings2,
  Plus,
  X,
  AlertTriangle,
  User,
  Camera,
  CheckCircle,
} from "lucide-react"

export default function SettingsPage() {
  const [selectedPaymentDays, setSelectedPaymentDays] = useState<string[]>(["3"])
  const [selectedOverdueDays, setSelectedOverdueDays] = useState<string[]>(["1"])
  const [selectedRenewalDays, setSelectedRenewalDays] = useState<string[]>(["30"])
  const [paymentTimes, setPaymentTimes] = useState<string[]>(["09:00"])
  const [overdueTimes, setOverdueTimes] = useState<string[]>(["10:00"])
  const [renewalTimes, setRenewalTimes] = useState<string[]>(["10:00"])
  const [profileImage, setProfileImage] = useState<string>("")

  const paymentDayOptions = [
    { value: "0", label: "Mismo día del vencimiento" }, // Agregada opción para el mismo día
    { value: "1", label: "1 día antes" },
    { value: "2", label: "2 días antes" },
    { value: "3", label: "3 días antes" },
    { value: "4", label: "4 días antes" },
    { value: "5", label: "5 días antes" },
    { value: "7", label: "1 semana antes" },
    { value: "daily", label: "Todos los días hasta el vencimiento" },
  ]

  const overdueDayOptions = [
    { value: "1", label: "1 día después del vencimiento" },
    { value: "2", label: "2 días después del vencimiento" },
    { value: "3", label: "3 días después del vencimiento" },
    { value: "5", label: "5 días después del vencimiento" },
    { value: "7", label: "1 semana después del vencimiento" },
    { value: "15", label: "15 días después del vencimiento" },
    { value: "weekly", label: "Cada semana hasta el pago" },
  ]

  const renewalDayOptions = [
    { value: "15", label: "15 días antes" },
    { value: "30", label: "30 días antes" },
    { value: "45", label: "45 días antes" },
    { value: "60", label: "60 días antes" },
    { value: "90", label: "3 meses antes" },
  ]

  const handlePaymentDayChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedPaymentDays([...selectedPaymentDays, value])
    } else {
      setSelectedPaymentDays(selectedPaymentDays.filter((day) => day !== value))
    }
  }

  const handleOverdueDayChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedOverdueDays([...selectedOverdueDays, value])
    } else {
      setSelectedOverdueDays(selectedOverdueDays.filter((day) => day !== value))
    }
  }

  const handleRenewalDayChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedRenewalDays([...selectedRenewalDays, value])
    } else {
      setSelectedRenewalDays(selectedRenewalDays.filter((day) => day !== value))
    }
  }

  const addPaymentTime = () => {
    if (paymentTimes.length < 3) {
      setPaymentTimes([...paymentTimes, "09:00"])
    }
  }

  const removePaymentTime = (index: number) => {
    if (paymentTimes.length > 1) {
      setPaymentTimes(paymentTimes.filter((_, i) => i !== index))
    }
  }

  const updatePaymentTime = (index: number, time: string) => {
    const newTimes = [...paymentTimes]
    newTimes[index] = time
    setPaymentTimes(newTimes)
  }

  const addOverdueTime = () => {
    if (overdueTimes.length < 3) {
      setOverdueTimes([...overdueTimes, "10:00"])
    }
  }

  const removeOverdueTime = (index: number) => {
    if (overdueTimes.length > 1) {
      setOverdueTimes(overdueTimes.filter((_, i) => i !== index))
    }
  }

  const updateOverdueTime = (index: number, time: string) => {
    const newTimes = [...overdueTimes]
    newTimes[index] = time
    setOverdueTimes(newTimes)
  }

  const addRenewalTime = () => {
    if (renewalTimes.length < 3) {
      setRenewalTimes([...renewalTimes, "10:00"])
    }
  }

  const removeRenewalTime = (index: number) => {
    if (renewalTimes.length > 1) {
      setRenewalTimes(renewalTimes.filter((_, i) => i !== index))
    }
  }

  const updateRenewalTime = (index: number, time: string) => {
    const newTimes = [...renewalTimes]
    newTimes[index] = time
    setRenewalTimes(newTimes)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-600 mt-1">Personaliza las alertas y notificaciones automáticas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Alertas de Pago
              </CardTitle>
              <CardDescription>Configura recordatorios automáticos para tus inquilinos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Activar alertas de pago</Label>
                  <p className="text-sm text-gray-500">Envía recordatorios automáticos antes de la fecha de pago</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>Días antes del vencimiento</Label>
                  <div className="space-y-2 p-3 border rounded-lg bg-gray-50">
                    {paymentDayOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`payment-${option.value}`}
                          checked={selectedPaymentDays.includes(option.value)}
                          onCheckedChange={(checked) => handlePaymentDayChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={`payment-${option.value}`} className="text-sm font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedPaymentDays.map((day) => {
                      const option = paymentDayOptions.find((opt) => opt.value === day)
                      return (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {option?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Horarios de envío</Label>
                    <span className="text-xs text-gray-500">Hasta 3 por día</span>
                  </div>
                  <div className="space-y-2">
                    {paymentTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updatePaymentTime(index, e.target.value)}
                          className="flex-1"
                        />
                        {paymentTimes.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePaymentTime(index)}
                            className="p-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {paymentTimes.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addPaymentTime}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar horario
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {paymentTimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentMessage">Mensaje de recordatorio de pago</Label>
                <Textarea
                  id="paymentMessage"
                  defaultValue="Hola {nombre}, te recordamos que el pago de tu alquiler de S/ {monto} vence el {fecha}. Por favor realiza el pago a tiempo. ¡Gracias!"
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  Variables disponibles: {"{nombre}"}, {"{monto}"}, {"{fecha}"}, {"{propiedad}"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Alertas por Retraso en el Pago
              </CardTitle>
              <CardDescription>Configura recordatorios para pagos vencidos</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Activar alertas por retraso</Label>
                  <p className="text-sm text-gray-500">Envía recordatorios después de la fecha de vencimiento</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>Días después del vencimiento</Label>
                  <div className="space-y-2 p-3 border rounded-lg bg-red-50">
                    {overdueDayOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`overdue-${option.value}`}
                          checked={selectedOverdueDays.includes(option.value)}
                          onCheckedChange={(checked) => handleOverdueDayChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={`overdue-${option.value}`} className="text-sm font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedOverdueDays.map((day) => {
                      const option = overdueDayOptions.find((opt) => opt.value === day)
                      return (
                        <Badge key={day} variant="destructive" className="text-xs">
                          {option?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Horarios de envío</Label>
                    <span className="text-xs text-gray-500">Hasta 3 por día</span>
                  </div>
                  <div className="space-y-2">
                    {overdueTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updateOverdueTime(index, e.target.value)}
                          className="flex-1"
                        />
                        {overdueTimes.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeOverdueTime(index)}
                            className="p-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {overdueTimes.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOverdueTime}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar horario
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {overdueTimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="overdueMessage">Mensaje de pago vencido</Label>
                <Textarea
                  id="overdueMessage"
                  defaultValue="Hola {nombre}, tu pago de alquiler de S/ {monto} venció el {fecha}. Por favor ponte en contacto para regularizar tu situación. Es importante mantener los pagos al día."
                  rows={3}
                />
                <p className="text-xs text-gray-500">
                  Variables disponibles: {"{nombre}"}, {"{monto}"}, {"{fecha}"}, {"{propiedad}"}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Alertas de Renovación
              </CardTitle>
              <CardDescription>Notifica sobre contratos próximos a vencer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Activar alertas de renovación</Label>
                  <p className="text-sm text-gray-500">Envía notificaciones antes del vencimiento del contrato</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <Label>Días antes del vencimiento</Label>
                  <div className="space-y-2 p-3 border rounded-lg bg-gray-50">
                    {renewalDayOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <Checkbox
                          id={`renewal-${option.value}`}
                          checked={selectedRenewalDays.includes(option.value)}
                          onCheckedChange={(checked) => handleRenewalDayChange(option.value, checked as boolean)}
                        />
                        <Label htmlFor={`renewal-${option.value}`} className="text-sm font-normal cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {selectedRenewalDays.map((day) => {
                      const option = renewalDayOptions.find((opt) => opt.value === day)
                      return (
                        <Badge key={day} variant="secondary" className="text-xs">
                          {option?.label}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Horarios de envío</Label>
                    <span className="text-xs text-gray-500">Hasta 3 por día</span>
                  </div>
                  <div className="space-y-2">
                    {renewalTimes.map((time, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="time"
                          value={time}
                          onChange={(e) => updateRenewalTime(index, e.target.value)}
                          className="flex-1"
                        />
                        {renewalTimes.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeRenewalTime(index)}
                            className="p-2"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {renewalTimes.length < 3 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addRenewalTime}
                        className="w-full bg-transparent"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Agregar horario
                      </Button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {renewalTimes.map((time, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {time}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="renewalMessage">Mensaje de renovación</Label>
                <Textarea
                  id="renewalMessage"
                  defaultValue="Hola {nombre}, tu contrato de alquiler en {propiedad} vence el {fecha}. ¿Te interesa renovar? Contáctanos para coordinar los detalles."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Canales de Notificación
              </CardTitle>
              <CardDescription>Selecciona cómo enviar las notificaciones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                  <div>
                    <Label className="text-base">WhatsApp</Label>
                    <p className="text-sm text-gray-500">Enviar mensajes por WhatsApp</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <Label className="text-base">Email</Label>
                    <p className="text-sm text-gray-500">Enviar notificaciones por correo</p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Alertas</CardTitle>
              <CardDescription>Últimas notificaciones enviadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-yellow-800">Recordatorio de pago</p>
                    <p className="text-xs text-gray-600">María González - Departamento en San Isidro</p>
                    <p className="text-xs text-gray-500">Hace 2 horas • S/ 2,500</p>
                    <Badge variant="outline" className="mt-1 bg-yellow-100 text-yellow-700 border-yellow-300">
                      Enviado
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 border-l-4 border-red-500 rounded-lg animate-pulse">
                  <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 animate-bounce" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-red-800">Pago vencido</p>
                    <p className="text-xs text-gray-600">Juan Pérez - Cuarto en Miraflores</p>
                    <p className="text-xs text-gray-500">Hace 1 día • S/ 1,200 • 1 día de retraso</p>
                    <Badge variant="destructive" className="mt-1 animate-pulse">
                      Enviado
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-800">Renovación de contrato</p>
                    <p className="text-xs text-gray-600">Carlos Ruiz - Casa en La Molina</p>
                    <p className="text-xs text-gray-500">Hace 1 día • Vence en 30 días</p>
                    <Badge variant="outline" className="mt-1 bg-blue-100 text-blue-700 border-blue-300">
                      Enviado
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-green-50 border-l-4 border-green-400 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-800">Pago realizado</p>
                    <p className="text-xs text-gray-600">Ana Pérez - Oficina en San Borja</p>
                    <p className="text-xs text-gray-500">Hace 3 días • S/ 3,800 • Pagado 2 días antes</p>
                    <Badge variant="outline" className="mt-1 bg-green-100 text-green-700 border-green-300">
                      Completado
                    </Badge>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                  <MessageSquare className="h-4 w-4 text-yellow-600 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-yellow-800">Recordatorio de pago</p>
                    <p className="text-xs text-gray-600">Luis Torres - Cochera en Surco</p>
                    <p className="text-xs text-gray-500">Hace 5 días • S/ 300 • 3 días antes</p>
                    <Badge variant="outline" className="mt-1 bg-yellow-100 text-yellow-700 border-yellow-300">
                      Enviado
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                Configuración General
              </CardTitle>
              <CardDescription>Personaliza tu perfil público</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Foto de perfil</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profileImage || "/placeholder.svg"} alt="Foto de perfil" />
                    <AvatarFallback className="bg-emerald-100 text-emerald-700">
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
                      <Camera className="h-4 w-4" />
                      Cambiar foto
                    </Button>
                    <p className="text-xs text-gray-500">JPG, PNG hasta 2MB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="publicUsername">Nombre de usuario público</Label>
                <Input id="publicUsername" defaultValue="CarlosM_Propiedades" placeholder="Ej: CarlosM_Propiedades" />
                <p className="text-xs text-gray-500">
                  Este nombre aparecerá en lugar de tu nombre completo en los anuncios públicos
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerName">Nombre completo (privado)</Label>
                <Input id="ownerName" defaultValue="Carlos Mendoza" />
                <p className="text-xs text-gray-500">Solo visible para ti y en contratos</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerPhone">Teléfono de contacto</Label>
                <Input id="ownerPhone" defaultValue="+51 987 654 321" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ownerEmail">Email de contacto</Label>
                <Input id="ownerEmail" type="email" defaultValue="carlos.mendoza@email.com" />
              </div>
            </CardContent>
          </Card>

          <Button className="w-full">Guardar Configuración</Button>
        </div>
      </div>
    </div>
  )
}
