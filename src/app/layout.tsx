import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { InstallPrompt } from "@/components/InstallPrompt";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import { Navbar } from "@/components/Navbar";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { SkipToContent } from "@/components/SkipToContent";
import { PageTransition } from "@/components/animations/PageTransition";
import { WalletProvider } from "@/contexts/WalletContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { WebSocketProvider } from "@/contexts/WebSocketContext";
import { I18nProvider } from "@/components/I18nProvider";
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/Toast";
import "@/styles/globals.css";
import { buildMetadata } from "@/utils/seo";

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
};

export const viewport: Viewport = {
  themeColor: "#0066ff",
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
      <body className={inter.className}>
        <SkipToContent />
        <PerformanceMonitor />
        <I18nProvider>
        <CurrencyProvider>
        <WalletProvider>
          <ReactQueryProvider>
            <WebSocketProvider>
              <ToastProvider>
              <div className="min-h-screen">
                <Navbar />
                <main
                  id="main-content"
                  tabIndex={-1}
                  className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8 focus:outline-none"
                >
                  <PageTransition>{children}</PageTransition>
                </main>
              </div>
              <InstallPrompt />
              <ToastContainer />
              </ToastProvider>
            </WebSocketProvider>
          </ReactQueryProvider>
        </WalletProvider>
        </CurrencyProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
