import type { Metadata } from 'next'
import { Montserrat, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/context/AppContext'
import { CartProvider } from '@/context/CartContext'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Kopi XYZ — Loyalty Rewards',
  description: 'Earn stamps, collect points, enjoy free drinks.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppProvider>
          <CartProvider>
            <TooltipProvider delay={200}>
              {children}
              <Toaster richColors position="top-right" />
            </TooltipProvider>
          </CartProvider>
        </AppProvider>
      </body>
    </html>
  )
}
