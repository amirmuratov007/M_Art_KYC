import { useEffect, useRef } from 'react'

const NODE_COUNT_DESKTOP = 46
const NODE_COUNT_MOBILE = 20

export default function OsintMotionSystem() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches
    let frame = 0
    let width = 0
    let height = 0
    let ratio = 1
    let nodes = []
    const pointer = { x: -1000, y: -1000 }

    const createNodes = () => {
      const count = coarsePointer ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP
      nodes = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
        radius: index % 9 === 0 ? 1.8 : 1.1,
        gold: index % 11 === 0
      }))
    }

    const resize = () => {
      width = window.innerWidth
      height = window.innerHeight
      ratio = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.floor(width * ratio)
      canvas.height = Math.floor(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      createNodes()
    }

    const draw = () => {
      context.clearRect(0, 0, width, height)

      nodes.forEach((node, index) => {
        if (!reduceMotion) {
          node.x += node.vx
          node.y += node.vy
          if (node.x < -20) node.x = width + 20
          if (node.x > width + 20) node.x = -20
          if (node.y < -20) node.y = height + 20
          if (node.y > height + 20) node.y = -20
        }

        const pointerDistance = Math.hypot(node.x - pointer.x, node.y - pointer.y)
        const active = pointerDistance < 180
        context.beginPath()
        context.fillStyle = node.gold
          ? `rgba(247, 215, 132, ${active ? 0.72 : 0.24})`
          : `rgba(125, 211, 252, ${active ? 0.78 : 0.2})`
        context.arc(node.x, node.y, active ? node.radius + 0.6 : node.radius, 0, Math.PI * 2)
        context.fill()

        for (let next = index + 1; next < nodes.length; next += 1) {
          const other = nodes[next]
          const distance = Math.hypot(node.x - other.x, node.y - other.y)
          if (distance > 132) continue

          const nearPointer = Math.min(pointerDistance, Math.hypot(other.x - pointer.x, other.y - pointer.y)) < 190
          context.beginPath()
          context.strokeStyle = `rgba(96, 165, 250, ${nearPointer ? 0.22 : 0.055})`
          context.lineWidth = nearPointer ? 0.8 : 0.45
          context.moveTo(node.x, node.y)
          context.lineTo(other.x, other.y)
          context.stroke()
        }
      })

      if (!reduceMotion) frame = window.requestAnimationFrame(draw)
    }

    const onPointerMove = (event) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
      document.documentElement.style.setProperty('--osint-pointer-x', `${event.clientX}px`)
      document.documentElement.style.setProperty('--osint-pointer-y', `${event.clientY}px`)
    }

    resize()
    draw()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })

    const sections = Array.from(document.querySelectorAll('main > section'))
    sections.forEach((section, index) => {
      section.classList.add('osint-reveal-section')
      section.style.setProperty('--osint-reveal-delay', `${Math.min(index * 35, 180)}ms`)
    })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('osint-reveal-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      observer.disconnect()
    }
  }, [])

  return (
    <div className="osint-motion-layer" aria-hidden="true">
      <canvas ref={canvasRef} className="osint-network-canvas" />
      <div className="osint-pointer-aura" />
      <div className="osint-ambient-scan" />
    </div>
  )
}

