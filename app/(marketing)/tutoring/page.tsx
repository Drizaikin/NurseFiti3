export const revalidate = 300;

import { ProductLandingPage } from '@/components/marketing/ProductLandingPage';
import { createClient } from '@/lib/supabase/server';
import { fetchPlatformSettings } from '@/lib/platformSettings';
import { PUBLIC_PRODUCTS, productMetadata } from '@/lib/publicProducts';

const product = PUBLIC_PRODUCTS.tutoring;
export const metadata = productMetadata(product);

export default async function TutoringPage() {
  const settings = await fetchPlatformSettings(createClient() as any);
  const rateNote = settings.allow_tutor_custom_pricing
    ? 'Tutors currently set their own rates. Review the displayed rate on a tutor profile before booking.'
    : `Current platform rates start by student cadre: KSh ${settings.krchn_hourly_rate.toLocaleString()} for KRCHN and KSh ${settings.bscn_hourly_rate.toLocaleString()} for BScN per hour.`;

  return <ProductLandingPage product={product} note={rateNote} />;
}
