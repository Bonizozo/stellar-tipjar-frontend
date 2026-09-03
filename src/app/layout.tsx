import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import { getDirection } from '@/i18n/routing';

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
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/Toast";
import { Footer } from "@/components/Footer";
import { ProductTour } from "@/components/ProductTour";
import { ThemeProvider } from "@/contexts/ThemeContext";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Stellar Tip Jar",
    template: "%s | Stellar Tip Jar",
  },
  description: "Support creators with fast, borderless Stellar payments.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const dir = getDirection(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('stj:theme:theme') || localStorage.getItem('stellar-tipjar-theme') || localStorage.getItem('theme');
                  if (!theme) {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <SkipToContent />
        <PerformanceMonitor />
        <ThemeProvider>
          <CurrencyProvider>
            <WalletProvider>
              <ReactQueryProvider>
                <ToastProvider>
                  <WebSocketProvider>
                    <NextIntlClientProvider messages={messages} locale={locale}>
                      <div className="min-h-screen flex flex-col pb-16 md:pb-0">
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
                    </NextIntlClientProvider>
                    <InstallPrompt />
                    <ToastContainer />
                    <ProductTour />
                  </WebSocketProvider>
                </ToastProvider>
              </ReactQueryProvider>
            </WalletProvider>
          </CurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
