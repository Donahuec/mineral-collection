'use server';
import { headers } from 'next/headers';

export async function getBackLink(
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

  if (
    !referrer ||
    !baseUrl ||
    referrer.match(new RegExp(`//${currentSlug}$`))
  ) {
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
