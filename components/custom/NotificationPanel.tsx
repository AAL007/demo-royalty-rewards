'use client'

import { useApp } from '@/context/AppContext'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
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
    <div className="flex h-full flex-col">
      <SheetHeader className="px-4 py-4 border-b">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-base">
            Notifications
            {unreadCount > 0 && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({unreadCount} unread)
              </span>
            )}
          </SheetTitle>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs h-7"
              onClick={markAllRead}
            >
              Mark all read
            </Button>
          )}
        </div>
      </SheetHeader>

      <ScrollArea className="flex-1">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
            <span className="text-4xl mb-3">🔔</span>
            <p className="text-sm">No notifications yet</p>
          </div>
        ) : (
          <div>
            {notifications.map((notif, idx) => (
              <div key={notif.id}>
                <button
                  onClick={() => {
                    markRead(notif.id)
                  }}
                  className={cn(
                    'w-full text-left px-4 py-4 hover:bg-muted/50 transition-colors flex gap-3 items-start',
                    !notif.read && 'border-l-2 border-amber-500 bg-amber-50/50',
                  )}
                >
                  <span className="text-lg shrink-0 mt-0.5">
                    {TYPE_ICON[notif.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className={cn('text-sm leading-snug', !notif.read && 'font-medium')}>
                      {notif.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {relativeTime(notif.createdAt)}
                    </p>
                  </div>
                  {!notif.read && (
                    <span className="shrink-0 mt-1.5 h-2 w-2 rounded-full bg-amber-500" />
                  )}
                </button>
                {idx < notifications.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-4 border-t">
        <Button variant="outline" className="w-full" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
