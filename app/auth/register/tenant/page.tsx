"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Camera, Upload, FileText, User, MapPin, Briefcase, DollarSign } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"

export default function TenantRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Datos personales
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",
    birthDate: "",

    // Ubicación actual
    currentAddress: "",
    district: "",
    city: "",

    // Información laboral
    workplace: "",
    position: "",
    monthlyIncome: "",
    workPhone: "",

    // Preferencias de búsqueda
    maxBudget: "",
    preferredDistricts: "",
    propertyType: "",

    // Documentos
    profilePhoto: null,
    dniPhoto: null,
    workCertificate: null,
    incomeCertificate: null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleCompleteRegistration = () => {
    // Simular guardado de datos
    console.log("[v0] Registro de inquilino completado:", formData)

    // Redirigir al home y hacer scroll a la sección de búsqueda
    router.push("/#search-section")

    // Alternativa: usar setTimeout para asegurar que la página cargue antes del scroll
    setTimeout(() => {
      const searchSection = document.getElementById("search-section")
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }, 100)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <MobileNavigation
            userType="tenant"
            currentPage="Registro de Inquilino"
            showBackButton={true}
            backUrl="/auth/select-profile"
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-16 h-1 mx-2 transition-all duration-300 ${
                      step > stepNumber ? "bg-gradient-to-r from-emerald-500 to-teal-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Registro de Inquilino</h2>
            <p className="text-gray-600 mt-2">
              {step === 1 && "Información Personal"}
              {step === 2 && "Ubicación y Trabajo"}
              {step === 3 && "Preferencias de Búsqueda"}
              {step === 4 && "Documentos Requeridos"}
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Información Personal</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Nombres *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      className="mt-1"
                      placeholder="Ingresa tus nombres"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Apellidos *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      className="mt-1"
                      placeholder="Ingresa tus apellidos"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Correo Electrónico *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="mt-1"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Teléfono/WhatsApp *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1"
                      placeholder="+51 999 999 999"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="dni">DNI *</Label>
                    <Input
                      id="dni"
                      value={formData.dni}
                      onChange={(e) => handleInputChange("dni", e.target.value)}
                      className="mt-1"
                      placeholder="12345678"
                      maxLength={8}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={formData.birthDate}
                      onChange={(e) => handleInputChange("birthDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Ubicación y Trabajo</h3>
                </div>

                <div>
                  <Label htmlFor="currentAddress">Dirección Actual *</Label>
                  <Input
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => handleInputChange("currentAddress", e.target.value)}
                    className="mt-1"
                    placeholder="Av. Principal 123, Dpto 4B"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="district">Distrito *</Label>
                    <Select onValueChange={(value) => handleInputChange("district", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu distrito" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="miraflores">Miraflores</SelectItem>
                        <SelectItem value="san-isidro">San Isidro</SelectItem>
                        <SelectItem value="surco">Surco</SelectItem>
                        <SelectItem value="la-molina">La Molina</SelectItem>
                        <SelectItem value="san-borja">San Borja</SelectItem>
                        <SelectItem value="barranco">Barranco</SelectItem>
                        <SelectItem value="jesus-maria">Jesús María</SelectItem>
                        <SelectItem value="magdalena">Magdalena</SelectItem>
                        <SelectItem value="pueblo-libre">Pueblo Libre</SelectItem>
                        <SelectItem value="lince">Lince</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="city">Ciudad *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="mt-1"
                      placeholder="Lima"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="workplace">Lugar de Trabajo *</Label>
                  <Input
                    id="workplace"
                    value={formData.workplace}
                    onChange={(e) => handleInputChange("workplace", e.target.value)}
                    className="mt-1"
                    placeholder="Nombre de la empresa"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Cargo/Posición *</Label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => handleInputChange("position", e.target.value)}
                      className="mt-1"
                      placeholder="Analista, Gerente, etc."
                    />
                  </div>
                  <div>
                    <Label htmlFor="monthlyIncome">Ingreso Mensual *</Label>
                    <Input
                      id="monthlyIncome"
                      value={formData.monthlyIncome}
                      onChange={(e) => handleInputChange("monthlyIncome", e.target.value)}
                      className="mt-1"
                      placeholder="S/ 3,000"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <DollarSign className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Preferencias de Búsqueda</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maxBudget">Presupuesto Máximo *</Label>
                    <Input
                      id="maxBudget"
                      value={formData.maxBudget}
                      onChange={(e) => handleInputChange("maxBudget", e.target.value)}
                      className="mt-1"
                      placeholder="S/ 1,500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="propertyType">Tipo de Propiedad *</Label>
                    <Select onValueChange={(value) => handleInputChange("propertyType", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="¿Qué buscas?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cuarto">Cuarto</SelectItem>
                        <SelectItem value="departamento">Departamento</SelectItem>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="estudio">Estudio</SelectItem>
                        <SelectItem value="oficina">Oficina</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredDistricts">Distritos Preferidos</Label>
                  <Textarea
                    id="preferredDistricts"
                    value={formData.preferredDistricts}
                    onChange={(e) => handleInputChange("preferredDistricts", e.target.value)}
                    className="mt-1"
                    placeholder="Miraflores, San Isidro, Surco..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FileText className="w-16 h-16 mx-auto text-emerald-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Documentos Requeridos</h3>
                  <p className="text-gray-600 mt-2">Sube los documentos para validar tu identidad</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Foto de perfil */}
                  <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors group">
                    <Camera className="w-12 h-12 mx-auto text-emerald-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">Foto de Perfil *</h4>
                    <p className="text-sm text-gray-600 mb-4">Toma una selfie clara</p>
                    <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 animate-pulse">
                      <Camera className="w-4 h-4 mr-2" />
                      Tomar Foto
                    </Button>
                  </div>

                  {/* DNI */}
                  <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors group">
                    <Upload className="w-12 h-12 mx-auto text-emerald-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">DNI (Ambas Caras) *</h4>
                    <p className="text-sm text-gray-600 mb-4">Foto clara del documento</p>
                    <Button
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 animate-pulse bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir DNI
                    </Button>
                  </div>

                  {/* Constancia de trabajo */}
                  <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors group">
                    <Briefcase className="w-12 h-12 mx-auto text-emerald-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">Constancia de Trabajo *</h4>
                    <p className="text-sm text-gray-600 mb-4">Documento oficial de tu empleador</p>
                    <Button
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 animate-pulse bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Constancia
                    </Button>
                  </div>

                  {/* Boletas de pago */}
                  <div className="border-2 border-dashed border-emerald-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-colors group">
                    <DollarSign className="w-12 h-12 mx-auto text-emerald-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">Boletas de Pago *</h4>
                    <p className="text-sm text-gray-600 mb-4">Últimas 3 boletas de pago</p>
                    <Button
                      variant="outline"
                      className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 animate-pulse bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Boletas
                    </Button>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                  <h4 className="font-semibold text-emerald-800 mb-2">¿Por qué necesitamos estos documentos?</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Verificar tu identidad y solvencia económica</li>
                    <li>• Generar confianza con los propietarios</li>
                    <li>• Acelerar el proceso de alquiler</li>
                    <li>• Cumplir con las regulaciones legales</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
                >
                  Anterior
                </Button>
              )}

              <div className="ml-auto">
                {step < 4 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-pulse"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={handleCompleteRegistration}
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-bounce"
                  >
                    Completar Registro
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
