import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Footer from './footer'
import Navbar from './navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
        <div className="md:container md:mx-auto  bg-white" suppressHydrationWarning={true}>
          <div className="flex flex-row">
            <div className="basis-1/4 border-r-2 min-h-lvh">
              <Navbar ></Navbar>
            </div>
            <main className="basis-3/4 flex flex-col">
              <div className='min-height: 100vh;'>
                {children}
              </div>
              <div className='w-full mt-auto'>
                <Footer />
              </div>

            </main>
          </div>

        </div>
      </body>
    </html>
  )
}
