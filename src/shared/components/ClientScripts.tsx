/* eslint-disable @next/next/no-before-interactive-script-outside-document */
'use client';

import Script from 'next/script';

export function ClientScripts() {
  return (
    <>
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
          `,
        }}
      />
    </>
  );
}