import Link from 'next/link';

import styles from './styles.module.css';

interface BackLinkProps {
  title: string;
  href: string;
}

export default function BackLink({ title, href }: BackLinkProps) {
  return (
    <Link className={styles.backLink} href={href}>
      ← Back to {title}
    </Link>
  );
}
