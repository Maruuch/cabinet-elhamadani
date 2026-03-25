'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function AboutSection({ locale }) {
  const t = useTranslations('about')
  const isRTL = locale === 'ar'

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isRTL ? '' : ''}`}>
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 32 : -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className={`relative ${isRTL ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <div className="relative aspect-[4/5] bg-slate-100 rounded-3xl flex items-center justify-center overflow-hidden">
              <img
                src={CABINET.avocat.photo}
                alt={CABINET.avocat.nom[locale]}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <div className="flex flex-col items-center gap-3 text-slate-400">
                <span className="text-6xl">âï¸</span>
                <span className="text-sm">{locale === 'ar' ? '[ØµÙØ±Ø© Ø§ÙÙØ­Ø§ÙÙØ©]' : '[Photo Ã  ajouter]'}</span>
              </div>
            </div>
            {/* Accent */}
            <div className={`absolute top-[-20px] w-20 h-20 bg-gold/15 rounded-full ${isRTL ? 'left-[-20px]' : 'right-[-20px]'}`} />
            {/* Badge */}
            <div className={`absolute bottom-7 bg-navy text-white px-5 py-3.5 rounded-xl text-sm font-bold shadow-xl ${isRTL ? '-right-5' : '-left-5'}`}>
              â {locale === 'ar' ? 'ÙÙØ¦Ø© Ø§ÙØ¯Ø§Ø± Ø§ÙØ¨ÙØ¸Ø§Ø¡' : 'Barreau de Casablanca'}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -32 : 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className={isRTL ? 'lg:order-2' : 'lg:order-1'}
          >
            <div className="section-label">{t('label')}</div>
            <h2 className="section-title">{CABINET.avocat.nom[locale]}</h2>
            <p className="text-slate-500 leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-slate-500 leading-relaxed mb-8">{t('p2')}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {t.raw('tags').map((tag) => (
                <span key={tag} className="bg-slate-100 text-navy px-4 py-2 rounded-full text-sm font-bold hover:bg-navy hover:text-white transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <Link href={`/${locale}/about`} className="btn-navy">
              {t('read_more')} <span>{locale === 'ar' ? 'â' : 'â'}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
