// Alert scheduler service for automated notifications
import { createClient } from "@/lib/supabase/server"
import { whatsappService } from "./whatsapp-service"

interface AlertJob {
  type: "payment_reminder" | "contract_expiry"
  contractId: string
  scheduledDate: Date
}

export class AlertScheduler {
  private supabase = createClient()

  async schedulePaymentReminders(): Promise<void> {
    try {
      // Get all active contracts with upcoming payments
      const { data: contracts } = await this.supabase
        .from("rental_contracts")
        .select(`
          *,
          properties (
            title,
            owner_id,
            users (
              full_name
            )
          ),
          tenants (
            full_name,
            whatsapp_number
          ),
          payments (
            due_date,
            status
          )
        `)
        .eq("contract_status", "active")

      if (!contracts) return

      for (const contract of contracts) {
        // Get alert settings for the owner
        const { data: settings } = await this.supabase
          .from("alert_settings")
          .select("*")
          .eq("owner_id", contract.properties?.owner_id)
          .single()

        if (!settings?.whatsapp_enabled) continue

        // Find upcoming payments
        const upcomingPayments = contract.payments?.filter((payment) => {
          const dueDate = new Date(payment.due_date)
          const reminderDate = new Date()
          reminderDate.setDate(reminderDate.getDate() + settings.payment_reminder_days)

          return payment.status === "pending" && dueDate <= reminderDate
        })

        // Schedule reminders for upcoming payments
        for (const payment of upcomingPayments || []) {
          await this.schedulePaymentReminder(contract, payment, settings.payment_reminder_days)
        }
      }
    } catch (error) {
      console.error("Error scheduling payment reminders:", error)
    }
  }

  async scheduleContractExpiryAlerts(): Promise<void> {
    try {
      // Get contracts expiring soon
      const { data: contracts } = await this.supabase
        .from("rental_contracts")
        .select(`
          *,
          properties (
            title,
            owner_id,
            users (
              full_name
            )
          ),
          tenants (
            full_name,
            whatsapp_number
          )
        `)
        .eq("contract_status", "active")

      if (!contracts) return

      for (const contract of contracts) {
        // Get alert settings for the owner
        const { data: settings } = await this.supabase
          .from("alert_settings")
          .select("*")
          .eq("owner_id", contract.properties?.owner_id)
          .single()

        if (!settings?.whatsapp_enabled) continue

        // Check if contract is expiring soon
        const endDate = new Date(contract.end_date)
        const alertDate = new Date()
        alertDate.setDate(alertDate.getDate() + settings.contract_expiry_days)

        if (endDate <= alertDate) {
          await this.scheduleContractExpiryAlert(contract, settings.contract_expiry_days)
        }
      }
    } catch (error) {
      console.error("Error scheduling contract expiry alerts:", error)
    }
  }

  private async schedulePaymentReminder(contract: any, payment: any, reminderDays: number): Promise<void> {
    const scheduledDate = new Date(payment.due_date)
    scheduledDate.setDate(scheduledDate.getDate() - reminderDays)

    // Check if notification already exists
    const { data: existingNotification } = await this.supabase
      .from("notifications")
      .select("id")
      .eq("contract_id", contract.id)
      .eq("notification_type", "payment_reminder")
      .eq("scheduled_date", scheduledDate.toISOString())
      .single()

    if (existingNotification) return

    // Create notification record
    const { data: notification } = await this.supabase
      .from("notifications")
      .insert({
        owner_id: contract.properties?.owner_id,
        contract_id: contract.id,
        notification_type: "payment_reminder",
        title: `Recordatorio de pago - ${contract.properties?.title}`,
        message: whatsappService.generateMessage("payment_reminder", {
          tenant_name: contract.tenants?.full_name || "Inquilino",
          property_title: contract.properties?.title || "Propiedad",
          amount: payment.amount?.toLocaleString() || contract.monthly_rent.toLocaleString(),
          due_date: new Date(payment.due_date).toLocaleDateString("es-PE"),
          owner_name: contract.properties?.users?.full_name || "Propietario",
        }),
        scheduled_date: scheduledDate.toISOString(),
        status: "pending",
      })
      .select()
      .single()

    // If scheduled date is today or past, send immediately
    if (scheduledDate <= new Date()) {
      await this.sendNotification(notification.id)
    }
  }

  private async scheduleContractExpiryAlert(contract: any, expiryDays: number): Promise<void> {
    const scheduledDate = new Date(contract.end_date)
    scheduledDate.setDate(scheduledDate.getDate() - expiryDays)

    // Check if notification already exists
    const { data: existingNotification } = await this.supabase
      .from("notifications")
      .select("id")
      .eq("contract_id", contract.id)
      .eq("notification_type", "contract_expiry")
      .eq("scheduled_date", scheduledDate.toISOString())
      .single()

    if (existingNotification) return

    // Create notification record
    const { data: notification } = await this.supabase
      .from("notifications")
      .insert({
        owner_id: contract.properties?.owner_id,
        contract_id: contract.id,
        notification_type: "contract_expiry",
        title: `Renovación de contrato - ${contract.properties?.title}`,
        message: whatsappService.generateMessage("contract_expiry", {
          tenant_name: contract.tenants?.full_name || "Inquilino",
          property_title: contract.properties?.title || "Propiedad",
          expiry_date: new Date(contract.end_date).toLocaleDateString("es-PE"),
          owner_name: contract.properties?.users?.full_name || "Propietario",
        }),
        scheduled_date: scheduledDate.toISOString(),
        status: "pending",
      })
      .select()
      .single()

    // If scheduled date is today or past, send immediately
    if (scheduledDate <= new Date()) {
      await this.sendNotification(notification.id)
    }
  }

  private async sendNotification(notificationId: string): Promise<void> {
    try {
      const { data: notification } = await this.supabase
        .from("notifications")
        .select(`
          *,
          rental_contracts (
            tenants (
              whatsapp_number
            )
          )
        `)
        .eq("id", notificationId)
        .single()

      if (!notification || !notification.rental_contracts?.tenants?.whatsapp_number) {
        await this.supabase
          .from("notifications")
          .update({ status: "failed", sent_date: new Date().toISOString() })
          .eq("id", notificationId)
        return
      }

      // Send WhatsApp message
      const success = await whatsappService.sendMessage({
        to: notification.rental_contracts.tenants.whatsapp_number,
        message: notification.message,
      })

      // Update notification status
      await this.supabase
        .from("notifications")
        .update({
          status: success ? "sent" : "failed",
          sent_date: new Date().toISOString(),
          whatsapp_sent: success,
        })
        .eq("id", notificationId)
    } catch (error) {
      console.error("Error sending notification:", error)
      await this.supabase
        .from("notifications")
        .update({ status: "failed", sent_date: new Date().toISOString() })
        .eq("id", notificationId)
    }
  }

  async processPendingNotifications(): Promise<void> {
    try {
      // Get pending notifications that should be sent now
      const { data: notifications } = await this.supabase
        .from("notifications")
        .select("id")
        .eq("status", "pending")
        .lte("scheduled_date", new Date().toISOString())

      if (!notifications) return

      // Send each notification
      for (const notification of notifications) {
        await this.sendNotification(notification.id)
      }
    } catch (error) {
      console.error("Error processing pending notifications:", error)
    }
  }
}

export const alertScheduler = new AlertScheduler()
