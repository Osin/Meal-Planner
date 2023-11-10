import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react';
import CssBaseline from '@mui/material/CssBaseline';
import * as React from 'react';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  applicationName: 'Meal Planner',
  keywords: ['Meal', 'Planner', 'React', 'Next', 'Next.js', 'Vercel'],
  appleWebApp: true,
  openGraph:{
    url: 'http://meal-planner-weld.vercel.app',
    type: 'website',
    title: 'Meal Planner',
    description: 'Plan your meal for the week',
    siteName: 'Meal Planner',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      {children}
      <CssBaseline />
      <Analytics />
      </body>
    <Script crossOrigin={'anonymous'} strategy={'lazyOnload'} src={"https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6227540516996137"} ></Script>
    </html>
  )
}
