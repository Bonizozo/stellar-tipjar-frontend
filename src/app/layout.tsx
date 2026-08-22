// Root layout — minimal shell only.
// Full document markup is handled by src/app/[locale]/layout.tsx via next-intl
// locale routing; non-locale utility routes still need client providers.
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { WalletProvider } from "@/contexts/WalletContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { ToastProvider } from "@/contexts/ToastContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <CurrencyProvider>
        <WalletProvider>
          <ReactQueryProvider>
            <ToastProvider>{children}</ToastProvider>
          </ReactQueryProvider>
        </WalletProvider>
      </CurrencyProvider>
    </ThemeProvider>
  );
}
