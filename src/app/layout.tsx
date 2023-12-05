import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sad\'s Training Service',
  description: 'RuneScape Training Services',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      <script src="//code.tidio.co/osphxw7dgtiezmzpocvbfft0wqzz6uzj.js" async></script>
      </body>
    </html>
  )
}
