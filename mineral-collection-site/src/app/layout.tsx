import type { Metadata } from 'next';
import './globals.css';

import { Montserrat, Vollkorn } from 'next/font/google';
import Link from 'next/link';

import { SanityLive } from '@/sanity/live';

import NavMenu from './_shared/components/navMenu/navMenu';
import styles from './layout.module.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

const volkorn = Vollkorn({
  variable: '--font-volkorn',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Mineral Collection',
  description: "Caitlin's collection of rocks and minerals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${montserrat.style} ${volkorn.style}`}>
        <nav className={styles.nav}>
          <Link href='/' className={styles.home}>
            CrystalDB
          </Link>
          <div className={styles.links}>
            <Link href='/minerals'>Minerals</Link>
            <Link href='/rocks'>Rocks</Link>
            <Link href='/specimens'>Specimens</Link>
          </div>
          <div className={styles.mobileNav}>
            <NavMenu />
          </div>
        </nav>
        <main className={styles.main}>{children}</main>
        <SanityLive />
      </body>
    </html>
  );
}
