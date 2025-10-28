import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "CodePulse - The Rhythm of Your Productivity",
  description: "A developer productivity companion that visualizes the pulse of your coding life. Track sessions, analyze productivity, and maintain focus with beautiful real-time analytics.",
  keywords: ["productivity", "developer tools", "time tracking", "coding analytics", "pomodoro"],
  authors: [{ name: "CodePulse Team" }],
  openGraph: {
    title: "CodePulse - The Rhythm of Your Productivity",
    description: "Track your coding sessions and visualize your productivity with beautiful real-time analytics.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodePulse - The Rhythm of Your Productivity",
    description: "Track your coding sessions and visualize your productivity with beautiful real-time analytics.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
