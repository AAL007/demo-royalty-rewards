import Link from 'next/link'
import { Coffee } from 'lucide-react'
import { HeaderActions } from '@/components/custom/HeaderActions'

const NAV_LINKS = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/menu', label: 'Menu' },
  { href: '/rewards', label: 'Rewards' },
  { href: '/orders', label: 'Orders' },
  { href: '/history', label: 'History' },
]

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-border/60 shadow-[0_1px_0_0_rgba(0,0,0,0.04)]">
        <div className="mx-auto max-w-3xl flex h-16 items-center gap-4 px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: 'linear-gradient(135deg, #1e0c05, #3d1e0a)' }}>
              <Coffee className="h-4 w-4 text-amber-400" />
            </div>
            <span className="font-bold text-foreground text-sm tracking-tight hidden sm:block">Brew &amp; Earn</span>
          </Link>

          <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2 shrink-0">
            <Link
              href="/admin"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors hidden sm:block px-3 py-1.5 rounded-lg hover:bg-muted"
            >
              Staff
            </Link>
            <HeaderActions />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
    </div>
  )
}
