'use client'
/**
 * Système i18n custom — remplace next-intl côté serveur.
 * Mêmes APIs : useTranslations(namespace), useLocale()
 * Aucun plugin Next.js requis.
 */
import { createContext, useContext } from 'react'

const I18nContext = createContext({ locale: 'ar', messages: {} })

export function I18nProvider({ locale, messages, children }) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  )
}

/**
 * Drop-in replacement for next-intl's useTranslations(namespace)
 * Supports: t('key') and t.raw('key') for arrays/objects
 */
export function useTranslations(namespace) {
  const { messages } = useContext(I18nContext)
  const ns = messages?.[namespace] ?? {}

  function t(key) {
    const val = ns[key]
    return val !== undefined ? val : key
  }

  t.raw = function (key) {
    const val = ns[key]
    return val !== undefined ? val : key
  }

  return t
}

/**
 * Drop-in replacement for next-intl's useLocale()
 */
export function useLocale() {
  return useContext(I18nContext).locale
}
