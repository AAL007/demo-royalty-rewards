'use client'

import { useState } from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useApp } from '@/context/AppContext'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import type { Customer } from '@/lib/types'

export function IssueStampForm() {
  const { customers, issueStamp } = useApp()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Customer | null>(null)
  const [issued, setIssued] = useState(false)

  function handleIssue() {
    if (!selected) return
    issueStamp(selected.id)
    const newStamps = selected.stamps >= 10 ? 1 : selected.stamps + 1
    toast.success(`Stamp issued to ${selected.name}!`, {
      description: `They now have ${Math.min(newStamps, 10)}/10 stamps.`,
    })
    setIssued(true)
    setSelected((prev) =>
      prev
        ? {
            ...prev,
            stamps: prev.stamps >= 10 ? 1 : prev.stamps + 1,
            points: prev.points + 10,
          }
        : null,
    )
    setTimeout(() => setIssued(false), 2000)
  }

  const displayStamps = selected ? Math.min(selected.stamps, 10) : 0

  return (
    <div className="space-y-6 max-w-md mx-auto">
      <div className="space-y-2">
        <label className="text-sm font-medium">Search customer</label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger
            className={cn(
              'flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm',
              'hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background',
            )}
            aria-expanded={open}
          >
            {selected ? (
              <span>
                {selected.name}{' '}
                <span className="text-muted-foreground text-sm">— {selected.phone}</span>
              </span>
            ) : (
              <span className="text-muted-foreground">Select a customer...</span>
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </PopoverTrigger>
          <PopoverContent className="w-[var(--available-width)] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search by name or phone..." />
              <CommandList>
                <CommandEmpty>No customers found.</CommandEmpty>
                <CommandGroup>
                  {customers.map((c) => (
                    <CommandItem
                      key={c.id}
                      value={`${c.name} ${c.phone}`}
                      onSelect={() => {
                        setSelected(c)
                        setOpen(false)
                        setIssued(false)
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          selected?.id === c.id ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      <span className="font-medium">{c.name}</span>
                      <span className="ml-2 text-muted-foreground text-sm">{c.phone}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {selected && (
        <Card>
          <CardContent className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{selected.name}</p>
                <p className="text-sm text-muted-foreground">{selected.phone}</p>
              </div>
              <Badge variant="secondary" className="text-sm">
                {selected.points} pts
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Stamp progress</span>
                <span className="font-medium">{displayStamps} / 10</span>
              </div>
              <Progress value={displayStamps * 10} className="h-3" />
            </div>
            {displayStamps >= 10 && (
              <p className="text-center text-sm font-semibold text-amber-600">
                🎉 Free drink reward ready to claim!
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Button
        size="lg"
        className="w-full h-14 text-lg"
        disabled={!selected || issued}
        onClick={handleIssue}
      >
        {issued ? '✓ Stamp Issued!' : 'Issue Stamp'}
      </Button>
    </div>
  )
}
