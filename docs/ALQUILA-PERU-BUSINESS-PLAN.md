# ALQUILA PERÚ - Plan de Negocio y Descripción Técnica

## Parte A – Idea de Negocio

### 1. Propuesta de Valor

**Problema que resuelve:**
ALQUILA PERÚ resuelve la desorganización y ineficiencia en la gestión de propiedades de alquiler en Perú, donde propietarios pierden dinero por pagos atrasados, contratos vencidos sin renovar, y falta de visibilidad de sus propiedades en el mercado.

**Para quién:**
- **Propietarios:** Dueños de cuartos, departamentos, casas, locales comerciales y cocheras que buscan optimizar la gestión de sus alquileres
- **Inquilinos:** Personas que buscan propiedades para alquilar de manera rápida y transparente

**Qué lo hace especial:**
- **Gestión automatizada:** Alertas automáticas por WhatsApp y email para recordatorios de pago y renovaciones
- **Marketplace integrado:** Los propietarios pueden gestionar y publicar sus propiedades desde un solo lugar
- **Transparencia total:** Precios públicos y disponibilidad en tiempo real, incluso para propiedades ocupadas
- **Score de inquilinos:** Sistema de calificación que ayuda a los propietarios a tomar mejores decisiones

### 2. Diferenciadores Clave

- **Doble funcionalidad:** Combina gestión privada (dashboard del propietario) con marketplace público
- **Alertas inteligentes:** Sistema configurable de notificaciones automáticas vía WhatsApp/email
- **Visibilidad de propiedades ocupadas:** Muestra propiedades alquiladas con fecha de disponibilidad para negociaciones futuras
- **Score de inquilinos:** Sistema de puntuación (0-1000) que evalúa el comportamiento de pago
- **Análisis financiero:** Reportes de rentabilidad, gastos e ingresos por propiedad
- **Validación de identidad:** Proceso de verificación de documentos antes del contacto

### 3. Mejoras para Triunfar en el Mercado

**Estratégicas:**
- Alianzas con inmobiliarias y corredores de propiedades
- Integración con bancos para facilitar pagos automáticos
- Programa de referidos para propietarios
- Expansión gradual por distritos de Lima y luego provincias

**De Producto:**
- App móvil nativa para mayor accesibilidad
- Integración con sistemas de pago (Yape, Plin, transferencias bancarias)
- Tours virtuales 360° de las propiedades
- Chat integrado entre propietarios e inquilinos
- Sistema de contratos digitales con firma electrónica

### 4. Competidores

**1. Urbania (Perú)**
- Marketplace inmobiliario líder en Perú
- Enfoque en venta y alquiler, pero sin gestión post-alquiler
- Amenaza: Gran base de usuarios y reconocimiento de marca

**2. OLX/Mercado Libre (Global)**
- Plataformas generalistas con sección inmobiliaria
- Sin herramientas de gestión especializadas
- Amenaza: Alto tráfico y presencia establecida

**3. Properati (Latinoamérica)**
- Marketplace inmobiliario regional
- Enfoque en listados, no en gestión
- Amenaza: Experiencia en mercados similares

**4. Rentals.com (Global)**
- Plataforma de gestión de alquileres
- No tiene presencia en Perú
- Amenaza: Modelo de negocio probado internacionalmente

**5. Gestores locales tradicionales**
- Administradores de propiedades tradicionales
- Servicios manuales y costosos
- Amenaza: Relaciones establecidas con propietarios grandes

### 5. Pitches

**Pitch de 30 segundos:**
"ALQUILA PERÚ es la primera plataforma que combina un marketplace de propiedades con herramientas de gestión automatizada para propietarios. Automatizamos recordatorios de pago por WhatsApp, mostramos la rentabilidad real de cada propiedad y calificamos inquilinos. Los propietarios aumentan sus ingresos hasta 15% y reducen pagos atrasados en 80%."

**Pitch de 1 minuto:**
"En Perú, el 60% de propietarios de alquiler pierden dinero por pagos atrasados y contratos no renovados a tiempo. ALQUILA PERÚ resuelve esto con una plataforma que automatiza la gestión completa: envía recordatorios automáticos por WhatsApp, calcula rentabilidad real, califica inquilinos con un score de 0-1000, y funciona como marketplace donde incluso propiedades ocupadas generan leads futuros. Los propietarios ven sus propiedades, inquilinos las encuentran fácilmente, y ambos tienen transparencia total en precios y disponibilidad. Ya tenemos 150 propiedades registradas en nuestro MVP."

**Pitch de 3 minutos:**
"El mercado de alquileres en Perú mueve más de $2 mil millones anuales, pero está fragmentado y mal gestionado. Los propietarios pierden 15% de ingresos potenciales por pagos atrasados, contratos vencidos y falta de visibilidad de sus propiedades. Los inquilinos buscan en múltiples plataformas sin encontrar información completa.

ALQUILA PERÚ es la primera plataforma integral que resuelve ambos problemas. Para propietarios, ofrecemos un dashboard completo que automatiza recordatorios de pago vía WhatsApp, calcula rentabilidad real por propiedad, genera reportes financieros y califica inquilinos con nuestro sistema de score único. Para inquilinos, creamos un marketplace transparente donde ven precios reales, disponibilidad actual, y pueden contactar propietarios incluso para propiedades ocupadas.

Nuestro diferenciador clave es la 'visibilidad inteligente': mostramos propiedades alquiladas con barras de progreso que indican cuándo estarán disponibles, generando leads anticipados para propietarios. El sistema de score de inquilinos (0-1000 puntos) ayuda a propietarios a tomar mejores decisiones, reduciendo riesgo de impagos.

Monetizamos con suscripción mensual para propietarios ($29/mes por propiedad) y comisión del 2% en nuevos contratos generados. Con 1,000 propiedades activas proyectamos $400K anuales. El mercado objetivo son 50,000 propietarios en Lima que manejan 2-10 propiedades cada uno. Buscamos $200K para desarrollo, marketing y equipo, con proyección de break-even en 18 meses."

---

## Parte B – Descripción de la Herramienta

### 1. Arquitectura y Tecnologías Propuestas

**Frontend:**
- **Next.js 15** con App Router: Framework React para SSR/SSG y mejor SEO
- **TypeScript**: Tipado estático para mayor robustez del código
- **Tailwind CSS v4**: Framework CSS utility-first para diseño responsive
- **Shadcn/ui**: Componentes UI consistentes y accesibles

**Backend:**
- **Next.js API Routes**: Endpoints serverless integrados
- **Supabase**: Base de datos PostgreSQL con autenticación y RLS
- **Vercel**: Hosting y deployment con edge functions

**Integraciones:**
- **WhatsApp Business API**: Envío de alertas automáticas
- **Vercel Blob**: Almacenamiento de imágenes y documentos
- **Resend/SendGrid**: Envío de emails transaccionales

**Justificación del Stack:**
- Next.js ofrece SSR para mejor SEO del marketplace
- Supabase proporciona base de datos robusta con autenticación integrada
- Vercel permite deployment automático y escalabilidad
- WhatsApp API es esencial para el mercado peruano

### 2. Módulos y Funcionalidades

**Módulo Marketplace Público:**
- Listado de propiedades con filtros avanzados
- Búsqueda por ubicación, precio, tipo de propiedad
- Visualización de propiedades ocupadas con disponibilidad futura
- Modal de validación de identidad antes del contacto
- Sistema de contacto directo por WhatsApp

**Módulo Dashboard Propietario:**
- Gestión completa de propiedades (CRUD)
- Sistema de alertas configurables (1-5 días antes/después)
- Análisis financiero con filtros por mes/año
- Score de inquilinos con código de colores
- Historial de pagos y gastos
- Configuración de visibilidad de anuncios

**Módulo Gestión de Inquilinos:**
- Registro de inquilinos con documentos
- Sistema de score automático (0-1000 puntos)
- Historial de pagos y comportamiento
- Alertas de vencimiento de contratos

**Módulo Notificaciones:**
- Alertas automáticas por WhatsApp/email
- Configuración de horarios múltiples (hasta 3 por día)
- Plantillas de mensajes personalizables
- Historial de notificaciones enviadas

### 3. Flujos Principales (End-to-End)

**Flujo Propietario:**
1. Registro → Selección perfil "Tengo lugares para alquiler"
2. Onboarding → Completar datos y verificación
3. Agregar propiedad → Fotos, detalles, precio
4. Configurar alertas → Días antes/después, horarios
5. Publicar → Activar visibilidad en marketplace
6. Gestionar → Recibir leads, actualizar estados, analizar rentabilidad

**Flujo Inquilino:**
1. Búsqueda → Filtros en marketplace público
2. Contacto → Validación de identidad en modal
3. Negociación → WhatsApp directo con propietario
4. Registro → Si procede, registro como inquilino
5. Seguimiento → Score y historial de pagos

**Flujo de Alertas:**
1. Sistema detecta fecha próxima de pago/vencimiento
2. Verifica configuración de alertas del propietario
3. Envía notificación automática por WhatsApp/email
4. Registra envío en historial
5. Actualiza score de inquilino según respuesta

### 4. Modelo de Datos Mínimo Viable

**Tabla Users:**
- id, email, password, user_type (owner/tenant)
- full_name, phone, profile_image, username
- created_at, updated_at

**Tabla Properties:**
- id, owner_id, title, description, property_type
- address, district, price, deposit, area
- bedrooms, bathrooms, furnished, pets_allowed
- images[], status (available/rented), visible_in_marketplace
- created_at, updated_at

**Tabla Rental_Contracts:**
- id, property_id, tenant_id, start_date, end_date
- monthly_rent, deposit_paid, contract_document
- status (active/expired/terminated)

**Tabla Payments:**
- id, contract_id, due_date, amount, paid_date
- status (pending/paid/overdue), payment_method

**Tabla Tenant_Scores:**
- id, tenant_id, current_score, total_payments
- late_payments, days_late_total

**Tabla Notifications:**
- id, property_id, tenant_id, type, message
- sent_at, channel (whatsapp/email), status

### 5. Roadmap por Fases

**Fase 1 - MVP (3 meses):**
- Marketplace básico con filtros
- Dashboard propietario con CRUD propiedades
- Sistema de alertas WhatsApp básico
- Autenticación y perfiles de usuario

**Fase 2 - MVP Ampliado (6 meses):**
- Sistema de score de inquilinos
- Análisis financiero con reportes
- Configuración avanzada de alertas
- Modal de validación de identidad
- Notificaciones push

**Fase 3 - Funciones Avanzadas (12 meses):**
- App móvil nativa
- Integración con pasarelas de pago
- Contratos digitales con firma electrónica
- Tours virtuales 360°
- Chat integrado propietario-inquilino
- API para integraciones externas

**Fase 4 - Escalabilidad (18 meses):**
- Expansión a provincias
- Marketplace B2B para inmobiliarias
- Inteligencia artificial para recomendaciones
- Integración con bancos para pagos automáticos
- Sistema de seguros para propiedades

### 6. KPIs y Métricas Clave

**Métricas de Negocio:**
- Propiedades activas registradas
- Tasa de conversión marketplace (leads → contratos)
- Revenue mensual recurrente (MRR)
- Customer Acquisition Cost (CAC)
- Lifetime Value (LTV) por propietario

**Métricas de Producto:**
- Tiempo promedio en plataforma
- Tasa de activación de alertas automáticas
- Número de notificaciones enviadas/mes
- Tasa de respuesta a alertas de pago
- Score promedio de inquilinos en plataforma

**Métricas de Retención:**
- Churn rate mensual de propietarios
- Propiedades que renuevan suscripción
- Frecuencia de uso del dashboard
- Satisfacción del cliente (NPS)

**Métricas Operativas:**
- Uptime de la plataforma (>99.9%)
- Tiempo de respuesta de API (<200ms)
- Tasa de entrega de notificaciones WhatsApp
- Tiempo de carga del marketplace (<3s)
- Conversión de registro a primera propiedad publicada
