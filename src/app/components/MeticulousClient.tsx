'use client'; // Important: enables interactivity in App Router

import Script from 'next/script';

interface Props {
  recordingToken: string;
  isProduction: string;
}

export default function MeticulousClient({ recordingToken, isProduction }: Props) {
  return (
    <Script
      src="https://snippet.meticulous.ai/v1/meticulous.js"
      strategy="beforeInteractive"
      data-recording-token={recordingToken}
      data-is-production-environment={isProduction}
      onError={(e) => console.error('Meticulous script failed to load', e)}
    />
  );
}
