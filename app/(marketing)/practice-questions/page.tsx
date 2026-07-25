import { ProductLandingPage } from '@/components/marketing/ProductLandingPage';
import { PUBLIC_PRODUCTS, productMetadata } from '@/lib/publicProducts';

const product = PUBLIC_PRODUCTS['practice-questions'];
export const metadata = productMetadata(product);

export default function PracticeQuestionsPage() {
  return <ProductLandingPage product={product} />;
}
