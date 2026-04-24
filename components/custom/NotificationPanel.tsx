'use client'

import { useApp } from '@/context/AppContext'
import type { Notification } from '@/lib/types'

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

const TYPE_ICON: Record<Notification['type'], string> = {
  stamp: '☕',
  milestone: '🎯',
  reward_unlocked: '🎁',
  redeemed: '✅',
  new_reward: '✨',
  expiry: '⏰',
  order_placed: '🛍️',
}

interface NotificationPanelProps {
  onClose: () => void
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const { notifications, markRead, markAllRead, unreadCount } = useApp()

  return (
    <div className="flex flex-col h-full" style={{ background: '#F9F7EE' }}>
      {/* Header */}
      <div style={{ padding: '20px 18px 16px', borderBottom: '3px solid #111111', background: '#F2D648', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontWeight: 900, fontSize: 16, textTransform: 'uppercase', letterSpacing: -0.5, color: '#111111' }}>Notifications</div>
          <div style={{ fontSize: 11, fontWeight: 700, marginTop: 2, color: '#111111' }}>{unreadCount} unread</div>
        </div>
        <div className="flex gap-2 items-center">
          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              style={{ fontSize: 10, fontWeight: 900, background: '#111111', color: '#F2D648', padding: '6px 10px', border: 'none', letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            style={{ background: '#111111', padding: 7, display: 'flex', border: 'none', cursor: 'pointer' }}
          >
            <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#F2D648" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Notification list */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {notifications.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#6B6B6B', marginTop: 40, fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
            No notifications yet
          </div>
        ) : (
          notifications.map((n) => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className="text-left w-full"
              style={{
                background: n.read ? '#FFFFFF' : '#F2D648',
                border: '2px solid #111111',
                padding: '12px 14px',
                cursor: 'pointer',
                boxShadow: n.read ? 'none' : '3px 3px 0 #111111',
                fontFamily: 'inherit',
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
              }}
            >
              <span style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{TYPE_ICON[n.type]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: n.read ? 600 : 800, color: '#111111', lineHeight: 1.4 }}>{n.message}</div>
                <div style={{ fontSize: 10, color: '#6B6B6B', marginTop: 5, fontWeight: 600 }}>{relativeTime(n.createdAt)}</div>
              </div>
              {!n.read && <span style={{ width: 8, height: 8, background: '#111111', borderRadius: '50%', flexShrink: 0, marginTop: 4 }} />}
            </button>
          ))
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: '14px 16px', borderTop: '2px solid #111111' }}>
        <button
          onClick={onClose}
          style={{ width: '100%', padding: '11px', background: '#111111', color: '#F2D648', fontWeight: 900, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, border: '2px solid #111111', cursor: 'pointer', fontFamily: 'inherit' }}
        >
          Close
        </button>
      </div>
    </div>
  )
}
