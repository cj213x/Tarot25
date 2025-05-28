import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: 'TarotAI - Your Personal Astrological Guide',
  description: 'Get personalized Tarot, I Ching, and Saju readings powered by AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
