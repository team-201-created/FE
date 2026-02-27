'use client'

import * as React from 'react'
import { cn } from '@/lib/cn'

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  borderWidth?: number
  /** @deprecated use borderWidth */
  shineSize?: number
  duration?: number
  shineColor?: string | string[]
}

export function ShineBorder({
  borderWidth,
  shineSize,
  duration = 14,
  shineColor = '#000000',
  className,
  style,
  children,
  ...props
}: ShineBorderProps) {
  const width = borderWidth ?? shineSize ?? 1
  return (
    <div className={cn('relative rounded-[inherit]', className)} {...props}>
      <div
        style={
          {
            '--border-width': `${width}px`,
            '--duration': `${duration}s`,
            backgroundImage: `radial-gradient(transparent,transparent,${
              Array.isArray(shineColor) ? shineColor.join(',') : shineColor
            },transparent,transparent)`,
            backgroundSize: '300% 300%',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMask:
              'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: 'var(--border-width)',
            ...style,
          } as React.CSSProperties
        }
        className="motion-safe:animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]"
      />
      {children}
    </div>
  )
}
