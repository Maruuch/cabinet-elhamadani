'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function ServicesSection({ locale }) {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="section-label justify-center">{t('label')}</div>
          <h2 className="section-title text-white">{t('title')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {CABINET.services.map((s, i) => (
            <motion.div key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Link href={`/${locale}/services#${s.slug}`}
                className="card bg-white/[0.06] border-white/10 hover:bg-white/[0.11] hover:border-gold/50 hover:shadow-[0_18px_40px_rgba(0,0,0,0.35)] p-5 group flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 bg-white/10 group-hover:bg-gold/25 rounded-xl flex items-center justify-center text-2xl transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-white font-bold text-sm leading-snug">{s.title[locale]}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`/${locale}/services`}
            className="btn-outline-white text-sm px-6 py-2.5"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
