'use client'
import { useLocale } from '@/lib/i18n'
import { CABINET } from '@/lib/cabinet.config'

export default function WhatsAppFloat() {
  const locale = useLocale()
  const isRTL = locale === 'ar'
  const num = CABINET.contact.whatsapp.replace(/\D/g, '')
  const msg = encodeURIComponent(
    locale === 'ar'
      ? 'السلام عليكم، أود الاستفسار عن خدمات مكتب الحمداني.'
      : 'Bonjour, je souhaite me renseigner sur les services du Cabinet Elhamadani.'
  )

  return (
    <a
      href={`https://wa.me/${num}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-7 z-50 w-14 h-14 rounded-full bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.5)] flex items-center justify-center hover:scale-110 transition-transform duration-300 group ${isRTL ? 'left-7' : 'right-7'}`}
      aria-label="WhatsApp"
    >
      <svg className="w-7 h-7 fill-white" viewBox="0 0 32 32">
        <path d="M16 0C7.164 0 0 7.163 0 16c0 2.82.737 5.463 2.027 7.762L0 32l8.48-2.006A15.946 15.946 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.27 13.27 0 01-6.784-1.861l-.487-.29-4.994 1.184 1.198-4.883-.315-.503A13.31 13.31 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.3-10.01c-.4-.2-2.367-1.167-2.733-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.063-1.993-2.376-2.226-2.776-.234-.4-.026-.617.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.78-.655-.673-.9-.686-.233-.013-.5-.016-.767-.016-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.3 6.833 6.033.955.413 1.7.659 2.28.843.958.305 1.831.262 2.52.159.768-.115 2.367-.967 2.7-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/>
      </svg>
      <span className={`absolute whitespace-nowrap bg-navy text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none ${isRTL ? 'right-full mr-3' : 'left-full ml-3'}`}>
        {locale === 'ar' ? 'راسلنا الآن' : 'Écrivez-nous'}
      </span>
    </a>
  )
}
