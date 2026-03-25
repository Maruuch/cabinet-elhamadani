'use client'
import { useEffect, useRef, useState } from 'react'
import { CABINET } from '@/lib/cabinet.config'

function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
        const num = parseInt(target, 10)
        if (isNaN(num)) { setCount(target); return }
        const duration = 1800
        const start = performance.now()
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCount(Math.floor(eased * num))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.3 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return <span ref={ref} className="tabular-nums">{count}<span className="text-gold">{suffix}</span></span>
}

export default function StatsBar({ locale }) {
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {CABINET.stats.map((s, i) => (
            <div key={i} className="py-9 px-6 text-center hover:bg-slate-50 transition-colors">
              <div className="text-4xl font-extrabold text-navy leading-none mb-2">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <div className="text-slate-500 text-sm font-medium">{s.label[locale]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
