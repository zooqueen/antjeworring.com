'use client'

import { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import * as THREE from 'three'

interface AnimatedModelProps {
  url: string
  visible: boolean
  position: [number, number, number]
  scale?: number
  onAnimationEnd?: () => void
}

function AnimatedModel({ url, visible, position, scale = 1, onAnimationEnd }: AnimatedModelProps) {
  const group = useRef<THREE.Group>(null)
  const { scene, animations } = useGLTF(url)
  const { actions, mixer } = useAnimations(animations, group)
  const [hasPlayed, setHasPlayed] = useState(false)

  useEffect(() => {
    if (visible && !hasPlayed && actions) {
      const actionNames = Object.keys(actions)
      if (actionNames.length > 0) {
        const action = actions[actionNames[0]]
        if (action) {
          action.reset()
          action.setLoop(THREE.LoopOnce, 1)
          action.clampWhenFinished = true
          action.play()
          setHasPlayed(true)
        }
      }
    }
  }, [visible, hasPlayed, actions])

  useEffect(() => {
    if (!visible) {
      setHasPlayed(false)
    }
  }, [visible])

  useEffect(() => {
    if (mixer && onAnimationEnd) {
      const handleFinished = () => {
        onAnimationEnd()
      }
      mixer.addEventListener('finished', handleFinished)
      return () => {
        mixer.removeEventListener('finished', handleFinished)
      }
    }
  }, [mixer, onAnimationEnd])

  if (!visible) return null

  return (
    <group ref={group} position={position} scale={scale}>
      <primitive object={scene.clone()} />
    </group>
  )
}

function Scene() {
  const [showAwe, setShowAwe] = useState(false)
  const [showEnvy, setShowEnvy] = useState(false)
  const [cycleKey, setCycleKey] = useState(0)

  useEffect(() => {
    // Start the sequence after 2 seconds
    const initialTimer = setTimeout(() => {
      setShowAwe(true)
    }, 2000)

    return () => clearTimeout(initialTimer)
  }, [cycleKey])

  const handleAweEnd = () => {
    // Wait 3 seconds after Awe finishes, then show Envy
    setTimeout(() => {
      setShowAwe(false)
      setShowEnvy(true)
    }, 3000)
  }

  const handleEnvyEnd = () => {
    // Wait 4 seconds after Envy finishes, then restart the cycle
    setTimeout(() => {
      setShowEnvy(false)
      setCycleKey(prev => prev + 1)
    }, 4000)
  }

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Awe - lower left */}
      <Suspense fallback={null}>
        <AnimatedModel
          key={`awe-${cycleKey}`}
          url="/assets/Awe.glb"
          visible={showAwe}
          position={[-2.5, -1.5, 0]}
          scale={2}
          onAnimationEnd={handleAweEnd}
        />
      </Suspense>

      {/* Envy - lower right */}
      <Suspense fallback={null}>
        <AnimatedModel
          key={`envy-${cycleKey}`}
          url="/assets/Envy.glb"
          visible={showEnvy}
          position={[2.5, -1.5, 0]}
          scale={2}
          onAnimationEnd={handleEnvyEnd}
        />
      </Suspense>
    </>
  )
}

export function HeroAnimations() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

// Preload the models
useGLTF.preload('/assets/Awe.glb')
useGLTF.preload('/assets/Envy.glb')
