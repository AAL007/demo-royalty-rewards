import { Zap } from 'lucide-react'

interface PointsBadgeProps {
  points: number
}

export function PointsBadge({ points }: PointsBadgeProps) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 shadow-card-lg h-full"
      style={{ background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 50%, #fbbf24 100%)' }}
    >
      {/* Subtle shine */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 opacity-20"
        style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)' }}
      />

      <div className="relative flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-950/20">
            <Zap className="h-4 w-4 text-amber-950/80" />
          </div>
          <span className="text-amber-950/70 text-xs font-semibold uppercase tracking-widest">
            Points Balance
          </span>
        </div>

        <p className="text-amber-950 text-5xl font-bold tracking-tight leading-none">
          {points}
        </p>
        <p className="text-amber-950/50 text-sm mt-2">available to redeem</p>
      </div>
    </div>
  )
}
