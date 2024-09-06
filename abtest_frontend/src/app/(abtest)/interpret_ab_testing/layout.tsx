import '../../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { AppContextProvider } from '@/context/AppContext'
import AuthContextProvider from '@/context/AuthContext'
import ABTestHeader from '@/components/ui/ABTestHeader'
import ABTestMenuBar from '@/components/ui/ABTestMenuBar'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { redirect } from 'next/navigation'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AB Testing Project',
  description: 'Generated Ab Testing Project',
}


export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  if(!session) redirect('/auth/signin')
  return (
    <html lang="en">
      <body className={inter.className}>{
        <AuthContextProvider session={session}>
          <AppContextProvider>
            <ABTestHeader/>
            <ABTestMenuBar/>         
            {children}
          </AppContextProvider>
        </AuthContextProvider>
      }
      </body>
    </html>
  )
}
