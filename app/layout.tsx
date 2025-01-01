import type { Metadata } from 'next'
import { getServerSession } from 'next-auth'
import { Geist, Geist_Mono } from 'next/font/google'

import AuthButton from '@/app/components/AuthButton'

import AuthProvider from './components/SessionProvider'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Minlog',
  description: "Minjae's Tech Blog",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider session={session}>
          <main className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold">Minlog</h1>
              <AuthButton />
            </div>
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
}
