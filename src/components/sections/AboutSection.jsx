'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function AboutSection({ locale }) {
  const t = useTranslations('about')
  const isRTL = locale === 'ar'

  return (
    <section id="about" className="py-24 border-t border-white/10 overflow-hidden">
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
            <div className="relative aspect-[4/5] bg-white/[0.06] border border-white/10 rounded-3xl flex items-center justify-center overflow-hidden">
              <img
                src={CABINET.avocat.photo}
                alt={CABINET.avocat.nom[locale]}
                className="w-full h-full object-cover"
                // Si la photo manque, on la masque. Le `ref` couvre le cas où l'erreur
                // de chargement survient avant que React ait branché `onError`.
                ref={(img) => { if (img && img.complete && img.naturalWidth === 0) img.style.display = 'none' }}
                onError={(e) => { e.target.style.display = 'none' }}
              />
              {/* Visible tant que la photo de l'avocate n'est pas fournie */}
              <img src="/images/logo-mark.webp" alt="" width={480} height={446} className="w-3/5 max-w-[280px] h-auto" />
            </div>
            {/* Accent */}
            <div className={`absolute top-[-20px] w-20 h-20 bg-gold/15 rounded-full ${isRTL ? 'left-[-20px]' : 'right-[-20px]'}`} />
            {/* Badge */}
            <div className={`absolute bottom-7 bg-gold text-navy px-5 py-3.5 rounded-xl text-sm font-bold shadow-xl ${isRTL ? '-right-5' : '-left-5'}`}>
              ⚖ {locale === 'ar' ? 'هيئة الدار البيضاء' : 'Barreau de Casablanca'}
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
            <h2 className="section-title text-white">{CABINET.avocat.nom[locale]}</h2>
            <p className="text-white/80 leading-relaxed mb-4">{t('p1')}</p>
            <p className="text-white/80 leading-relaxed mb-8">{t('p2')}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {t.raw('tags').map((tag) => (
                <span key={tag} className="bg-white/10 text-white border border-white/10 px-4 py-2 rounded-full text-sm font-bold hover:bg-gold hover:text-navy hover:border-gold transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>

            <Link href={`/${locale}/about`} className="btn-outline-white">
              {t('read_more')} <span>{locale === 'ar' ? '←' : '→'}</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
