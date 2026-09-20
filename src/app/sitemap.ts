import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/event-detail`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/ticket-selection`, lastModified: new Date(), priority: 0.8 },
    { url: `${baseUrl}/checkout`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/sign-up-login`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/my-account`, lastModified: new Date(), priority: 0.5 },
  ];
}
