"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { UserProvider } from "./contexts/UserContext";
import NavBar from "./components/NavBar";
// import { Main } from 'next/document'

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <html>
                <body className={inter.className}>
                    {children}
                    </body>
            </html>
        </UserProvider>
    );
}
