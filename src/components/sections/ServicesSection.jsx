'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function ServicesSection({ locale }) {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="section-label justify-center">{t('label')}</div>
          <h2 className="section-title">{t('title')}</h2>
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
                className="card p-5 group flex flex-col items-center text-center gap-3 hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-slate-100 group-hover:bg-navy rounded-xl flex items-center justify-center text-2xl transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="text-navy font-bold text-sm leading-snug">{s.title[locale]}</h3>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href={`/${locale}/services`}
            className="btn-outline text-sm px-6 py-2.5"
          >
            {t('cta')}
          </Link>
        </div>
      </div>
    </section>
  )
}
