'use client'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from './contexts/UserContext';
import React, {useEffect} from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <UserProvider >
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </UserProvider>
  )
}
