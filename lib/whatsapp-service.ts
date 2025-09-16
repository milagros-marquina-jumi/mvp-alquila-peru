// WhatsApp service for sending automated messages
// This would integrate with a WhatsApp Business API provider

interface WhatsAppMessage {
  to: string
  message: string
  templateType?: "payment_reminder" | "contract_expiry" | "custom"
}

interface MessageTemplate {
  type: string
  template: string
}

const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    type: "payment_reminder",
    template: `Hola {tenant_name},

Te recordamos que el pago de tu alquiler de la propiedad "{property_title}" vence el {due_date}.

Monto: S/ {amount}

Por favor, realiza el pago a tiempo para evitar inconvenientes.

Saludos,
{owner_name}`,
  },
  {
    type: "contract_expiry",
    template: `Hola {tenant_name},

Tu contrato de alquiler de la propiedad "{property_title}" vence el {expiry_date}.

Si deseas renovar el contrato, por favor contáctame para coordinar los detalles.

Saludos,
{owner_name}`,
  },
]

export class WhatsAppService {
  private apiKey: string
  private baseUrl: string

  constructor() {
    // These would be environment variables in production
    this.apiKey = process.env.WHATSAPP_API_KEY || ""
    this.baseUrl = process.env.WHATSAPP_API_URL || "https://api.whatsapp.business"
  }

  async sendMessage(message: WhatsAppMessage): Promise<boolean> {
    try {
      // This is a mock implementation
      // In production, you would integrate with a WhatsApp Business API provider
      // like Twilio, Meta Business API, or similar service

      console.log("Sending WhatsApp message:", {
        to: message.to,
        message: message.message,
        timestamp: new Date().toISOString(),
      })

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock success response (90% success rate for demo)
      return Math.random() > 0.1
    } catch (error) {
      console.error("WhatsApp API Error:", error)
      return false
    }
  }

  generateMessage(templateType: string, variables: Record<string, string>): string {
    const template = MESSAGE_TEMPLATES.find((t) => t.type === templateType)
    if (!template) {
      return variables.message || "Mensaje personalizado"
    }

    let message = template.template

    // Replace variables in template
    Object.entries(variables).forEach(([key, value]) => {
      message = message.replace(new RegExp(`{${key}}`, "g"), value)
    })

    return message
  }

  async schedulePaymentReminder(
    tenantPhone: string,
    tenantName: string,
    propertyTitle: string,
    amount: number,
    dueDate: string,
    ownerName: string,
  ): Promise<boolean> {
    const message = this.generateMessage("payment_reminder", {
      tenant_name: tenantName,
      property_title: propertyTitle,
      amount: amount.toLocaleString(),
      due_date: dueDate,
      owner_name: ownerName,
    })

    return this.sendMessage({
      to: tenantPhone,
      message,
      templateType: "payment_reminder",
    })
  }

  async scheduleContractExpiry(
    tenantPhone: string,
    tenantName: string,
    propertyTitle: string,
    expiryDate: string,
    ownerName: string,
  ): Promise<boolean> {
    const message = this.generateMessage("contract_expiry", {
      tenant_name: tenantName,
      property_title: propertyTitle,
      expiry_date: expiryDate,
      owner_name: ownerName,
    })

    return this.sendMessage({
      to: tenantPhone,
      message,
      templateType: "contract_expiry",
    })
  }
}

export const whatsappService = new WhatsAppService()
