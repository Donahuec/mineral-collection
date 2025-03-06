import type { Metadata } from "next";
import { Montserrat, Vollkorn } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/live";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const volkorn = Vollkorn({
  variable: "--font-volkorn",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mineral Collection",
  description: "Caitlin's collection of rocks and minerals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`{montserrat.className} {volkorn.className}`}>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
