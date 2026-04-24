'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { NotificationBell } from '@/components/custom/NotificationBell'

export function HeaderActions() {
  const { totalItems } = useCart()

  return (
    <div className="flex items-center gap-1">
      <Link href="/cart" className="relative">
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white leading-none">
              {totalItems > 9 ? '9+' : totalItems}
            </span>
          )}
        </Button>
      </Link>
      <NotificationBell />
    </div>
  )
}
