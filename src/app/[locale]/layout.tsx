import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
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
import { ToastProvider } from "@/contexts/ToastContext";
import { ToastContainer } from "@/components/Toast";
import { Footer } from "@/components/Footer";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <SkipToContent />
        <PerformanceMonitor />
        <CurrencyProvider>
        <WalletProvider>
          <ReactQueryProvider>
            <WebSocketProvider>
              <ToastProvider>
                <NextIntlClientProvider messages={messages}>
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
                </NextIntlClientProvider>
              <InstallPrompt />
              <ToastContainer />
              </ToastProvider>
            </WebSocketProvider>
          </ReactQueryProvider>
        </WalletProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}