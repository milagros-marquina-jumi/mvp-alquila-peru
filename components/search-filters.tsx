"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    type: searchParams.get("type") || "",
    district: searchParams.get("district") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    status: searchParams.get("status") || "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.set(key, value)
    })
    router.push(`/?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      type: "",
      district: "",
      minPrice: "",
      maxPrice: "",
      status: "",
    })
    router.push("/")
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="lg:col-span-2">
          <Input
            placeholder="Buscar por ubicación, título..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="w-full"
          />
        </div>

        <Select value={filters.type} onValueChange={(value) => setFilters({ ...filters, type: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Tipo de propiedad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="room">Cuarto</SelectItem>
            <SelectItem value="apartment">Departamento</SelectItem>
            <SelectItem value="house">Casa</SelectItem>
            <SelectItem value="office">Oficina</SelectItem>
            <SelectItem value="commercial">Comercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.district} onValueChange={(value) => setFilters({ ...filters, district: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Distrito" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="miraflores">Miraflores</SelectItem>
            <SelectItem value="san-isidro">San Isidro</SelectItem>
            <SelectItem value="barranco">Barranco</SelectItem>
            <SelectItem value="surco">Surco</SelectItem>
            <SelectItem value="la-molina">La Molina</SelectItem>
            <SelectItem value="san-borja">San Borja</SelectItem>
            <SelectItem value="jesus-maria">Jesús María</SelectItem>
            <SelectItem value="magdalena">Magdalena</SelectItem>
            <SelectItem value="pueblo-libre">Pueblo Libre</SelectItem>
            <SelectItem value="lince">Lince</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Input
          placeholder="Precio mín. (S/)"
          type="number"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
        />

        <Input
          placeholder="Precio máx. (S/)"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
        />

        <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
          <SelectTrigger>
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available">Disponible</SelectItem>
            <SelectItem value="rented">Alquilado</SelectItem>
          </SelectContent>
        </Select>

        <Button onClick={handleSearch} className="bg-emerald-600 hover:bg-emerald-700">
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button>

        <Button variant="outline" onClick={clearFilters}>
          <Filter className="w-4 h-4 mr-2" />
          Limpiar
        </Button>
      </div>
    </div>
  )
}
