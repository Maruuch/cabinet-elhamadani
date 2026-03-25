'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }
})

export default function HeroSection({ locale }) {
  const t = useTranslations('hero')
  const isRTL = locale === 'ar'
  const num = CABINET.contact.whatsapp.replace(/\D/g, '')
  const waMsg = encodeURIComponent(locale === 'ar'
    ? 'السلام عليكم، أود الاستفسار عن خدمات مكتب الحمداني.'
    : 'Bonjour, je souhaite me renseigner sur les services du Cabinet Elhamadani.'
  )

  return (
    <section className="relative min-h-screen bg-navy flex items-center overflow-hidden pt-[72px]">
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
      {/* Glow */}
      <div className="absolute top-[-200px] right-[-100px] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,169,110,0.12) 0%, transparent 65%)' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
        {/* Content */}
        <div>
          <motion.div {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 bg-gold/10 text-gold border border-gold/25 px-4 py-1.5 rounded-full text-xs font-bold mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            {t('badge')}
          </motion.div>

          <motion.h1 {...fadeUp(0.2)} className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-5">
            {t('title')}<br/>
            <em className="text-gold not-italic">{t('title_em')}</em>
          </motion.h1>

          <motion.p {...fadeUp(0.3)} className="text-white/65 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            {t('sub')}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-10">
            <a href={`https://wa.me/${num}?text=${waMsg}`} target="_blank" rel="noopener" className="btn-primary">
              <span>💬</span> {t('cta_wa')}
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline-white">
              {t('cta_rdv')}
              <span className={isRTL ? '←' : '→'} />
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-4 text-white/40 text-sm">
            <span>{t('trust_1')}</span>
            <span className="w-px h-4 bg-white/20" />
            <span>{t('trust_2')}</span>
            <span className="w-px h-4 bg-white/20" />
            <span>{t('trust_3')}</span>
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="hidden lg:block"
        >
          <div className="bg-white/6 backdrop-blur-xl border border-white/10 rounded-3xl p-9 relative">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy text-xl font-extrabold flex-shrink-0">
                {CABINET.avocat.initiales}
              </div>
              <div>
                <div className="text-white font-bold text-base">{CABINET.avocat.nom[locale]}</div>
                <div className="text-white/55 text-xs mt-0.5">{CABINET.avocat.titre[locale]}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {CABINET.stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="bg-white/5 border border-white/8 rounded-xl p-4 text-center hover:bg-white/10 transition-colors"
                >
                  <span className="block text-2xl font-extrabold text-gold leading-none">{s.value}{s.suffix}</span>
                  <span className="text-white/45 text-[10px] mt-1 block">{s.label[locale]}</span>
                </motion.div>
              ))}
            </div>

            <div className="absolute -bottom-4 bg-gold text-navy px-5 py-2 rounded-full text-xs font-extrabold shadow-[0_4px_16px_rgba(201,169,110,0.4)]"
              style={isRTL ? { right: '28px' } : { left: '28px' }}>
              🏛 {locale === 'ar' ? 'هيئة الدار البيظاء' : 'Barreau de Casablanca'}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
