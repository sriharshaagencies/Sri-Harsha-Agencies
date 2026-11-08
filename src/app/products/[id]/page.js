import { notFound } from 'next/navigation';
import ProductDetail from '@/components/products/ProductDetail';
import { categories } from '@/data/categories';
import { getAllProducts, getProductById } from '@/lib/products-store';
import { getRelatedProducts } from '@/lib/recommendations';
import { absoluteUrl, createPageMetadata, jsonLdScript, siteUrl } from '@/lib/seo';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) return createPageMetadata({ title: 'Product not found', description: 'The requested product could not be found.', path: `/products/${encodeURIComponent(id)}`, noindex: true });
  return createPageMetadata({
    title: product.name,
    description: `${product.description} Available from ${siteUrl.replace('https://', '')}.`,
    path: `/products/${encodeURIComponent(product.id)}`,
  });
}

function productJsonLd(product) {
  const firstVariant = product.variants?.[0];
  const price = firstVariant?.salePrice ?? product.salePrice;
  const offers = typeof price === 'number' ? {
    '@type': 'Offer',
    url: absoluteUrl(`/products/${encodeURIComponent(product.id)}`),
    price,
    priceCurrency: 'INR',
    availability: product.inStock === false ? 'https://schema.org/OutOfStock' : 'https://schema.org/InStock',
  } : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [absoluteUrl(product.image)],
    description: product.description,
    url: absoluteUrl(`/products/${encodeURIComponent(product.id)}`),
    brand: { '@type': 'Brand', name: 'Sri Harsha Agencies' },
    ...(product.id ? { sku: product.id } : {}),
    ...(offers ? { offers } : {}),
  };
}

function breadcrumbJsonLd(product, category) {
  const items = [
    { name: 'Home', item: siteUrl },
    { name: 'Products', item: absoluteUrl('/products') },
  ];
  if (category) items.push({ name: category.label, item: absoluteUrl(`/products?category=${encodeURIComponent(category.id)}`) });
  items.push({ name: product.name, item: absoluteUrl(`/products/${encodeURIComponent(product.id)}`) });
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: item.item })),
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  const products = await getAllProducts();
  const category = categories.find((item) => item.id === product.category);
  const relatedProducts = getRelatedProducts(product, products);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(productJsonLd(product))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(breadcrumbJsonLd(product, category))} />
      <ProductDetail product={product} category={category} relatedProducts={relatedProducts} />
    </>
  );
}
