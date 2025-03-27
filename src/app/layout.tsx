import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from 'next/script';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MoyDom Real Estate",
  description: "Find your perfect home",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    minimumScale: 1,
    userScalable: false,
  },
  other: {
    'user-scalable': '0',
    'apple-mobile-web-app-capable': 'yes',
    'viewport-fit': 'cover',
    'HandheldFriendly': 'true'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="overscroll-none">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="HandheldFriendly" content="true" />
        
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
        
        <Script
          id="prevent-zoom"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('touchstart', (event) => {
                if (event.touches.length > 1) {
                  event.preventDefault();
                }
              }, { passive: false });
              
              document.addEventListener('gesturestart', (event) => {
                event.preventDefault();
              }, { passive: false });
            `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased touch-manipulation overflow-x-hidden`}
      >
        <main className="scrollbar-none flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}