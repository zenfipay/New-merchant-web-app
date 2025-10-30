import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DesktopOnly from "./components/DesktopOnly";
import ServiceWorkerRegister from "./components/ServiceWorkerRegister";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zenfipay",
  description: "Zenfipay Merchant app",
  manifest: "/manifest.json",
  icons: {
    icon: "/icons/logo-192.png",
    apple: "/icons/logo-512.png",
  }
};

export const viewport = {
  themeColor: "#20195F",
}



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
        <DesktopOnly>
          {children}
          <ServiceWorkerRegister />  
        </DesktopOnly> 
      </body>
    </html>
  );
}
