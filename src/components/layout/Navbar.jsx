'use client'
import { useTranslations, useLocale } from '@/lib/i18n'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { CABINET } from '@/lib/cabinet.config'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const otherLocale = locale === 'ar' ? 'fr' : 'ar'
  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/services`, label: t('services') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  const rdvHref = `/${locale}/rdv`

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/95 backdrop-blur-xl border-b border-slate-100 transition-all duration-300 ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-3 flex-shrink-0">
            <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center text-white text-xl">⚖</div>
            <div className="leading-tight">
              <div className="text-[15px] font-extrabold text-navy">{CABINET.nom[locale]}</div>
              <div className="text-[11px] text-slate-400">{CABINET.avocat.titre[locale]}</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-500 hover:text-navy hover:bg-slate-100 transition-all duration-200">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Lang Toggle */}
            <div className="flex items-center bg-slate-100 rounded-full p-1 gap-0.5">
              <Link href={`/ar${typeof window !== 'undefined' ? window.location.pathname.replace(`/${locale}`, '') : ''}`}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${locale === 'ar' ? 'bg-navy text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                AR
              </Link>
              <Link href={`/fr${typeof window !== 'undefined' ? window.location.pathname.replace(`/${locale}`, '') : ''}`}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${locale === 'fr' ? 'bg-navy text-white' : 'text-slate-400 hover:text-slate-600'}`}>
                FR
              </Link>
            </div>
            <Link href={rdvHref} className="hidden md:flex btn-primary text-sm px-5 py-2.5">
              {t('rdv')}
            </Link>
            {/* Burger */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 flex flex-col gap-1.5" aria-label="Menu">
              <span className={`block w-5 h-0.5 bg-navy rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}/>
              <span className={`block w-5 h-0.5 bg-navy rounded transition-all ${menuOpen ? 'opacity-0' : ''}`}/>
              <span className={`block w-5 h-0.5 bg-navy rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}/>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] z-40 bg-white flex flex-col p-6 gap-2 md:hidden">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-5 py-4 rounded-xl text-base font-semibold text-navy hover:bg-slate-100 transition-all">
              {link.label}
            </Link>
          ))}
          <Link href={rdvHref} onClick={() => setMenuOpen(false)} className="btn-primary mt-4 justify-center">
            {t('rdv')}
          </Link>
        </div>
      )}
    </>
  )
}
