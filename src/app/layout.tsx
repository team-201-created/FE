import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { MockProvider } from '@/mocks/MockProvider'
import { GlobalModal } from '@/components/common/Modal/GlobalModal'
import ClientLayoutInitializer from '@/components/common/ClientLayoutInitializer'
import './globals.css'

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  variable: '--font-pretendard',
})

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL!

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Ozent | 나의 향기를 찾다',
    template: '%s | Ozent',
  },
  description:
    '취향 테스트·웰니스 진단·AI 비주얼 분석으로 나에게 꼭 맞는 향기와 제품을 한번에 찾아드립니다.',
  keywords: [
    '향기 추천',
    '향수 추천',
    '퍼퓸',
    '향기 테스트',
    'AI 분석',
    '웰니스',
    'Ozent',
    '향기 플랫폼',
  ],
  authors: [{ name: 'Ozent' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: BASE_URL,
    siteName: 'Ozent',
    title: 'Ozent | 나의 향기를 찾다',
    description:
      '취향 테스트·웰니스 진단·AI 비주얼 분석으로 나에게 꼭 맞는 향기와 제품을 한번에 찾아드립니다.',
    images: [
      {
        url: '/img/landing.jpg',
        width: 1200,
        height: 630,
        alt: 'Ozent — 나만의 향기 추천 플랫폼',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ozent | 나의 향기를 찾다',
    description:
      '취향 테스트·웰니스 진단·AI 비주얼 분석으로 나에게 꼭 맞는 향기와 제품을 한번에 찾아드립니다.',
    images: ['/img/landing.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [{ url: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Ozent',
    url: BASE_URL,
    description:
      '취향 테스트·웰니스 진단·AI 비주얼 분석으로 나에게 꼭 맞는 향기와 제품을 한번에 찾아드립니다.',
    inLanguage: 'ko-KR',
    publisher: {
      '@type': 'Organization',
      name: 'Ozent',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.svg`,
      },
    },
  }

  return (
    <html lang="ko">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${pretendard.variable} flex min-h-screen flex-col antialiased`}
      >
        <MockProvider>
          <ClientLayoutInitializer>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <div id="modal-root" />
            <GlobalModal />
          </ClientLayoutInitializer>
        </MockProvider>
      </body>
    </html>
  )
}
