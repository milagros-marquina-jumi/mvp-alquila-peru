import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alquila Perú - Plataforma Líder de Alquileres en Perú',
  description: 'Encuentra y publica propiedades de alquiler en todo Perú. Conectamos propietarios e inquilinos de manera segura con contratos digitales y pagos automatizados.',
  generator: 'Alquila Perú',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
