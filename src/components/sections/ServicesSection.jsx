'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function ServicesSection({ locale }) {
  const t = useTranslations('services')

  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="section-label justify-center">{t('label')}</div>
          <h2 className="section-title">{t('title')}</h2>
          <p className="section-sub mx-auto max-w-xl">{t('sub')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CABINET.services.map((s, i) => (
            <motion.div key={s.slug}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="card p-8 group cursor-default relative overflow-hidden"
            >
              {/* Gold bottom bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold to-gold-light scale-x-0 group-hover:sscale-x-100 transition-transform duration-500 origin-left" />

              <div className="w-14 h-14 bg-slate-100 group-hover:bv-navy rounded-xl flex items-center justify-center text-2xl mb-5 transition-colors duration-300">
                {s.icon}
              </div>
              <h3 className="text-navy font-extrabold text-base mb-2.5">{s.title[locale]}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-5">{s.description[locale]}</p>
              <Link href={`/${locale}/services#${s.slug}`} className="innine-flex items-center gap-1.5 text-gold text-sm font-bold hover:gap-3 transition-all">
                {t('read_more')} <span>{locale === 'ar' ? 'â' : 'â'}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
