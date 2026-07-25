import { ProductLandingPage } from '@/components/marketing/ProductLandingPage';
import { PUBLIC_PRODUCTS, productMetadata } from '@/lib/publicProducts';

const product = PUBLIC_PRODUCTS['nck-flashcards'];
export const metadata = productMetadata(product);

export default function FlashcardsPage() {
  return <ProductLandingPage product={product} />;
}
