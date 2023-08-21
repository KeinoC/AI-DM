"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "./contexts/UserContext";
import { ChatProvider } from "./contexts/ChatContext";
import { GrimoireProvider } from "./contexts/GrimoireContext";
import { DNDApiProvider } from "./contexts/DNDApiContext";
import NavBar from "./components/NavBar";
// import { Main } from 'next/document'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <ChatProvider>
                <GrimoireProvider>
                    <DNDApiProvider>
                <html>
                    <body className={inter.className}>
                        <NavBar />
                        {children}
                    </body>
                </html>
                </DNDApiProvider>
                </GrimoireProvider>
            </ChatProvider>
        </UserProvider>
    );
}
