import { useEffect, useState } from 'react'

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 })
  const [active, setActive] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    if (!isFinePointer) {
      return
    }

    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY })
    }

    const detect = (event) => {
      const target = event.target
      setActive(Boolean(target.closest('a, button, input, textarea, select')))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', detect)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', detect)
    }
  }, [])

  return (
    <>
      <div
        className="global-cursor-dot"
        style={{
          left: position.x,
          top: position.y
        }}
      />
      <div
        className={`global-cursor-ring ${active ? 'global-cursor-ring-active' : ''}`}
        style={{
          left: position.x,
          top: position.y
        }}
      />
    </>
  )
}
