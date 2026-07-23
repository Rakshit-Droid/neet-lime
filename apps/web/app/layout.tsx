import type { Metadata } from "next"
import Script from "next/script"
import { Geist, Geist_Mono, Oxanium } from "next/font/google"

import "@workspace/ui/globals.css"
import "./hourglass.css"
import "./glass.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@workspace/ui/lib/utils"

const fontSans = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

const fontHeading = Oxanium({ subsets: ["latin"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "NEET Companion: more rank, same hours",
  description:
    "Adaptive NEET prep, admission consultancy, and precision Marks-to-Rank and Rank-to-College predictors. Turn your score into a seat.",
}

// Applies the stored/system theme before paint, from the SERVER so no client
// component renders a <script> (which is what React 19 warns about).
const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(!t)t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontSans.variable, fontMono.variable, fontHeading.variable, "font-mono")}
    >
      <body>
        <Script id="theme-init" strategy="beforeInteractive">
          {THEME_SCRIPT}
        </Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
