// app/layout.tsx
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
    template: '%s | Base64 Encoder/Decoder',
    default: 'Base64 Encoder/Decoder - Free Online Tool',
  },
  description:
    'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text instantly. Simple, fast, and secure with no data storage.',
  keywords: [
    'base64 encoder',
    'base64 decoder',
    'online encoder',
    'text to base64',
    'base64 to text',
    'free encoder',
    'online tool',
    'text converter',
  ],
  authors: [{ name: 'Base64 Encoder/Decoder' }],
  creator: 'Base64 Encoder/Decoder',
  publisher: 'Base64 Encoder/Decoder',
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: 'website',
    siteName: 'Base64 Encoder/Decoder',
    title: 'Base64 Encoder/Decoder - Free Online Tool',
    description:
      'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text instantly.',
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
              name: 'Base64 Encoder/Decoder',
              url: 'https://en-decode-x.vercel.app',
              description:
                'Free online Base64 encoder and decoder. Convert text to Base64 and decode Base64 to text instantly.',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Any',
              browserRequirements: 'Requires JavaScript',
              offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
              featureList: [
                'Text to Base64 encoding',
                'Base64 to text decoding',
                'Instant conversion',
                'Copy to clipboard',
                'Dark mode support',
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Theme script (kept in body to avoid hydration issues) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') ?? 'dark';
                document.documentElement.classList.toggle('dark', theme === 'dark');
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
