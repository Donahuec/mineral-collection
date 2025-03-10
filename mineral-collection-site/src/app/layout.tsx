import type { Metadata } from "next";
import { Montserrat, Vollkorn } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/live";
import styles from "./layout.module.css";
import Link from "next/link";

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
      <body className={`${montserrat.style} ${volkorn.style}`}>
        <nav className={styles.nav}>
        <Link href="/">CrystalDB</Link>
        <Link href="/minerals">Minerals</Link>
        <Link href="/rocks">Rocks</Link>
        <Link href="/specimens">Specimens</Link>
        </nav>
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
