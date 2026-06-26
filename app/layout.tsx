import type { Metadata } from 'next'
import { Syne, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const syne = Syne({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-syne'
});

const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://maruthapandi-portfolio.vercel.app'), // Update with your actual domain
  title: 'M. Marutha Pandi - Full Stack Developer | Portfolio Site',
  description: 'Full Stack Engineer specializing in Next.js, Node.js, and PERN & MERN Stack. Experienced in building scalable CRM, ERP, and E-commerce platforms with secure RBAC, containerization, and VPS hosting.',
  keywords: [
    'portfolio site',
    'portfolio site model',
    'templeted design',
    'M. Marutha Pandi',
    'full stack developer',
    'Next.js portfolio',
    'web developer portfolio template'
  ],
  verification: {
    google: 'CkD9KSOjgh-J6WA1ds0jMFiz3NEFPWyVZRNA5rduJIA',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-black">
      <body className={`${syne.variable} antialiased bg-black text-white overflow-x-hidden`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
