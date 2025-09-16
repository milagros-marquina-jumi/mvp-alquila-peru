import { notFound } from "next/navigation"
import PropertyDetails from "@/components/property-details"
import { mockProperties } from "@/lib/mock-data"

export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  // Find property in mock data
  const property = mockProperties.find((p) => p.id === id)

  if (!property) {
    notFound()
  }

  return <PropertyDetails property={property} />
}
