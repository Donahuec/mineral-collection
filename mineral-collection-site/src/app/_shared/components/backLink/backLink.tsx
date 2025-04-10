import { headers } from 'next/headers';
import Link from 'next/link';

import styles from './styles.module.css';

interface BackLinkProps {
  title: string;
  href: string;
  useDynamic?: boolean;
  currentSlug?: string;
}

async function getBackLink(
  href: string,
  title: string,
  currentSlug: string
): Promise<{
  referrerPath: string;
  referrerTitle: string;
}> {
  const headersList = await headers();
  const referrer = headersList.get('referer');
  const baseUrl = process.env.NEXT_PUBLIC_URL;

  if (!referrer || !baseUrl || referrer.match(`/${currentSlug}`)) {
    return { referrerPath: href, referrerTitle: title };
  }
  const referrerPath = referrer.replace(baseUrl, '');
  const referrerSegments = referrerPath.split('/');

  let referrerTitle =
    referrerSegments[referrerSegments.length - 1]
      .split('?')[0]
      .replaceAll('-', ' ') || title;
  // convert to title case
  referrerTitle = referrerTitle
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return { referrerPath, referrerTitle };
}

export default async function BackLink({
  title,
  href,
  useDynamic,
  currentSlug,
}: BackLinkProps) {
  if (useDynamic && currentSlug) {
    const { referrerPath, referrerTitle } = await getBackLink(
      href,
      title || '',
      currentSlug
    );
    href = referrerPath;
    title = referrerTitle;
  }

  return (
    <Link className={styles.backLink} href={href}>
      ← Back to {title}
    </Link>
  );
}
