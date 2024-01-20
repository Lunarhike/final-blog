import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "@/styles//globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: {
    default: "Lunarhike",
    template: `%s - Lunarhike`,
  },
  description: "Gaming blog - my Xbox, my reviews, and I.",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Game Pass",
    "Metacritic",
    "Xbox",
    "Reviews",
    "Gaming",
  ],
  authors: [
    {
      name: "Adam Ksiazek",
      url: "https://adam-ksiazek-portfolio.vercel.app/",
    },
  ],
  creator: "Adam Ksiazek",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

const onest = Manrope({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  adjustFontFallback: false,
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-code",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-body",
          inter.variable,
          jetbrains.variable,
          onest.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              <SiteHeader />
              {children}
              <SiteFooter />
            </main>
          </div>
          <TailwindIndicator />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
