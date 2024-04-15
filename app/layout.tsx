import "@mantine/core/styles.css";
import React from "react";
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import { theme } from "../theme";
import { ModalsProvider } from '@mantine/modals';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stay Alive: Wake Lock",
  description: "Prevent your screen from dimming, locking, or sleeping with just one click. Wake Lock One-Click ensures your screen stays active as long as your browser runs.",
  openGraph: {
    title: "Stay Alive: Wake Lock",
    description: "Prevent your screen from dimming, locking, or sleeping with just one click. Wake Lock One-Click ensures your screen stays active as long as your browser runs.",
    url: "https://wakelock-web.vercel.app",
    siteName: 'Stay Alive: Wake Lock',
    type: 'website',
    images: [
      {
        url: 'https://wakelock-web.vercel.app/opengraph-image.jpg', // Must be an absolute URL
        width: 756,
        height: 429,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Stay Alive: Wake Lock",
    description: "Prevent your screen from dimming, locking, or sleeping with just one click. Wake Lock One-Click ensures your screen stays active as long as your browser runs.",
    images: ['https://wakelock-web.vercel.app/opengraph-image.jpg'], 
  },
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <ModalsProvider>
            {children}
          </ModalsProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
