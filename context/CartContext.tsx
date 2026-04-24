'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import type { CartItem, MenuItem } from '@/lib/types'

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  subtotal: number
  addItem: (item: MenuItem) => void
  removeItem: (menuItemId: string) => void
  updateQty: (menuItemId: string, qty: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = useCallback((menuItem: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menuItemId === menuItem.id)
      if (existing) {
        return prev.map((i) =>
          i.menuItemId === menuItem.id ? { ...i, quantity: i.quantity + 1 } : i,
        )
      }
      return [
        ...prev,
        {
          menuItemId: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity: 1,
          icon: menuItem.icon,
        },
      ]
    })
  }, [])

  const removeItem = useCallback((menuItemId: string) => {
    setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId))
  }, [])

  const updateQty = useCallback((menuItemId: string, qty: number) => {
    if (qty <= 0) {
      setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId))
    } else {
      setItems((prev) =>
        prev.map((i) => (i.menuItemId === menuItemId ? { ...i, quantity: qty } : i)),
      )
    }
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, totalItems, subtotal, addItem, removeItem, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
