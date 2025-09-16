"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MessageCircle, Shield, FileText, MapPin, Briefcase, CreditCard, DollarSign } from "lucide-react"

interface IdentityValidationModalProps {
  isOpen: boolean
  onClose: () => void
  property: {
    title: string
    users: {
      full_name: string
      whatsapp_number: string
    }
  }
}

export default function IdentityValidationModal({ isOpen, onClose, property }: IdentityValidationModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    dni: "",
    currentAddress: "",
    workplace: "",
    monthlyIncome: "",
    hasInfocorp: "",
    additionalInfo: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message with validation data
    const message = `Hola ${property.users.full_name}, estoy interesado en la propiedad: ${property.title}

📋 DATOS DE VALIDACIÓN:
👤 Nombre completo: ${formData.fullName}
🆔 DNI: ${formData.dni}
📍 Dirección actual: ${formData.currentAddress}
💼 Lugar de trabajo: ${formData.workplace}
💰 Ingreso mensual: S/ ${formData.monthlyIncome}
📊 Infocorp: ${formData.hasInfocorp}

${formData.additionalInfo ? `📝 Información adicional: ${formData.additionalInfo}` : ""}

Quedo atento a su respuesta. Gracias.`

    const whatsappUrl = `https://wa.me/51${property.users.whatsapp_number}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <Shield className="w-5 h-5" />
            Validación de Identidad
          </DialogTitle>
          <DialogDescription>
            El propietario solicita los siguientes documentos y datos para validar su identidad antes de proceder con el
            contacto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Nombre completo *
            </Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Ingrese su nombre completo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dni" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              DNI *
            </Label>
            <Input
              id="dni"
              value={formData.dni}
              onChange={(e) => handleInputChange("dni", e.target.value)}
              placeholder="12345678"
              maxLength={8}
              pattern="[0-9]{8}"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentAddress" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Dirección actual *
            </Label>
            <Input
              id="currentAddress"
              value={formData.currentAddress}
              onChange={(e) => handleInputChange("currentAddress", e.target.value)}
              placeholder="Av. Principal 123, Distrito"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workplace" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Lugar de trabajo *
            </Label>
            <Input
              id="workplace"
              value={formData.workplace}
              onChange={(e) => handleInputChange("workplace", e.target.value)}
              placeholder="Empresa o lugar de trabajo"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyIncome" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Ingreso mensual (S/) *
            </Label>
            <Input
              id="monthlyIncome"
              type="number"
              value={formData.monthlyIncome}
              onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
              placeholder="3000"
              min="0"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hasInfocorp">¿Tiene reporte Infocorp? *</Label>
            <Select value={formData.hasInfocorp} onValueChange={(value) => handleInputChange("hasInfocorp", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccione una opción" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="si">Sí, tengo reporte Infocorp</SelectItem>
                <SelectItem value="no">No tengo reporte Infocorp</SelectItem>
                <SelectItem value="normal">Tengo reporte normal</SelectItem>
                <SelectItem value="problemas">Tengo algunos problemas crediticios</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Información adicional (opcional)</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
              placeholder="Cualquier información adicional que desee compartir..."
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Enviar por WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
