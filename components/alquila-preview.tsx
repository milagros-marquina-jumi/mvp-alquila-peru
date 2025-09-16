import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Building2, 
  Users, 
  MapPin, 
  Star,
  CheckCircle,
  Shield,
  Clock,
  TrendingUp
} from "lucide-react"
import Link from "next/link"

export default function AlquilaPreview() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            La Mejor Plataforma de Alquileres en Perú
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conectamos propietarios e inquilinos de manera segura y eficiente en todo el país
          </p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">2,500+</div>
            <div className="text-gray-600">Propiedades</div>
          </div>
          
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">15,000+</div>
            <div className="text-gray-600">Usuarios</div>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">25+</div>
            <div className="text-gray-600">Ciudades</div>
          </div>
          
          <div className="text-center">
            <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">4.8/5</div>
            <div className="text-gray-600">Calificación</div>
          </div>
        </div>

        {/* Beneficios principales */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Para Propietarios</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Publicación Gratuita</div>
                    <div className="text-gray-600">Sin costos por publicar tu propiedad</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Inquilinos Verificados</div>
                    <div className="text-gray-600">Proceso de verificación completo</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="w-6 h-6 text-green-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Máxima Rentabilidad</div>
                    <div className="text-gray-600">Precios sugeridos del mercado</div>
                  </div>
                </div>
              </div>
              <Button asChild className="w-full mt-6 bg-green-600 hover:bg-green-700">
                <Link href="/auth/register?type=owner">Publicar Propiedad</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Para Inquilinos</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Búsqueda Gratuita</div>
                    <div className="text-gray-600">Encuentra tu hogar ideal sin costo</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Respuesta Rápida</div>
                    <div className="text-gray-600">Conectamos en menos de 24 horas</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-blue-600 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-semibold text-gray-900">Proceso Seguro</div>
                    <div className="text-gray-600">Contratos y pagos protegidos</div>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" className="w-full mt-6 border-blue-600 text-blue-600 hover:bg-blue-50">
                <Link href="/auth/register?type=tenant">Buscar Hogar</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Call to action final */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Listo para comenzar?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Únete a miles de peruanos que ya encontraron su hogar ideal o inquilino perfecto
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/auth/select-profile">Empezar Ahora</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#propiedades">Ver Propiedades</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}