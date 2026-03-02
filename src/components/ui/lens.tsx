'use client'

import React, { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionTemplate } from 'motion/react'

interface Position {
  /** The x coordinate of the lens */
  x: number
  /** The y coordinate of the lens */
  y: number
}

interface LensProps {
  /** The children of the lens */
  children: React.ReactNode
  /** The zoom factor of the lens */
  zoomFactor?: number
  /** The size of the lens */
  lensSize?: number
  /** The position of the lens */
  position?: Position
  /** The default position of the lens */
  defaultPosition?: Position
  /** Whether the lens is static */
  isStatic?: boolean
  /** The duration of the animation */
  duration?: number
  /** The color of the lens */
  lensColor?: string
  /** The aria label of the lens */
  ariaLabel?: string
}

export function Lens({
  children,
  zoomFactor = 1.3,
  lensSize = 170,
  isStatic = false,
  position = { x: 0, y: 0 },
  defaultPosition,
  duration = 0.1,
  lensColor = 'black',
  ariaLabel = 'Zoom Area',
}: LensProps) {
  if (zoomFactor < 1) {
    throw new Error('zoomFactor must be greater than 1')
  }
  if (lensSize < 0) {
    throw new Error('lensSize must be greater than 0')
  }

  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState<Position>(position)
  const containerRef = useRef<HTMLDivElement>(null)

  const currentPosition = isStatic
    ? position
    : defaultPosition && !isHovering
      ? defaultPosition
      : mousePosition

  const maskImage = useMotionTemplate`radial-gradient(circle ${
    lensSize / 2
  }px at ${currentPosition.x}px ${
    currentPosition.y
  }px, ${lensColor} 100%, transparent 100%)`

  const { x, y } = currentPosition
  const lensContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.58 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration }}
      className="absolute inset-0 overflow-hidden"
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        transformOrigin: `${x}px ${y}px`,
        zIndex: 50,
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `scale(${zoomFactor})`,
          transformOrigin: `${x}px ${y}px`,
        }}
      >
        {children}
      </div>
    </motion.div>
  )

  return (
    <div
      ref={containerRef}
      className="relative z-20 overflow-hidden rounded-xl"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }}
      onKeyDown={(e) => {
        if (e.key === 'Escape') setIsHovering(false)
      }}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
    >
      {children}
      {isStatic || defaultPosition ? (
        lensContent
      ) : (
        <AnimatePresence mode="popLayout">
          {isHovering && lensContent}
        </AnimatePresence>
      )}
    </div>
  )
}
