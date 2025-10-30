import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import DesktopOnly from "./components/DesktopOnly";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const neueHaas = localFont({
  src: [
    // {
    //   path: "./fonts/NeueHaasDisplayLight.ttf",
    //   weight: "300",
    //   style: "normal",
    // },
    {
      path: "./fonts/NeueHaasDisplayMediu.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NeueHaasDisplayBold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/NeueHaasDisplayBlack.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-neue-haas",
  display: "swap",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zenfipay",
  description: "Zenfipay Merchant app",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/logo-192.png",
    apple: "/icons/logo-512.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#20195F",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${neueHaas.variable} ${interTight.variable} antialiased`}>
        <DesktopOnly>
          {children}
          <ServiceWorkerRegister />
        </DesktopOnly>
      </body>
    </html>
  );
}
