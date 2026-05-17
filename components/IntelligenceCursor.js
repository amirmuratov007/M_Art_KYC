
'use client'

import { useEffect, useState } from 'react'

export default function IntelligenceCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', move)

    return () => window.removeEventListener('mousemove', move)
  }, [])

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] h-2 w-2 rounded-full bg-blue-400 blur-[1px]"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(96,165,250,0.9)'
        }}
      />

      <div
        className="fixed pointer-events-none z-[9998] h-8 w-8 rounded-full border border-blue-400/40"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
    </>
  )
}
