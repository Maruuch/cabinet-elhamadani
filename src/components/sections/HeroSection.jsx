'use client'
import { useRef } from 'react'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'
import HeroBackdrop from '@/components/ui/HeroBackdrop'

// Le scroll arrive par à-coups (un cran de molette = un saut). On le fait
// passer par un ressort sur-amorti : fond et contenu glissent vers leur
// position au lieu d'y sauter, sans rebond.
const SCROLL_SPRING = { stiffness: 120, damping: 26, mass: 0.5, restDelta: 0.0005 }

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] }
})

export default function HeroSection({ locale }) {
  const t = useTranslations('hero')
  const isRTL = locale === 'ar'
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  // 0 quand le hero occupe l'écran, 1 quand il en est sorti par le haut
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const smooth = useSpring(scrollYProgress, SCROLL_SPRING)
  // "Réduire les animations" : on fige la valeur à 0 au lieu de changer le
  // balisage (voir la note dans HeroBackdrop sur l'hydratation).
  const progress = useTransform(smooth, (v) => (reduce ? 0 : v))
  // Le contenu s'efface et remonte légèrement quand le hero quitte l'écran
  const contentY = useTransform(progress, [0, 1], ['0%', '-10%'])
  const contentOpacity = useTransform(progress, [0.3, 0.9], [1, 0])
  const num = CABINET.contact.whatsapp.replace(/\D/g, '')
  const waMsg = encodeURIComponent(locale === 'ar'
    ? 'السلام عليكم، أود الاستفسار عن خدمات مكتب الحمداني.'
    : 'Bonjour, je souhaite me renseigner sur les services du Cabinet Elhamadani.'
  )

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#0B1322] flex items-center overflow-hidden pt-[72px]">
      {/* Fond photo en relief, animé au scroll */}
      <HeroBackdrop progress={progress} sectionRef={sectionRef} isRTL={isRTL} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center w-full">
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

          <motion.p {...fadeUp(0.3)} className="text-white/80 text-base md:text-lg leading-relaxed mb-10 max-w-lg">
            {t('sub')}
          </motion.p>

          <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-10">
            <a href={`https://wa.me/${num}?text=${waMsg}`} target="_blank" rel="noopener" className="btn-primary">
              <span>💬</span> {t('cta_wa')}
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline-white">
              {t('cta_rdv')}
              <span aria-hidden="true">{isRTL ? '←' : '→'}</span>
            </Link>
          </motion.div>

          <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
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
          <div className="bg-[#0B1322]/60 border border-white/15 rounded-3xl p-9 relative shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-4 mb-7">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-navy text-xl font-extrabold flex-shrink-0">
                {CABINET.avocat.initiales}
              </div>
              <div>
                <div className="text-white font-bold text-base">{CABINET.avocat.nom[locale]}</div>

              </div>
            </div>


          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
