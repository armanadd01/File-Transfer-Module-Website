import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/dropzone.css";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeBodyClassProvider from "@/context/ThemeBodyClassProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "File Transfer Module",
  description: "A modern file transfer application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="transition-colors duration-300">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased transition-colors duration-300`}
      >
        <ThemeProvider>
          <ThemeBodyClassProvider>
            {children}
          </ThemeBodyClassProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
