import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Curriculum V2.3 — AI Tracker",
  description: "Personal AI curriculum tracker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full`} style={{ background: '#0a0e1a' }}>
      <body className="min-h-full flex flex-col" style={{ background: '#0a0e1a', color: '#e5e7eb' }}>
        <Nav />
        <main className="flex-1 px-6 py-6 max-w-6xl mx-auto w-full">
          {children}
        </main>
      </body>
    </html>
  );
}
