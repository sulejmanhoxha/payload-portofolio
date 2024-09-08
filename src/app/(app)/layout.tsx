import { ThemeProvider } from '@/components/header/ThemeProvider'
import type { Metadata } from 'next'
import { Nunito_Sans as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import MouseAura from '@/components/MouseAura'
import Header from '@/components/header/Header'
import Footer from '@/components/sections/Footer'
import Navbar from '@/components/header/Navbar'
import ColorPalette from '@/components/ColorPalette'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://nextjs-ai-langchain-portfolio.vercel.app/'),
  alternates: {
    canonical: 'https://nextjs-ai-langchain-portfolio.vercel.app/',
  },
  title: {
    template: '%s | Sulejman Hoxha',
    default: 'Sulejman Hoxha',
  },
  description:
    'Sulejman Hoxha is a full-stack developer proficient in both front-end design and back-end functionality.',
  keywords:
    'Sulejman Hoxha, Full-Stack Developer, Web Development, Programmer, FrontEnd, BackEnd, Software Engineer, Software Developer',
  openGraph: {
    locale: 'en_US',
    siteName: 'Sulejman Hoxha',
    type: 'website',
    title: 'Sulejman Hoxha',
    description:
      'Sulejman Hoxha is a Full-Stack Software Developer, proficient in both front-end design and back-end functionality.',
    url: 'https://nextjs-ai-langchain-portfolio.vercel.app/',
    images: [
      {
        url: './sulejman_hoxha.png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sulejman Hoxha',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
        <ThemeProvider attribute="class">
          <MouseAura />

          <main className="mx-auto max-w-3xl px-6">
            <Header />
            <ColorPalette />
            <Navbar />
            {children}
            <Footer />
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
