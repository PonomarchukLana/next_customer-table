import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import { useServerDarkMode } from "./utils/useServerDarkMode";
import { CookiesWrapper } from "@/components/cookiesWrapper";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await useServerDarkMode();
  return (
    <html lang="en" className={theme}>
      <body className="bg-primary" suppressHydrationWarning>
        <CookiesWrapper>{children}</CookiesWrapper>
      </body>
    </html>
  );
}
