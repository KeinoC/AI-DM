"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "./contexts/UserContext";
import { ChatProvider } from "./contexts/ChatContext";
import { GrimoireProvider } from "./contexts/GrimoireContext";
import { DNDApiProvider } from "./contexts/DNDApiContext";
import { AdventureProvider } from "./contexts/AdventureContext";
import NavBar from "./components/NavBar";
// import { Main } from 'next/document'

const otherTailwindClasses = " h-full min-h-screen items-center bg-gradient-to-r from-gray-900 to-slate-900"
const inter = Inter({ subsets: ["latin"] } );

export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <ChatProvider>
                <GrimoireProvider>
                    <DNDApiProvider>
                        <AdventureProvider>
                <html>
                    <body className={inter.className + otherTailwindClasses}>
                        <NavBar />
                        {children}
                    </body>
                </html>
                </AdventureProvider>
                </DNDApiProvider>
                </GrimoireProvider>
            </ChatProvider>
        </UserProvider>
    );
}
