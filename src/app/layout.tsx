import Sidebar from '../components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Familjen_Grotesk } from 'next/font/google'
import Home from '../components/Home'
import AuthProvider from '@/components/AuthProvider'
import ToasterProvider from '@/components/ToasterProvider'

const inter = Familjen_Grotesk({ subsets: ['latin'], weight: '400' })

export const metadata: Metadata = {
  title: 'SHIPMENT TRACKER',
  description: 'TRACKING WEBSITE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <div className="h-screen bg-cover bg-gradient-to-r from-indigo-500 to-emerald-500  min-[320px]:text-center max-[600px]:bg-sky-300">

       <main>
      <ToasterProvider/>
       <AuthProvider>
          {children}
        </AuthProvider> 
       </main>
      </div>
      </body>
    </html>
  )
}
