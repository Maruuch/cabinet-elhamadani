'use client'
import { useTranslations } from '@/lib/i18n'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function ProcessSection({ locale }) {
  const t = useTranslations('process')

  return (
    <section id="process" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-label justify-center">{t('label')}</div>
          <h2 className="section-title">{t('title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CABINET.process.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-navy font-extrabold text-lg shadow-md group-hover:bg-navy group-hover:text-gold group-hover:border-navy group-hover:scale-110 transition-all duration-300">
                {step.num}
              </div>
              <h3 className="font-extrabold text-navy text-sm mb-2">{step.title[locale]}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{step.desc[locale]}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
