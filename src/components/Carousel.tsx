// src/components/Carousel.tsx
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export interface CarouselSlide {
  src: string
  caption: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  autoAdvanceMs?: number
}

export function Carousel({ slides, autoAdvanceMs = 4000 }: CarouselProps) {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    const t = setInterval(next, autoAdvanceMs)
    return () => clearInterval(t)
  }, [next, autoAdvanceMs])

  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-border bg-card group shadow-sm">
      <div className="relative aspect-video">
        <img
          src={slides[current].src}
          alt={slides[current].caption}
          className="w-full h-full object-cover object-top transition-opacity duration-500"
        />
        {/* Caption overlay — intentionally uses black/white: overlaid on screenshot images, not page theme */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
          <p className="text-sm text-white font-medium">{slides[current].caption}</p>
        </div>
      </div>

      {/* Prev/Next */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prev}
        className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background shadow-sm h-8 w-8"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={next}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/80 hover:bg-background shadow-sm h-8 w-8"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </Button>

      {/* Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              'w-1.5 h-1.5 rounded-full transition-colors',
              i === current ? 'bg-white' : 'bg-white/40'
            )}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
