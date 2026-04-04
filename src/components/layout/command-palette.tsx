"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  Leaf,
  Calculator,
  MessageCircle,
  LayoutDashboard,
  Search,
  AlertTriangle,
  ArrowRight,
  Loader2,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

type HerbResult = {
  id: string
  name: string
  slug: string
  scientific_name: string
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const [herbs, setHerbs] = React.useState<HerbResult[]>([])
  const [loading, setLoading] = React.useState(false)
  const router = useRouter()

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  React.useEffect(() => {
    if (!open) {
      setQuery("")
      setHerbs([])
    }
  }, [open])

  React.useEffect(() => {
    if (query.length < 2) {
      setHerbs([])
      return
    }

    const controller = new AbortController()
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/herbs/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal,
        })
        if (res.ok) {
          const data = await res.json()
          setHerbs(data)
        }
      } catch (err) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          console.error("Search error:", err)
        }
      } finally {
        setLoading(false)
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      controller.abort()
    }
  }, [query])

  const navigate = React.useCallback(
    (path: string) => {
      setOpen(false)
      router.push(path)
    },
    [router]
  )

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput
        placeholder="Search herbs, pages, or actions..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Searching...
            </div>
          ) : (
            "No results found."
          )}
        </CommandEmpty>

        {herbs.length > 0 && (
          <>
            <CommandGroup heading="Herbs">
              {herbs.map((herb) => (
                <CommandItem
                  key={herb.id}
                  value={`${herb.name} ${herb.scientific_name}`}
                  onSelect={() => navigate(`/herbs/${herb.slug}`)}
                >
                  <Leaf className="text-primary" />
                  <div className="flex flex-col">
                    <span>{herb.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {herb.scientific_name}
                    </span>
                  </div>
                  <ArrowRight className="ml-auto size-3 text-muted-foreground" />
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
          </>
        )}

        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => navigate("/herbs")}>
            <Leaf />
            <span>Browse Herbs</span>
            <CommandShortcut>G H</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/calculator")}>
            <Calculator />
            <span>Dose Calculator</span>
            <CommandShortcut>G C</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/pharmacist")}>
            <MessageCircle />
            <span>Virtual Herbalist</span>
            <CommandShortcut>G P</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/dashboard")}>
            <LayoutDashboard />
            <span>Dashboard</span>
            <CommandShortcut>G D</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => navigate("/herbs?focus=search")}>
            <Search />
            <span>Search Herbs</span>
            <CommandShortcut>S H</CommandShortcut>
          </CommandItem>
          <CommandItem
            onSelect={() => navigate("/dashboard/interactions")}
          >
            <AlertTriangle />
            <span>Check Interactions</span>
            <CommandShortcut>C I</CommandShortcut>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/calculator")}>
            <ArrowRight />
            <span>Calculate Dose</span>
            <CommandShortcut>C D</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

export function CommandPaletteTrigger() {
  return (
    <button
      type="button"
      onClick={() =>
        document.dispatchEvent(
          new KeyboardEvent("keydown", {
            key: "k",
            metaKey: true,
            bubbles: true,
          })
        )
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border border-input/30 bg-input/30 px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
      )}
    >
      <Search className="size-4" />
      <span className="hidden lg:inline">Search...</span>
      <kbd className="pointer-events-none hidden select-none items-center gap-0.5 rounded border border-input bg-muted px-1.5 py-0.5 font-mono text-[10px] font-medium opacity-60 sm:inline-flex">
        <span className="text-xs">&#8984;</span>K
      </kbd>
    </button>
  )
}
