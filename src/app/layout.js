import './globals.css';
import { CartProvider } from '@/context/CartContext';
import StoreShell from '@/components/shared/StoreShell';
import ScrollAnimations from '@/components/shared/ScrollAnimations';
import { siteConfig } from '@/config/site';
import { businessJsonLd, jsonLdScript, siteUrl } from '@/lib/seo';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: `${siteConfig.name} | Premium Dry Fruits & Nuts in Tuni`, template: `%s | ${siteConfig.name}` },
  description: 'Explore premium dry fruits, almonds, cashews, pistachios, dates, nuts and thoughtfully curated combos at Sri Harsha Agencies in Tuni, Andhra Pradesh.',
  applicationName: siteConfig.name,
  icons: { icon: '/images/sri-harsha-logo.png' },
  creator: siteConfig.name,
  publisher: siteConfig.name,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(businessJsonLd())} />
        <CartProvider>
          <ScrollAnimations />
          <StoreShell>{children}</StoreShell>
        </CartProvider>
      </body>
    </html>
  );
}
