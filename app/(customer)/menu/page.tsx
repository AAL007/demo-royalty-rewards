'use client'

import { useState, useMemo } from 'react'
import { useApp } from '@/context/AppContext'
import { useCart } from '@/context/CartContext'
import { MENU_ITEMS } from '@/lib/menuData'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Heart, Plus, Check } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/lib/types'

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'espresso', label: '☕ Espresso' },
  { key: 'cold_brew', label: '🧊 Cold Brew' },
  { key: 'tea', label: '🍵 Tea' },
  { key: 'food', label: '🥐 Food' },
] as const

type CategoryKey = typeof CATEGORIES[number]['key']

function MenuItemCard({ item }: { item: MenuItem }) {
  const { favorites, toggleFavorite } = useApp()
  const { addItem, items } = useCart()
  const isFav = favorites.includes(item.id)
  const inCart = items.find((i) => i.menuItemId === item.id)

  function handleAdd() {
    addItem(item)
    toast.success(`${item.name} added to cart`)
  }

  return (
    <div className="group relative bg-card rounded-2xl border border-border/60 shadow-card hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {item.popular && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="text-[9px] px-1 py-0 leading-4 h-4 bg-amber-500 text-white border-0 rounded-sm">Popular</Badge>
        </div>
      )}

      <button
        onClick={() => toggleFavorite(item.id)}
        className="absolute top-3 right-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110"
        aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      >
        <Heart className={cn('h-3.5 w-3.5 transition-colors', isFav ? 'fill-red-500 text-red-500' : 'text-muted-foreground')} />
      </button>

      <div className="flex items-center justify-center h-20 text-4xl bg-gradient-to-b from-amber-50 to-background border-b border-border/40">
        {item.icon}
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex-1">
          <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.description}</p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-3">
          <span className="font-bold text-base">${item.price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={handleAdd}
            className={cn(
              'h-8 px-3 text-xs gap-1.5 transition-all',
              inCart
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-amber-500 hover:bg-amber-600 text-white border-0',
            )}
          >
            {inCart ? (
              <>
                <Check className="h-3 w-3" />
                In cart ({inCart.quantity})
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                Add
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function MenuPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<CategoryKey>('all')

  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCat = category === 'all' || item.category === category
      const q = search.toLowerCase()
      const matchesSearch =
        !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      return matchesCat && matchesSearch
    })
  }, [search, category])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Menu</h1>
        <p className="text-muted-foreground text-sm mt-1">Add items to your cart and earn stamps automatically</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search drinks or food…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 bg-white"
        />
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            className={cn(
              'shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-all',
              category === cat.key
                ? 'bg-foreground text-background shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80',
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-muted-foreground gap-3 rounded-2xl border border-dashed">
          <span className="text-4xl">🔍</span>
          <p className="font-medium">No items match your search</p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
          {filtered.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
