'use client'

import { useEffect, useState, useCallback } from 'react'

interface CursorFlower {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  opacity: number
}

export function FallingFlowers() {
  const [flowers, setFlowers] = useState<CursorFlower[]>([])
  const [nextId, setNextId] = useState(0)

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
      const now = Date.now()
      if (now - lastTime >= throttleMs) {
        lastTime = now
        addFlower(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [addFlower])

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

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9998,
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
