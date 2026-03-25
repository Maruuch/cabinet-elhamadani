import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata = { title: 'Cabinet Elhamadani' }

// Root layout MUST have <html> + <body>
// suppressHydrationWarning = locale layout modifie lang/dir via script inline
export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning className={jakarta.variable}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
