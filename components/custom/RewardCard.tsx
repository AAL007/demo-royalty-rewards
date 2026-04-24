'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useApp } from '@/context/AppContext'
import { toast } from 'sonner'
import type { Reward } from '@/lib/types'

interface RewardCardProps {
  reward: Reward
}

export function RewardCard({ reward }: RewardCardProps) {
  const { customer, redeemReward } = useApp()
  const canAfford = !!customer && customer.points >= reward.pointCost
  const shortfall = reward.pointCost - (customer?.points ?? 0)

  function handleRedeem() {
    redeemReward(reward.id)
    toast.success(`${reward.name} redeemed!`, { description: `${reward.pointCost} points used.` })
  }

  return (
    <div className={`group relative flex flex-col rounded-2xl bg-card border border-border overflow-hidden shadow-card transition-all duration-200 ${canAfford ? 'hover:shadow-card-hover hover:-translate-y-0.5' : 'opacity-80'}`}>
      {/* Top accent strip */}
      <div className="h-1 w-full" style={{ background: canAfford ? 'linear-gradient(90deg, #d97706, #fbbf24)' : '#e5e7eb' }} />

      <div className="flex flex-col flex-1 p-5">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl text-3xl"
            style={{ background: 'linear-gradient(135deg, #fef3c7, #fde68a)' }}>
            {reward.icon}
          </div>
          <Badge
            variant={canAfford ? 'default' : 'secondary'}
            className={`text-xs px-2 py-1 ${canAfford ? 'bg-amber-100 text-amber-800 border-amber-200' : ''}`}
          >
            {reward.pointCost} pts
          </Badge>
        </div>

        {/* Text */}
        <div className="flex-1 mb-4">
          <p className="font-semibold text-foreground">{reward.name}</p>
          <p className="text-muted-foreground text-sm mt-0.5">{reward.description}</p>
        </div>

        {/* CTA */}
        <div className="space-y-1.5">
          <Button
            onClick={canAfford ? handleRedeem : undefined}
            disabled={!canAfford}
            className={`w-full font-semibold ${canAfford ? 'bg-amber-500 hover:bg-amber-400 text-amber-950' : ''}`}
          >
            {canAfford ? 'Redeem' : 'Redeem'}
          </Button>
          {!canAfford && (
            <p className="text-xs text-center text-muted-foreground">
              Need {shortfall} more point{shortfall !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
