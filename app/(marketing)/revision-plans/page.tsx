import { ProductLandingPage } from '@/components/marketing/ProductLandingPage';
import { PUBLIC_PRODUCTS, productMetadata } from '@/lib/publicProducts';

const product = PUBLIC_PRODUCTS['revision-plans'];
export const metadata = productMetadata(product);

export default function RevisionPlansPage() {
  return <ProductLandingPage product={product} />;
}
