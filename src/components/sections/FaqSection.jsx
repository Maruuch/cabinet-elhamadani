'use client'
import { useTranslations } from '@/lib/i18n'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function FaqSection({ locale }) {
  const t = useTranslations('faq')
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <div className="section-label">{t('label')}</div>
          <h2 className="section-title">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CABINET.faq.map((item, i) => (
            <div key={i}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${open === i ? 'border-gold shadow-lg' : 'border-slate-100'}`}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-start gap-4"
              >
                <span className="text-navy font-bold text-sm">{item.q[locale]}</span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-lg font-bold transition-all duration-300 ${open === i ? 'bg-navy text-white rotate-45' : 'bg-slate-100 text-slate-500'}`}>
                  +
                </div>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-500 text-sm leading-relaxed">{item.a[locale]}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
