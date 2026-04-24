import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function LandingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
      style={{ background: 'linear-gradient(145deg, #0d0502 0%, #1e0c05 40%, #2e1508 70%, #1a0804 100%)' }}
    >
      {/* Decorative glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(ellipse, #f59e0b 0%, transparent 70%)', filter: 'blur(40px)' }}
      />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-10"
        style={{ background: 'radial-gradient(ellipse, #fb923c 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      {/* Subtle dot grid overlay */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div className="relative z-10 w-full max-w-xs text-center space-y-10">
        {/* Logo mark */}
        <div className="space-y-5">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-2xl opacity-40"
                style={{ background: 'radial-gradient(circle, #f59e0b, transparent)' }}
              />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-amber-500/20"
                style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(245,158,11,0.05) 100%)' }}
              >
                <span className="text-5xl">☕</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-5xl font-bold tracking-tight text-white">
              Brew &amp; Earn
            </h1>
            <p className="mt-2 text-amber-400/80 text-base">
              Every cup, rewarded.
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="space-y-3">
          <Link
            href="/dashboard"
            className={cn(
              'flex w-full h-13 items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all',
              'bg-amber-400 text-amber-950 hover:bg-amber-300 shadow-[0_0_24px_rgba(245,158,11,0.35)]',
            )}
            style={{ height: '52px' }}
          >
            ☕ Continue as Alex
          </Link>
          <Link
            href="/admin"
            className={cn(
              'flex w-full items-center justify-center rounded-xl text-sm font-medium transition-all',
              'border border-white/15 text-white/70 hover:border-white/30 hover:text-white',
            )}
            style={{ height: '52px' }}
          >
            Staff / Admin Panel
          </Link>
        </div>

        <p className="text-xs text-white/25">Demo mode · No login required</p>
      </div>
    </main>
  )
}
