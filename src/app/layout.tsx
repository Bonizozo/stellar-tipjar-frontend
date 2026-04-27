import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

import { CookieConsent } from "@/components/CookieConsent";
import { GA_TRACKING_ID } from "@/lib/analytics/gtag";
import { InstallPrompt } from "@/components/InstallPrompt";
import { Navbar } from "@/components/Navbar";
import { VoiceCommandButton } from "@/components/VoiceCommandButton";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { SkipToContent } from "@/components/SkipToContent";
import { PageTransition } from "@/components/animations/PageTransition";
import { WalletProvider } from "@/contexts/WalletContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/Toast";
import { Footer } from "@/components/Footer";
import { UpdatePrompt } from "@/components/UpdatePrompt";
import { PWAInitializer } from "@/components/PWAInitializer";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stellar Tip Jar",
  description: "Tip your favorite creators with Stellar assets.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Stellar Tip Jar",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: "/icons/icon-192x192.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stellar-tipjar.app",
    siteName: "Stellar Tip Jar",
    title: "Stellar Tip Jar",
    description: "Tip your favorite creators with Stellar assets.",
    images: [
      {
        url: "/og-images/og-default.png",
        width: 1200,
        height: 630,
        alt: "Stellar Tip Jar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stellar Tip Jar",
    description: "Tip your favorite creators with Stellar assets.",
    images: ["/og-images/og-default.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#8b5cf6",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {GA_TRACKING_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('consent', 'default', { analytics_storage: 'denied' });
                gtag('config', '${GA_TRACKING_ID}', { page_path: window.location.pathname });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={inter.className}>
        <SkipToContent />
        <PerformanceMonitor />
        <ThemeProvider>
        <I18nProvider>
        <CurrencyProvider>
        <WalletProvider>
          <ReactQueryProvider>
            <WebSocketProvider>
              <ToastProvider>
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main
                  id="main-content"
                  tabIndex={-1}
                  className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 focus:outline-none flex-1"
                >
                  <PageTransition>{children}</PageTransition>
                </main>
                <Footer />
              </div>
              <InstallPrompt />
              <UpdatePrompt />
              <PWAInitializer />
              <CookieConsent />
              <ToastContainer />
              <VoiceCommandButton className="fixed bottom-6 right-6 z-50 shadow-lg" />
              </ToastProvider>
            </WebSocketProvider>
          </ReactQueryProvider>
        </WalletProvider>
        </CurrencyProvider>
        </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
