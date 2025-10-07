import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import MeticulousClient from './components/MeticulousClient';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://en-decode-x.vercel.app'),
  title: {
    template: '%s | Explore Testing',
    default: 'Explore Testing - Demo E-commerce & QA Platform',
  },
  description:
    'Explore Testing is a demo e-commerce platform built for automation and QA testing. Browse products, add to cart, and test the checkout flow effortlessly.',
  keywords: [
    'explore testing',
    'demo store',
    'e-commerce testing',
    'automation demo',
    'qa testing',
    'test site',
    'shopping',
  ],
  authors: [{ name: 'Explore Testing' }],
  creator: 'Explore Testing',
  publisher: 'Explore Testing',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'Explore Testing',
    title: 'Explore Testing - Demo E-commerce & QA Platform',
    description: 'Demo e-commerce store for QA and automation testing.',
    url: 'https://en-decode-x.vercel.app',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://en-decode-x.vercel.app' },
  manifest: '/manifest.json',
  icons: { icon: '/favicon.ico', apple: [{ url: '/apple-icon.png', sizes: '180x180' }] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Environment variables for Meticulous
  const enableMeticulous = process.env.NEXT_PUBLIC_ENABLE_METICULOUS === 'true';
  const recordingToken = process.env.NEXT_PUBLIC_METICULOUS_RECORDING_TOKEN ?? '';
  const isProductionFlag = process.env.NEXT_PUBLIC_METICULOUS_IS_PRODUCTION ?? 'false';

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* METICULOUS SCRIPT - Client Component handles event */}
        {enableMeticulous && recordingToken && (
          <MeticulousClient recordingToken={recordingToken} isProduction={isProductionFlag} />
        )}

        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Explore Testing',
              url: 'https://en-decode-x.vercel.app',
              description:
                'Explore Testing is a demo e-commerce app for QA, automation, and user journey exploration.',
              applicationCategory: 'ShoppingApplication',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}