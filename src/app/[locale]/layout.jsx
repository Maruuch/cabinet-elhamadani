import { notFound } from 'next/navigation'
import { I18nProvider } from '@/lib/i18n'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'

const locales = ['ar', 'fr']

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export function generateMetadata({ params: { locale } }) {
  const titles = {
    ar: 'مكتب الحمداني للمحاماة — الٯار البيضاء',
    fr: 'Cabinet Elhamadani — Avocate à Casablanca',
  }
  const descs = {
    ar: 'محامية بهيئة الدار البيظاء — خبرة قانونية راسخة في المظرب',
    fr: 'Avocate au Barreau de Casablanca — Expertise juridique au Maroc',
  }
  return {
    title: titles[locale] || titles.ar,
    description: descs[locale] || descs.ar,
  }
}

export default async function LocaleLayout({ children, params: { locale } }) {
  if (!locales.includes(locale)) notFound()

  const messages = (await import(`../../../messages/${locale}.json`)).default
  const isRTL = locale === 'ar'

  return (
    <>
      {/* Script inline : définit lang + dir sur <html> AVANT hydratation React */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang='${locale}';document.documentElement.dir='${isRTL ? 'rtl' : 'ltr'}'`,
        }}
      />
      <I18nProvider locale={locale} messages={messages}>
        <div className={isRTL ? 'font-arabic' : 'font-sans'}>
          <Navbar />
          <main>{children}</main>
          <Footer locale={locale} />
          <WhatsAppFloat />
        </div>
      </I18nProvider>
    </>
  )
}
