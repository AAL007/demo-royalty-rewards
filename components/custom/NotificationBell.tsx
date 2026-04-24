'use client'

import { useState } from 'react'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { NotificationPanel } from './NotificationPanel'
import { useApp } from '@/context/AppContext'

export function NotificationBell() {
  const { unreadCount } = useApp()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open notifications"
        style={{
          position: 'relative',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: 8,
          display: 'flex',
          cursor: 'pointer',
        }}
      >
        <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: 4, right: 4, width: 7, height: 7, background: '#F2D648', border: '1.5px solid #111111', borderRadius: '50%' }} />
        )}
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-80 p-0" showCloseButton={false} style={{ background: '#F9F7EE', border: 'none' }}>
          <NotificationPanel onClose={() => setOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}
