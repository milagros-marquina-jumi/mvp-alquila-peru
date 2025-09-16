import { notFound } from "next/navigation"
import PropertyDetails from "@/components/property-details"
import { mockProperties } from "@/lib/mock-data"

export default function PropertyPage({ params }: { params: { id: string } }) {
  // Find property in mock data
  const property = mockProperties.find((p) => p.id === params.id)

  if (!property) {
    notFound()
  }

  return <PropertyDetails property={property} />
}
