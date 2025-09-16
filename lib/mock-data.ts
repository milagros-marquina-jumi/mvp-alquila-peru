// Mock data for development and testing
export const mockUser = {
  id: "user-123",
  email: "carlos.mendoza@email.com",
  full_name: "Carlos Mendoza",
  phone: "987654321",
  whatsapp_number: "987654321",
  created_at: "2024-01-15T10:00:00Z",
}

export const mockProperties = [
  {
    id: "prop-1",
    title: "Departamento Moderno en San Isidro",
    description:
      "Hermoso departamento de 2 dormitorios con vista al parque, completamente amoblado y en excelente ubicación. Cuenta con cocina equipada, sala amplia y balcón con vista panorámica.",
    property_type: "apartment",
    address: "Av. Javier Prado Este 1234",
    district: "San Isidro",
    city: "Lima", // Added city field
    monthly_rent: 2500,
    deposit: 2500, // Added deposit field
    area_sqm: 85,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true, // Added furnished field
    pets_allowed: false, // Added pets_allowed field
    parking: true, // Added parking field
    utilities_included: true, // Added utilities_included field
    status: "available",
    is_visible: true,
    owner_id: "user-123",
    property_images: [
      {
        image_url: "/modern-apartment-living-room.png",
        is_primary: true,
      },
    ],
    rental_contracts: [],
    users: mockUser,
  },
  {
    id: "prop-2",
    title: "Casa Familiar en La Molina",
    description:
      "Amplia casa de 3 pisos con jardín, perfecta para familias grandes. Incluye cochera para 2 autos, área de lavandería y terraza en el último piso.",
    property_type: "house",
    address: "Calle Los Eucaliptos 567",
    district: "La Molina",
    city: "Lima", // Added city field
    monthly_rent: 3200,
    deposit: 6400, // Added deposit field
    area_sqm: 180,
    bedrooms: 4,
    bathrooms: 3,
    furnished: false, // Added furnished field
    pets_allowed: true, // Added pets_allowed field
    parking: true, // Added parking field
    utilities_included: false, // Added utilities_included field
    status: "rented",
    is_visible: true,
    owner_id: "user-123",
    property_images: [
      {
        image_url: "/family-house-garden.png",
        is_primary: true,
      },
    ],
    rental_contracts: [
      {
        start_date: "2024-01-01",
        end_date: "2024-12-31",
        contract_status: "active",
        monthly_rent: 3200,
      },
    ],
    users: mockUser,
  },
  {
    id: "prop-3",
    title: "Cuarto Independiente en Miraflores",
    description:
      "Cuarto cómodo con baño privado, ideal para estudiantes o profesionales jóvenes. Incluye escritorio, closet y acceso a cocina compartida.",
    property_type: "room",
    address: "Av. Larco 890",
    district: "Miraflores",
    city: "Lima", // Added city field
    monthly_rent: 800,
    deposit: 800, // Added deposit field
    area_sqm: 25,
    bedrooms: 1,
    bathrooms: 1,
    furnished: true, // Added furnished field
    pets_allowed: false, // Added pets_allowed field
    parking: false, // Added parking field
    utilities_included: true, // Added utilities_included field
    status: "available",
    is_visible: true,
    owner_id: "user-123",
    property_images: [
      {
        image_url: "/cozy-bedroom-bathroom.png",
        is_primary: true,
      },
    ],
    rental_contracts: [],
    users: mockUser,
  },
  {
    id: "prop-4",
    title: "Oficina Comercial en San Borja",
    description:
      "Oficina moderna en edificio corporativo, ideal para startups y pequeñas empresas. Incluye recepción, sala de reuniones y área de trabajo abierta.",
    property_type: "office",
    address: "Av. San Borja Norte 456",
    district: "San Borja",
    city: "Lima", // Added city field
    monthly_rent: 1800,
    deposit: 3600, // Added deposit field
    area_sqm: 60,
    bedrooms: 0,
    bathrooms: 1,
    furnished: true, // Added furnished field
    pets_allowed: false, // Added pets_allowed field
    parking: true, // Added parking field
    utilities_included: true, // Added utilities_included field
    status: "rented",
    is_visible: true,
    owner_id: "user-123",
    property_images: [
      {
        image_url: "/modern-office.png",
        is_primary: true,
      },
    ],
    rental_contracts: [
      {
        start_date: "2024-03-01",
        end_date: "2025-02-28",
        contract_status: "active",
        monthly_rent: 1800,
      },
    ],
    users: mockUser,
  },
  {
    id: "prop-5",
    title: "Departamento Ejecutivo en Surco",
    description:
      "Departamento de lujo con acabados premium, gimnasio y piscina en el edificio. Vista panorámica de la ciudad y balcón amplio.",
    property_type: "apartment",
    address: "Av. Primavera 789",
    district: "Santiago de Surco",
    city: "Lima", // Added city field
    monthly_rent: 2800,
    deposit: 5600, // Added deposit field
    area_sqm: 95,
    bedrooms: 2,
    bathrooms: 2,
    furnished: true, // Added furnished field
    pets_allowed: true, // Added pets_allowed field
    parking: true, // Added parking field
    utilities_included: false, // Added utilities_included field
    status: "available",
    is_visible: true,
    owner_id: "user-123",
    property_images: [
      {
        image_url: "/luxury-modern-apartment.png",
        is_primary: true,
      },
    ],
    rental_contracts: [],
    users: mockUser,
  },
]

export const mockTenants = [
  {
    id: "tenant-1",
    full_name: "María García López",
    email: "maria.garcia@email.com",
    phone: "987654321",
    dni: "12345678",
    occupation: "Ingeniera de Sistemas",
    emergency_contact: "Ana García - 956123456",
    created_at: "2024-01-15T10:00:00Z",
  },
  {
    id: "tenant-2",
    full_name: "Carlos Roberto Mendoza",
    email: "carlos.mendoza@email.com",
    phone: "987123456",
    dni: "87654321",
    occupation: "Gerente de Ventas",
    emergency_contact: "Rosa Mendoza - 945678123",
    created_at: "2024-02-20T10:00:00Z",
  },
  {
    id: "tenant-3",
    full_name: "Ana Sofia Ruiz",
    email: "ana.ruiz@email.com",
    phone: "987789456",
    dni: "45678912",
    occupation: "Doctora",
    emergency_contact: "Luis Ruiz - 934567890",
    created_at: "2024-03-10T10:00:00Z",
  }
]

export const mockContracts = [
  {
    id: "contract-1",
    property_id: "prop-2",
    tenant_id: "tenant-1",
    start_date: "2024-01-01",
    end_date: "2024-12-31",
    monthly_rent: 3200,
    deposit: 3200,
    contract_status: "active" as const,
    contract_type: "annual",
    payment_day: 1,
    late_fee: 100,
    notes: "Contrato anual renovable. Incluye mantenimiento de jardín.",
    created_at: "2023-12-15T10:00:00Z",
    properties: {
      title: "Casa Familiar en La Molina",
      address: "Calle Los Eucaliptos 567",
      district: "La Molina"
    },
    tenants: {
      full_name: "María García López",
      email: "maria.garcia@email.com",
      phone: "987654321"
    }
  },
  {
    id: "contract-2",
    property_id: "prop-4",
    tenant_id: "tenant-2",
    start_date: "2024-03-01",
    end_date: "2025-02-28",
    monthly_rent: 1800,
    deposit: 1800,
    contract_status: "active" as const,
    contract_type: "annual",
    payment_day: 5,
    late_fee: 80,
    notes: "Oficina comercial con opción de renovación automática.",
    created_at: "2024-02-15T10:00:00Z",
    properties: {
      title: "Oficina Comercial en San Borja",
      address: "Av. San Borja Norte 456",
      district: "San Borja"
    },
    tenants: {
      full_name: "Carlos Roberto Mendoza",
      email: "carlos.mendoza@email.com",
      phone: "987123456"
    }
  },
  {
    id: "contract-3",
    property_id: "prop-1",
    tenant_id: "tenant-3",
    start_date: "2024-06-01",
    end_date: "2024-11-30",
    monthly_rent: 2500,
    deposit: 2500,
    contract_status: "expired" as const,
    contract_type: "short_term",
    payment_day: 15,
    late_fee: 75,
    notes: "Contrato de corta duración por trabajo temporal.",
    created_at: "2024-05-20T10:00:00Z",
    properties: {
      title: "Departamento Moderno en San Isidro",
      address: "Av. Javier Prado Este 1234",
      district: "San Isidro"
    },
    tenants: {
      full_name: "Ana Sofia Ruiz",
      email: "ana.ruiz@email.com",
      phone: "987789456"
    }
  }
]

export const mockStats = {
  totalProperties: 5,
  availableProperties: 3,
  rentedProperties: 2,
  activeContracts: 2,
  monthlyIncome: 5000,
  pendingPayments: 1,
}

export const mockPayments = [
  {
    id: "pay-1",
    amount: 3200,
    status: "paid",
    due_date: "2024-12-01",
    payment_date: "2024-11-28",
    rental_contracts: {
      properties: { title: "Casa Familiar en La Molina" },
      tenants: { full_name: "María García" },
    },
  },
  {
    id: "pay-2",
    amount: 1800,
    status: "pending",
    due_date: "2024-12-15",
    payment_date: null,
    rental_contracts: {
      properties: { title: "Oficina Comercial en San Borja" },
      tenants: { full_name: "Tech Solutions SAC" },
    },
  },
]

export const mockExpenses = [
  {
    id: "exp-1",
    amount: 150,
    category: "maintenance",
    description: "Reparación de grifo",
    expense_date: "2024-11-20",
    properties: { title: "Casa Familiar en La Molina" },
  },
  {
    id: "exp-2",
    amount: 80,
    category: "utilities",
    description: "Pago de luz común",
    expense_date: "2024-11-15",
    properties: { title: "Departamento Moderno en San Isidro" },
  },
]

export const mockNotifications = [
  {
    id: "notif-1",
    type: "payment_reminder",
    message: "Recordatorio de pago enviado",
    status: "sent",
    created_at: "2024-11-25T10:00:00Z",
    rental_contracts: {
      properties: { title: "Oficina Comercial en San Borja" },
      tenants: { full_name: "Tech Solutions SAC", whatsapp_number: "987654321" },
    },
  },
]
