import { useEffect, useState } from 'react'

export default function IntelligenceCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    const over = (event) => {
      const target = event.target
      if (target.closest('a, button, input, textarea, select')) {
        setActive(true)
      } else {
        setActive(false)
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [])

  return (
    <>
      <div
        className="hidden md:block fixed pointer-events-none z-[9999] rounded-full bg-sky-300 transition-transform duration-150"
        style={{
          left: position.x,
          top: position.y,
          width: active ? 8 : 6,
          height: active ? 8 : 6,
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 22px rgba(125, 211, 252, 0.9)'
        }}
      />

      <div
        className="hidden md:block fixed pointer-events-none z-[9998] rounded-full border border-sky-300/50 transition-all duration-200"
        style={{
          left: position.x,
          top: position.y,
          width: active ? 54 : 34,
          height: active ? 54 : 34,
          transform: 'translate(-50%, -50%)',
          background: active ? 'rgba(56, 189, 248, 0.06)' : 'transparent',
          boxShadow: active ? '0 0 45px rgba(56, 189, 248, 0.18)' : 'none'
        }}
      />
    </>
  )
}
