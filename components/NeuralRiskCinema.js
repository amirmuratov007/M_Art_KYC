import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, BrainCircuit, Pause, Play, ScanSearch, ShieldCheck, Sparkles } from 'lucide-react'

const scenes = [
  {
    label: 'Сигналы',
    title: 'Данные входят в контур',
    text: 'Документы, реестры, публикации и цифровые следы движутся отдельными потоками.',
    metric: '12 480',
    metricLabel: 'сигналов принято'
  },
  {
    label: 'Связи',
    title: 'Сеть восстанавливает контекст',
    text: 'Повторяющиеся адреса, люди, компании и события соединяются в единую структуру.',
    metric: '1 284',
    metricLabel: 'связи подтверждены'
  },
  {
    label: 'Аномалия',
    title: 'Риск выходит из общего шума',
    text: 'Отдельный кластер ведет к скрытой компании, долгу и измененному платежному маршруту.',
    metric: '7',
    metricLabel: 'сигналов требуют внимания'
  },
  {
    label: 'Решение',
    title: 'Факты превращаются в действие',
    text: 'Система сохраняет источники, объясняет риск и предлагает условия безопасного продолжения.',
    metric: '68 / 100',
    metricLabel: 'уровень риска'
  }
]

function randomGenerator(seed) {
  let value = seed >>> 0
  return () => {
    value += 0x6D2B79F5
    let result = value
    result = Math.imul(result ^ (result >>> 15), result | 1)
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61)
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296
  }
}

function shieldPoint(index, count) {
  const outlineCount = Math.floor(count * 0.74)
  if (index >= outlineCount) {
    const progress = (index - outlineCount) / Math.max(count - outlineCount - 1, 1)
    if (progress < 0.42) {
      const part = progress / 0.42
      return { x: -0.28 + part * 0.2, y: 0.05 + part * 0.22, z: 0.1 }
    }
    const part = (progress - 0.42) / 0.58
    return { x: -0.08 + part * 0.46, y: 0.27 - part * 0.55, z: 0.1 }
  }

  const points = [
    [-0.62, -0.48], [0, -0.78], [0.62, -0.48], [0.53, 0.18],
    [0.3, 0.58], [0, 0.82], [-0.3, 0.58], [-0.53, 0.18], [-0.62, -0.48]
  ]
  const scaled = (index / Math.max(outlineCount - 1, 1)) * (points.length - 1)
  const segment = Math.min(Math.floor(scaled), points.length - 2)
  const progress = scaled - segment
  return {
    x: points[segment][0] + (points[segment + 1][0] - points[segment][0]) * progress,
    y: points[segment][1] + (points[segment + 1][1] - points[segment][1]) * progress,
    z: Math.sin(index * 0.8) * 0.08
  }
}

function targetFor(node, index, count, scene, time) {
  if (scene === 0) {
    const lane = (index % 5) - 2
    const travel = (node.seed + time * 0.000035) % 1
    return {
      x: -1.05 + travel * 2.05,
      y: lane * 0.24 + Math.sin(index * 1.7 + time * 0.0012) * 0.035,
      z: node.depth * 1.4 - 0.7
    }
  }

  if (scene === 1) {
    const angle = index * 2.39996 + time * 0.00012
    const latitude = Math.acos(1 - 2 * ((index + 0.5) / count))
    const radius = 0.76 + Math.sin(index * 0.9) * 0.08
    return {
      x: Math.cos(angle) * Math.sin(latitude) * radius,
      y: Math.cos(latitude) * radius,
      z: Math.sin(angle) * Math.sin(latitude) * radius
    }
  }

  if (scene === 2) {
    const risk = node.risk
    const angle = index * 2.18 + time * (risk ? 0.00022 : 0.00006)
    const radius = risk ? 0.18 + node.seed * 0.22 : 0.35 + node.seed * 0.5
    return {
      x: (risk ? 0.56 : -0.2) + Math.cos(angle) * radius,
      y: (risk ? -0.28 : 0.08) + Math.sin(angle * 1.13) * radius * 0.72,
      z: risk ? 0.55 + node.depth * 0.3 : node.depth - 0.5
    }
  }

  return shieldPoint(index, count)
}

export default function NeuralRiskCinema() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [cycleVersion, setCycleVersion] = useState(0)
  const [inView, setInView] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const canvasRef = useRef(null)
  const visualRef = useRef(null)
  const sectionRef = useRef(null)
  const activeRef = useRef(active)
  const pointerRef = useRef({ x: 0, y: 0 })

  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return undefined
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.18 })
    observer.observe(section)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (paused || !inView || reduceMotion) return undefined
    const interval = window.setInterval(() => setActive((current) => (current + 1) % scenes.length), 5200)
    return () => window.clearInterval(interval)
  }, [cycleVersion, inView, paused, reduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    const visual = visualRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !visual || !context) return undefined

    const random = randomGenerator(1941)
    const count = 104
    const nodes = Array.from({ length: count }, (_, index) => ({
      x: random() * 2 - 1,
      y: random() * 2 - 1,
      z: random() * 2 - 1,
      seed: random(),
      depth: random(),
      risk: index >= 84
    }))
    let width = 0
    let height = 0
    let frame = 0
    let lastTime = 0

    const resize = () => {
      const bounds = visual.getBoundingClientRect()
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = Math.max(Math.round(bounds.width), 1)
      height = Math.max(Math.round(bounds.height), 1)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const project = (node) => {
      const perspective = 1 / (1.75 - node.z * 0.23)
      const pointerX = pointerRef.current.x * (0.05 + perspective * 0.04)
      const pointerY = pointerRef.current.y * (0.04 + perspective * 0.03)
      return {
        x: width * (0.5 + (node.x + pointerX) * 0.45 * perspective),
        y: height * (0.5 + (node.y + pointerY) * 0.54 * perspective),
        size: 1.2 + perspective * 2.6,
        depth: perspective
      }
    }

    const draw = (time = 0) => {
      if (!width || !height) return
      const scene = reduceMotion ? 3 : activeRef.current
      const delta = Math.min((time - lastTime) / 16.67 || 1, 2)
      lastTime = time
      context.clearRect(0, 0, width, height)

      context.strokeStyle = 'rgba(125, 211, 252, 0.07)'
      context.lineWidth = 1
      for (let row = 1; row < 7; row += 1) {
        const y = (height / 7) * row
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y + pointerRef.current.y * 8)
        context.stroke()
      }

      const projected = nodes.map((node, index) => {
        const target = targetFor(node, index, count, scene, time)
        const easing = (scene === 0 ? 0.085 : 0.045) * delta
        node.x += (target.x - node.x) * easing
        node.y += (target.y - node.y) * easing
        node.z += (target.z - node.z) * easing
        return { ...project(node), risk: scene === 2 && node.risk, index }
      })

      if (scene === 3) {
        const outlineCount = Math.floor(count * 0.74)
        const groups = [[0, outlineCount], [outlineCount, count]]
        context.strokeStyle = 'rgba(247, 215, 132, 0.46)'
        context.lineWidth = 1.15
        for (const [start, end] of groups) {
          context.beginPath()
          context.moveTo(projected[start].x, projected[start].y)
          for (let index = start + 1; index < end; index += 1) context.lineTo(projected[index].x, projected[index].y)
          context.stroke()
        }
      } else for (let left = 0; left < projected.length; left += 1) {
        for (let right = left + 1; right < projected.length; right += 1) {
          const a = projected[left]
          const b = projected[right]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const threshold = scene === 0 ? 42 : 78
          if (distance > threshold) continue

          const intensity = (1 - distance / threshold) * Math.min(a.depth, b.depth)
          context.strokeStyle = a.risk || b.risk
            ? `rgba(248, 113, 113, ${intensity * 0.55})`
            : `rgba(125, 211, 252, ${intensity * 0.34})`
          context.lineWidth = 0.7
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      for (const point of projected) {
        const pulse = 0.78 + Math.sin(time * 0.002 + point.index) * 0.22
        const color = point.risk ? '#f87171' : scene === 3 ? '#f7d784' : point.index % 9 === 0 ? '#86efac' : '#7dd3fc'
        context.fillStyle = color
        context.shadowColor = color
        context.shadowBlur = point.risk ? 16 : 8
        context.beginPath()
        context.arc(point.x, point.y, point.size * pulse, 0, Math.PI * 2)
        context.fill()
      }
      context.shadowBlur = 0

      if (!reduceMotion && inView) frame = window.requestAnimationFrame(draw)
    }

    const observer = new ResizeObserver(() => {
      resize()
      if (reduceMotion || !inView) draw(performance.now())
    })
    observer.observe(visual)
    resize()
    draw(performance.now())

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [inView, reduceMotion])

  const movePointer = (event) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerRef.current = {
      x: ((event.clientX - bounds.left) / bounds.width - 0.5) * 2,
      y: ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }
  }

  const resetPointer = () => { pointerRef.current = { x: 0, y: 0 } }

  return (
    <section id="neural-cinema" ref={sectionRef} data-neural-cinema className="neural-cinema relative z-10 overflow-hidden border-y border-white/10">
      <div className="neural-cinema-scan" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-5 sm:py-24 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div className="relative z-10">
          <div className="flex items-center gap-3 text-sm uppercase text-[#F7D784]">
            <BrainCircuit className="h-5 w-5" /> Нейронная кинолента
          </div>
          <h2 className="mt-5 max-w-xl text-3xl font-semibold leading-tight sm:text-5xl">Как система учится видеть риск в информационном шуме</h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-white/64 sm:text-lg">Живое полотно показывает путь сигнала: от разрозненных документов до связи, которую можно объяснить и проверить вручную.</p>

          <div className="mt-8 flex items-end gap-4 border-l-2 border-[#D6A84F] pl-5" aria-live="polite">
            <strong className="text-3xl font-semibold text-white sm:text-4xl">{scenes[active].metric}</strong>
            <span className="pb-1 text-sm text-white/48">{scenes[active].metricLabel}</span>
          </div>

          <Link href="/risk-intelligence" className="mt-8 inline-flex items-center gap-3 text-sm font-semibold text-sky-200 transition hover:text-white">
            Открыть центр риск-аналитики <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div ref={visualRef} onPointerMove={movePointer} onPointerLeave={resetPointer} className="neural-cinema-visual relative min-h-[480px]" aria-label="Анимация анализа сигналов и формирования решения">
          <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
          <div className="neural-cinema-reticle" aria-hidden="true"><ScanSearch /></div>
          <div className="neural-cinema-status">
            {active === 0 && <Sparkles />}
            {active === 1 && <BrainCircuit />}
            {active === 2 && <ScanSearch />}
            {active === 3 && <ShieldCheck />}
            <span>{scenes[active].title}</span>
          </div>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4 lg:col-span-2">
          {scenes.map((scene, index) => (
            <button key={scene.label} type="button" onClick={() => { setActive(index); setCycleVersion((version) => version + 1) }} aria-pressed={active === index} className={`neural-cinema-step ${active === index ? 'neural-cinema-step-active' : ''}`}>
              <span>0{index + 1}</span>
              <strong>{scene.label}</strong>
              <small>{scene.text}</small>
            </button>
          ))}
          <button type="button" title={paused ? 'Продолжить фильм' : 'Остановить фильм'} aria-label={paused ? 'Продолжить фильм' : 'Остановить фильм'} onClick={() => setPaused((value) => !value)} className="neural-cinema-pause">
            {paused ? <Play /> : <Pause />}
          </button>
        </div>
      </div>
    </section>
  )
}
