import HeroSection from '@/components/sections/HeroSection'
import StatsBar from '@/components/sections/StatsBar'
import ServicesSection from '@/components/sections/ServicesSection'
import AboutSection from '@/components/sections/AboutSection'
import FaqSection from '@/components/sections/FaqSection'
import CtaSection from '@/components/sections/CtaSection'
import PageBackdrop from '@/components/ui/PageBackdrop'

export default function HomePage({ params: { locale } }) {
  return (
    <>
      {/* Photo fixe derrière toute la page : les sections sont transparentes */}
      <PageBackdrop />
      <HeroSection locale={locale} />
      <StatsBar locale={locale} />
      <ServicesSection locale={locale} />
      <AboutSection locale={locale} />
      <FaqSection locale={locale} />
      <CtaSection locale={locale} />
    </>
  )
}
