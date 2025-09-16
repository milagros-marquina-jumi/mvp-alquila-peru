import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Building2, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function SelectProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 rounded-lg">
              <Home className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                ALQUILA PERÚ
              </h1>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Qué tipo de usuario eres?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Selecciona tu perfil para acceder a las funciones diseñadas especialmente para ti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 hover:border-green-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 relative">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-full group-hover:animate-bounce">
                  <Search className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-green-500 rounded-full opacity-20 group-hover:animate-ping"></div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Busco Alquilar
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Encuentra tu hogar ideal con facilidad y seguridad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Busca propiedades verificadas
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Contacta directamente con propietarios
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Gestiona tus documentos de forma segura
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Recibe alertas de nuevas propiedades
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 group-hover:animate-pulse transition-all duration-300 hover:shadow-lg"
              >
                <Link href="/auth/register/tenant" className="flex items-center justify-center gap-2">
                  Registrarme como Inquilino
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-2 hover:border-green-300">
            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <CardHeader className="text-center pb-4">
              <div className="mx-auto mb-4 relative">
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-6 rounded-full group-hover:animate-bounce">
                  <Building2 className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-green-400 rounded-full opacity-20 group-hover:animate-ping"></div>
              </div>
              <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-green-600 transition-colors">
                Tengo Lugares para Alquiler
              </CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Gestiona y maximiza tus ingresos por alquiler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Publica tus propiedades gratis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Gestiona contratos y pagos
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Alertas automáticas por WhatsApp
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Reportes financieros detallados
                </li>
              </ul>
              <Button
                asChild
                className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-semibold py-3 group-hover:animate-pulse transition-all duration-300 hover:shadow-lg"
              >
                <Link href="/auth/register/owner" className="flex items-center justify-center gap-2">
                  Registrarme como Propietario
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/auth/login" className="text-green-600 hover:text-green-700 font-semibold hover:underline">
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
