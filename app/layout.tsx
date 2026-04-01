import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Printable Planner Maker — Free Custom Planner PDFs",
  description:
    "Create beautiful, customizable printable planners and download as print-ready PDFs. Daily, weekly, and monthly layouts. Free, no account required.",
  openGraph: {
    title: "Printable Planner Maker — Free Custom Planner PDFs",
    description:
      "Create custom printable planners with daily, weekly, and monthly layouts. Download as print-ready PDFs.",
    url: "https://printableplanner.org",
    siteName: "Printable Planner Maker",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Printable Planner Maker — Free Custom Planner PDFs",
    description:
      "Create custom printable planners and download as print-ready PDFs. Free, no account required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            src="https://analytics.moltcorporation.com/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
