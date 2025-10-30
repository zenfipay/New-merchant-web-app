import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}




// "use client";

// import { useEffect, useState } from "react";

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   const [isDesktop, setIsDesktop] = useState(true);

//   useEffect(() => {
//     const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
//     checkDesktop();
//     window.addEventListener("resize", checkDesktop);
//     return () => window.removeEventListener("resize", checkDesktop);
//   }, []);

//   if (!isDesktop) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center text-center text-lg text-gray-600">
//         <p>This app is only available on desktop devices.</p>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
