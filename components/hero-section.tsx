import { Button } from "@/components/ui/button"
import { Home, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-br from-green-500 to-green-700 text-white relative">
      <div className="absolute top-6 right-6 z-10">
        <Button
          asChild
          className="bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white hover:text-green-700 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-pulse"
        >
          <Link href="/auth/select-profile">Iniciar Sesión</Link>
        </Button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">ALQUILA PERÚ</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            La plataforma líder para gestionar y encontrar propiedades de alquiler en Perú
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 px-8 py-4 text-lg">
              <Link href="/dashboard">Publicar Propiedad</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-green-700 px-8 py-4 text-lg bg-transparent"
            >
              <Link href="#propiedades">Ver Propiedades</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Miles de Propiedades</h3>
              <p className="opacity-90">Encuentra desde cuartos hasta casas completas</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gestión Segura</h3>
              <p className="opacity-90">Contratos y pagos protegidos</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Máxima Rentabilidad</h3>
              <p className="opacity-90">Optimiza tus ingresos por alquiler</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
