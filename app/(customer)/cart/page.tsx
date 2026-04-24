'use client'

import { useCart } from '@/context/CartContext'
import { useApp } from '@/context/AppContext'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, subtotal, updateQty, removeItem, clearCart } = useCart()
  const { placeOrder } = useApp()
  const router = useRouter()

  const stampsPreview = Math.max(1, Math.floor(subtotal / 5))
  const pointsPreview = stampsPreview * 10

  function handleCheckout() {
    if (items.length === 0) return
    const order = placeOrder(items, subtotal)
    clearCart()
    toast.success(`Order placed! You earned ${order.stampsEarned} stamp${order.stampsEarned > 1 ? 's' : ''} and ${order.pointsEarned} points`)
    router.push('/orders')
  }

  if (items.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-muted-foreground text-sm mt-1">Review your order before checkout</p>
        </div>
        <div className="flex flex-col items-center py-24 text-muted-foreground gap-4 rounded-2xl border border-dashed">
          <ShoppingCart className="h-12 w-12 opacity-20" />
          <div className="text-center">
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm mt-1">Browse our menu to add items</p>
          </div>
          <Link href="/menu">
            <Button className="mt-2 bg-amber-500 hover:bg-amber-600 text-white border-0">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
          <p className="text-muted-foreground text-sm mt-1">{items.length} item{items.length > 1 ? 's' : ''}</p>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground text-xs" onClick={clearCart}>
          Clear all
        </Button>
      </div>

      {/* Items */}
      <div className="rounded-2xl border bg-card shadow-card overflow-hidden">
        {items.map((item, idx) => (
          <div key={item.menuItemId}>
            <div className="flex items-center gap-4 px-5 py-4">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => updateQty(item.menuItemId, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border bg-background hover:bg-muted transition-colors"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.menuItemId, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border bg-background hover:bg-muted transition-colors"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
              <span className="w-16 text-right font-semibold text-sm shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeItem(item.menuItemId)}
                className="shrink-0 text-muted-foreground hover:text-destructive transition-colors ml-1"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            {idx < items.length - 1 && <Separator />}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="rounded-2xl border bg-card shadow-card p-5 space-y-4">
        <h2 className="font-semibold">Order Summary</h2>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-bold text-base">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>

        {/* Loyalty preview */}
        <div className="rounded-xl bg-amber-50 border border-amber-100 p-3 flex gap-3 items-center">
          <span className="text-2xl">☕</span>
          <div>
            <p className="text-xs font-semibold text-amber-800">You'll earn on this order</p>
            <p className="text-xs text-amber-700 mt-0.5">
              +{stampsPreview} stamp{stampsPreview > 1 ? 's' : ''} · +{pointsPreview} points
            </p>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full h-12 text-base font-semibold bg-amber-500 hover:bg-amber-600 text-white border-0 gap-2"
        >
          Place Order
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
