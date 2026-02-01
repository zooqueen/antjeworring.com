'use client'

import { useEffect, useState, useCallback, RefObject } from 'react'

interface CursorFlower {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
}

interface FallingFlowersProps {
  containerRef: RefObject<HTMLElement | null>
}

export function FallingFlowers({ containerRef }: FallingFlowersProps) {
  const [flowers, setFlowers] = useState<CursorFlower[]>([])
  const [nextId, setNextId] = useState(0)
  const [isInSection, setIsInSection] = useState(false)

  const addFlower = useCallback((x: number, y: number) => {
    const newFlower: CursorFlower = {
      id: nextId,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      size: 30 + Math.random() * 40,
      rotation: Math.random() * 360,
      opacity: 0.7,
    }

    setFlowers(prev => [...prev.slice(-15), newFlower])
    setNextId(prev => prev + 1)
  }, [nextId])

  useEffect(() => {
    let lastTime = 0
    const throttleMs = 80

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const isInside = (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      )

      setIsInSection(isInside)

      if (isInside) {
        const now = Date.now()
        if (now - lastTime >= throttleMs) {
          lastTime = now
          // Use position relative to the container
          const relativeX = e.clientX - rect.left
          const relativeY = e.clientY - rect.top
          addFlower(relativeX, relativeY)
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [addFlower, containerRef])

  useEffect(() => {
    if (flowers.length === 0) return

    const fadeInterval = setInterval(() => {
      setFlowers(prev =>
        prev
          .map(f => ({ ...f, opacity: f.opacity - 0.05 }))
          .filter(f => f.opacity > 0)
      )
    }, 50)

    return () => clearInterval(fadeInterval)
  }, [flowers.length])

  if (!isInSection && flowers.length === 0) return null

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        overflow: 'hidden',
      }}
    >
      {flowers.map((flower) => (
        <div
          key={flower.id}
          style={{
            position: 'absolute',
            left: flower.x,
            top: flower.y,
            width: flower.size,
            height: flower.size,
            transform: `translate(-50%, -50%) rotate(${flower.rotation}deg) scale(${flower.opacity})`,
            opacity: flower.opacity,
            transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
          }}
        >
          <img
            src="/assets/bluelight.png"
            alt=""
            width={flower.size}
            height={flower.size}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ))}
    </div>
  )
}
