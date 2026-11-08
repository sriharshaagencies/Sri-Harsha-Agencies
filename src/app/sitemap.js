import { getAllProducts } from '@/lib/products-store';
import { siteUrl } from '@/lib/seo';

export const runtime = 'nodejs';
export const revalidate = 3600;

export default async function sitemap() {
  const publicRoutes = [
    { path: '/', changeFrequency: 'weekly', priority: 1 },
    { path: '/products', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/combos', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/bulk-orders', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/about', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/contact', changeFrequency: 'monthly', priority: 0.7 },
  ];

  const products = await getAllProducts();
  return [
    ...publicRoutes.map(({ path, changeFrequency, priority }) => ({
      url: `${siteUrl}${path}`,
      changeFrequency,
      priority,
    })),
    ...products.map((product) => ({
      url: `${siteUrl}/products/${encodeURIComponent(product.id)}`,
      changeFrequency: 'weekly',
      priority: product.featured ? 0.8 : 0.6,
    })),
  ];
}
