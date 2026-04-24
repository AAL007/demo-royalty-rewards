'use client'

import { useEffect, useRef, useState } from 'react'
import { Coffee } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StampCardProps {
  stamps: number
  name: string
}

export function StampCard({ stamps, name }: StampCardProps) {
  const prevRef = useRef(stamps)
  const [animatingSlots, setAnimatingSlots] = useState<Set<number>>(new Set())

  useEffect(() => {
    const prev = prevRef.current
    if (stamps > prev) {
      const newSlots = new Set<number>()
      for (let i = prev; i < Math.min(stamps, 10); i++) newSlots.add(i)
      setAnimatingSlots(newSlots)
      const t = setTimeout(() => setAnimatingSlots(new Set()), 700)
      prevRef.current = stamps
      return () => clearTimeout(t)
    }
    prevRef.current = stamps
  }, [stamps])

  const isComplete = stamps >= 10
  const progress = Math.min((stamps / 10) * 100, 100)

  return (
    <div
      className={cn('relative overflow-hidden rounded-2xl p-6 shadow-card-lg', isComplete && 'reward-glow')}
      style={{ background: 'linear-gradient(135deg, #0f0603 0%, #1e0c05 35%, #2e1508 65%, #3d1e0a 100%)' }}
    >
      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
      />

      {/* Glow when complete */}
      {isComplete && (
        <div className="absolute inset-0 opacity-20"
          style={{ background: 'radial-gradient(ellipse at center, #f59e0b 0%, transparent 70%)' }}
        />
      )}

      <div className="relative">
        {/* Header row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-amber-400/60 text-[10px] font-semibold uppercase tracking-widest">
              Loyalty Card
            </p>
            <p className="text-white/90 font-semibold mt-0.5">{name}</p>
          </div>
          <div className="text-right">
            <p className="text-amber-400/60 text-[10px] font-semibold uppercase tracking-widest">
              Stamps
            </p>
            <p className="text-white font-bold text-2xl leading-none mt-0.5">
              {Math.min(stamps, 10)}<span className="text-white/30 text-base font-normal">/10</span>
            </p>
          </div>
        </div>

        {/* Stamp grid */}
        <div className="grid grid-cols-5 gap-2.5 mb-6">
          {Array.from({ length: 10 }, (_, i) => {
            const filled = i < stamps
            const animating = animatingSlots.has(i)
            return (
              <div
                key={i}
                className={cn(
                  'flex aspect-square items-center justify-center rounded-full transition-all duration-300',
                  filled
                    ? 'bg-amber-400/90 shadow-[0_0_12px_rgba(251,191,36,0.5)]'
                    : 'bg-white/5 border border-white/10',
                  animating && 'stamp-pop',
                )}
              >
                <Coffee
                  className={cn(
                    'h-4 w-4 transition-colors',
                    filled ? 'text-amber-950' : 'text-white/15',
                  )}
                />
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-amber-400 transition-all duration-700 ease-out"
              style={{ width: `${progress}%`, boxShadow: '0 0 8px rgba(251,191,36,0.6)' }}
            />
          </div>
          {isComplete ? (
            <p className="text-amber-400 text-xs font-semibold text-center animate-pulse">
              🎉 Free drink unlocked — show this to your barista!
            </p>
          ) : (
            <p className="text-white/35 text-xs text-center">
              {10 - Math.min(stamps, 10)} more stamp{10 - Math.min(stamps, 10) !== 1 ? 's' : ''} to earn a free drink
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
