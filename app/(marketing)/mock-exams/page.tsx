import { ProductLandingPage } from '@/components/marketing/ProductLandingPage';
import { PUBLIC_PRODUCTS, productMetadata } from '@/lib/publicProducts';

const product = PUBLIC_PRODUCTS['mock-exams'];
export const metadata = productMetadata(product);

export default function MockExamsPage() {
  return <ProductLandingPage product={product} />;
}
