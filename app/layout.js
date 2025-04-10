import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react";
import { Suspense } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Hidden Gems | Discover Amazing Travel Destinations",
  description:
    "Discover hidden travel destinations across the world. Find and save unique places to visit on your next adventure.",
  keywords: "travel, destinations, hidden gems, tourism, adventure",
  metadataBase: new URL("https://your-domain.vercel.app"),
  openGraph: {
    title: "Hidden Gems",
    description: "Discover amazing travel destinations",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <Navbar />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            expand={true}
            richColors
            closeButton
            theme="light"
          />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
