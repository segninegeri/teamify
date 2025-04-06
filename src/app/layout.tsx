import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import PageTransitionProvider from "../components/PageTransitionProvider"

export const metadata: Metadata = {
  title: "Teamify - Your Virtual Office",
  description: "Set up your virtual office and manage your team efficiently",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <PageTransitionProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </PageTransitionProvider>
      </body>
    </html>
  )
}

