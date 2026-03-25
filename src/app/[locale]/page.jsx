import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import ProcessSection from '@/components/sections/ProcessSection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'

export default function HomePage({ params: { locale } }) {
  return (
    <>
      <HeroSection locale={locale} />
      <StatsBar locale={locale} />
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} />
      <ProcessSection locale={locale} />
      <FaqSection locale={locale} />
      <CtaSection locale={locale} />
    </>
  )
}
