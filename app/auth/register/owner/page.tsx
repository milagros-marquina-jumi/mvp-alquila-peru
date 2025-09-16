"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Building2, User, MapPin, FileText, Camera, Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import MobileNavigation from "@/components/mobile-navigation"

export default function OwnerRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Datos personales
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dni: "",

    // Información de contacto
    address: "",
    district: "",
    city: "",

    // Información profesional
    occupation: "",
    experience: "",

    // Documentos
    profilePhoto: null,
    dniPhoto: null,
    propertyTitles: null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3))
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1))

  const handleCompleteRegistration = () => {
    // Aquí se procesaría el registro
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <MobileNavigation
            userType="owner"
            currentPage="Registro de Propietario"
            showBackButton={true}
            backUrl="/auth/select-profile"
          />
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                    step >= stepNumber
                      ? "bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-24 h-1 mx-2 transition-all duration-300 ${
                      step > stepNumber ? "bg-gradient-to-r from-teal-500 to-emerald-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Registro de Propietario</h2>
            <p className="text-gray-600 mt-2">
              {step === 1 && "Información Personal"}
              {step === 2 && "Información de Contacto"}
              {step === 3 && "Documentos de Verificación"}
            </p>
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8">
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <User className="w-16 h-16 mx-auto text-teal-500 mb-4" />
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
                    <Label htmlFor="occupation">Ocupación *</Label>
                    <Input
                      id="occupation"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                      className="mt-1"
                      placeholder="Empresario, Profesional, etc."
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <MapPin className="w-16 h-16 mx-auto text-teal-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Información de Contacto</h3>
                </div>

                <div>
                  <Label htmlFor="address">Dirección *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
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
                  <Label htmlFor="experience">Experiencia en Alquileres</Label>
                  <Select onValueChange={(value) => handleInputChange("experience", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="¿Cuánta experiencia tienes?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nuevo">Nuevo en alquileres</SelectItem>
                      <SelectItem value="1-2-anos">1-2 años</SelectItem>
                      <SelectItem value="3-5-anos">3-5 años</SelectItem>
                      <SelectItem value="5-mas-anos">Más de 5 años</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <FileText className="w-16 h-16 mx-auto text-teal-500 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900">Documentos de Verificación</h3>
                  <p className="text-gray-600 mt-2">Verifica tu identidad como propietario</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Foto de perfil */}
                  <div className="border-2 border-dashed border-teal-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors group">
                    <Camera className="w-12 h-12 mx-auto text-teal-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">Foto de Perfil *</h4>
                    <p className="text-sm text-gray-600 mb-4">Foto profesional para tu perfil</p>
                    <Button className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 animate-pulse">
                      <Camera className="w-4 h-4 mr-2" />
                      Tomar Foto
                    </Button>
                  </div>

                  {/* DNI */}
                  <div className="border-2 border-dashed border-teal-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors group">
                    <Upload className="w-12 h-12 mx-auto text-teal-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">DNI (Ambas Caras) *</h4>
                    <p className="text-sm text-gray-600 mb-4">Documento de identidad</p>
                    <Button
                      variant="outline"
                      className="border-teal-500 text-teal-600 hover:bg-teal-50 animate-pulse bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir DNI
                    </Button>
                  </div>

                  {/* Títulos de propiedad */}
                  <div className="border-2 border-dashed border-teal-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors group md:col-span-2">
                    <Building2 className="w-12 h-12 mx-auto text-teal-500 mb-4 group-hover:animate-bounce" />
                    <h4 className="font-semibold text-gray-900 mb-2">Títulos de Propiedad (Opcional)</h4>
                    <p className="text-sm text-gray-600 mb-4">Documentos que acrediten la propiedad de tus inmuebles</p>
                    <Button
                      variant="outline"
                      className="border-teal-500 text-teal-600 hover:bg-teal-50 animate-pulse bg-transparent"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Subir Títulos
                    </Button>
                  </div>
                </div>

                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                  <h4 className="font-semibold text-teal-800 mb-2">Beneficios de verificar tu cuenta</h4>
                  <ul className="text-sm text-teal-700 space-y-1">
                    <li>• Mayor confianza de los inquilinos</li>
                    <li>• Acceso a herramientas avanzadas de gestión</li>
                    <li>• Prioridad en los resultados de búsqueda</li>
                    <li>• Soporte prioritario de nuestro equipo</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t">
              {step > 1 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  className="border-teal-500 text-teal-600 hover:bg-teal-50 bg-transparent"
                >
                  Anterior
                </Button>
              )}

              <div className="ml-auto">
                {step < 3 ? (
                  <Button
                    onClick={nextStep}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-pulse"
                  >
                    Siguiente
                  </Button>
                ) : (
                  <Button
                    onClick={handleCompleteRegistration}
                    className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-8 hover:scale-105 transition-all duration-300 hover:shadow-lg animate-bounce"
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
