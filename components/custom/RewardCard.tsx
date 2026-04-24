'use client'

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
    <div
      style={{
        background: '#FFFFFF',
        border: '2px solid #111111',
        borderRadius: 3,
        padding: '16px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        boxShadow: canAfford ? '4px 4px 0 #111111' : '2px 2px 0 rgba(0,0,0,0.15)',
        transition: 'transform 0.15s, box-shadow 0.15s',
        cursor: canAfford ? 'pointer' : 'default',
        opacity: canAfford ? 1 : 0.8,
      }}
      onMouseEnter={(e) => {
        if (canAfford) {
          e.currentTarget.style.transform = 'translate(-1px,-1px)'
          e.currentTarget.style.boxShadow = '5px 5px 0 #111111'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = canAfford ? '4px 4px 0 #111111' : '2px 2px 0 rgba(0,0,0,0.15)'
      }}
    >
      <div style={{ fontSize: 30 }}>{reward.icon}</div>
      <div>
        <div style={{ fontWeight: 900, fontSize: 13, color: '#111111', textTransform: 'uppercase', letterSpacing: -0.3, lineHeight: 1.2 }}>{reward.name}</div>
        <div style={{ fontSize: 11, color: '#6B6B6B', marginTop: 3, fontWeight: 500 }}>{reward.description}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
        <span style={{ background: canAfford ? '#F2D648' : '#EEEEEE', color: '#111111', fontSize: 11, fontWeight: 900, padding: '3px 9px', border: '2px solid #111111', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {reward.pointCost} pts
        </span>
        <button
          onClick={canAfford ? handleRedeem : undefined}
          style={{
            background: canAfford ? '#111111' : '#CCCCCC',
            color: canAfford ? '#F2D648' : '#FFFFFF',
            fontSize: 10,
            fontWeight: 900,
            padding: '6px 13px',
            cursor: canAfford ? 'pointer' : 'not-allowed',
            letterSpacing: 1,
            textTransform: 'uppercase',
            border: '2px solid #111111',
            fontFamily: 'inherit',
          }}
        >
          {canAfford ? 'Redeem' : 'Need more'}
        </button>
      </div>
      {!canAfford && (
        <div style={{ fontSize: 10, color: '#6B6B6B', fontWeight: 600, textAlign: 'center', marginTop: -4 }}>
          Need {shortfall} more point{shortfall !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  )
}
