'use client'
import { useTranslations } from '@/lib/i18n'
import Link from 'next/link'
import { CABINET } from '@/lib/cabinet.config'

export default function Footer({ locale }) {
  const t = useTranslations('footer')
  const nav = useTranslations('nav')
  const num = CABINET.contact.whatsapp.replace(/\D/g, '')

  return (
    <footer className="bg-[#111827] text-white/50 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-white font-extrabold text-lg mb-1">{CABINET.nom[locale]}</div>
            <div className="text-sm mb-5">{CABINET.avocat.titre[locale]}</div>
            <div className="flex gap-2">
              <a href={CABINET.reseaux.linkedin} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors text-sm font-bold">in</a>
              <a href={CABINET.reseaux.facebook} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-gold transition-colors text-sm font-bold">f</a>
              <a href={`https://wa.me/${num}`} className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-[#25D366] transition-colors text-sm">💬</a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <div className="text-white font-bold text-sm mb-4 tracking-wide">{t('links_title')}</div>
            <div className="flex flex-col gap-2.5">
              {[
                { href: `/${locale}`, label: nav('home') },
                { href: `/${locale}/about`, label: nav('about') },
                { href: `/${locale}/services`, label: nav('services') },
                { href: `/${locale}/contact`, label: nav('contact') },
                { href: `/${locale}/mentions-legales`, label: t('legal') },
              ].map(l => (
                <Link key={l.href} href={l.href} className="text-sm text-white/45 hover:text-gold transition-colors">{l.label}</Link>
              ))}
            </div>
          </div>
          {/* Contact */}
          <div>
            <div className="text-white font-bold text-sm mb-4 tracking-wide">{t('contact_title')}</div>
            <div className="flex flex-col gap-2.5 text-sm">
              <span>📍 {CABINET.contact.adresse[locale]}</span>
              <a href={`mailto:${CABINET.contact.email}`} className="hover:text-gold transition-colors">✉ {CABINET.contact.email}</a>
              <a href={`https://wa.me/${num}`} className="hover:text-gold transition-colors">💬 WhatsApp</a>
              <span>🕐 {CABINET.contact.horaires[locale]}</span>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-7 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>{t('copyright')}</span>
          <Link href={`/${locale}/mentions-legales`} className="hover:text-gold/60 transition-colors">{t('legal')}</Link>
        </div>
      </div>
    </footer>
  )
}
