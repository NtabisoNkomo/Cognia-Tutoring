import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cognia Tutoring | Premium Academic Support",
  description: "Elite, curriculum-aligned learning for students from primary to high school. Mastering CAPS, IEB, and Cambridge.",
  openGraph: {
    title: "Cognia Tutoring | Premium Academic Support",
    description: "Elite, curriculum-aligned learning for students from primary to high school.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground transition-colors duration-300">
        <Navbar />
        <main className="flex-1 flex flex-col pt-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
