import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface StatCardProps {
  label: string
  value: string | number
  trend?: number
  icon?: ReactNode
  accent?: string
}

export function StatCard({ label, value, trend, icon, accent = '#f59e0b' }: StatCardProps) {
  return (
    <Card className="shadow-card border-border/60 overflow-hidden">
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${accent}, transparent)` }} />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">{label}</p>
            <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
            {trend !== undefined && (
              <div className={cn('flex items-center gap-1 text-xs mt-2', trend >= 0 ? 'text-emerald-600' : 'text-red-500')}>
                {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                <span>{Math.abs(trend)}% from last period</span>
              </div>
            )}
          </div>
          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: `${accent}18` }}>
              <span style={{ color: accent }}>{icon}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
