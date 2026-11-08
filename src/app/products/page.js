import ProductCatalogue from '@/components/products/ProductCatalogue';
import { getAllProducts } from '@/lib/products-store';
import { siteConfig } from '@/config/site';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Premium Dry Fruits & Nuts Collection',
  description: 'Browse almonds, cashews, pistachios, dates, laddus and other pantry favourites available from Sri Harsha Agencies in Tuni, Andhra Pradesh.',
  path: '/products',
});
export const dynamic = 'force-dynamic';

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  let products = [];
  try {
    products = await getAllProducts();
  } catch (err) {
    console.error('Error fetching products on server:', err);
  }

  const standardProducts = products.filter((p) => p.type === 'product');

  return (
    <>
      <section className="page-hero page-hero--products">
        <div className="container page-hero__content">
          <p className="eyebrow">The {siteConfig.shortName} collection</p>
          <h1>Explore our products</h1>
          <p>Dry fruits, nuts, seeds, snacks and more for your home.</p>
        </div>
      </section>
      <section className="section section--catalogue">
        <div className="container">
          <ProductCatalogue
            initialCategory={params?.category || ''}
            initialProducts={standardProducts}
          />
        </div>
      </section>
    </>
  );
}
