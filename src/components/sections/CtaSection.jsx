'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { CABINET } from '@/lib/cabinet.config'

export default function CtaSection({ locale }) {
  const t = useTranslations('cta')
  const num = CABINET.contact.whatsapp.replace(/\D/g, '')
  const msg = encodeURIComponent(locale === 'ar'
    ? 'السلام عليكم، أود الاستفسار عن خدمات مكتب الحمداني.'
    : 'Bonjour, je souhaite me renseigner sur les services du Cabinet Elhamadani.'
  )

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 text-[300px] leading-none opacity-[0.03] flex items-center pointer-events-none select-none"
        style={{ justifyContent: locale === 'ar' ? 'flex-start' : 'flex-end', padding: '0 40px' }}>
        ⚖
      </div>
      <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">{t('title')}</h2>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-xl mx-auto">{t('sub')}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href={`https://wa.me/${num}?text=${msg}`} target="_blank" rel="noopener" className="btn-primary">
              <span>💬</span> {t('btn_wa')}
            </a>
            <Link href={`/${locale}/contact`} className="btn-outline-white">{t('btn_form')}</Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
