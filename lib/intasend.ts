/**
 * IntaSend API helper — server-side only.
 * Uses the official intasend-node SDK.
 *
 * Docs: https://developers.intasend.com/docs
 *
 * Keys (set in .env.local):
 *   INTASEND_SECRET_KEY                  — ISSecretKey_live_... or ISSecretKey_test_...
 *   NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY — ISPubKey_live_...    or ISPubKey_test_...
 *
 * The SDK constructor takes (publishableKey, secretKey, isTest).
 * isTest is derived automatically from the key prefix.
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
const IntaSend = require('intasend-node') as new (
  publishableKey: string,
  secretKey: string,
  isTest: boolean
) => {
  collection: () => {
    charge: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
    status: (invoiceId: string) => Promise<Record<string, unknown>>;
    mpesaStkPush: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
  };
  payouts: () => {
    mpesa: (params: Record<string, unknown>) => Promise<Record<string, unknown>>;
    approve: (response: Record<string, unknown>) => Promise<Record<string, unknown>>;
  };
};

/** Shared SDK instance */
function getSdk() {
  const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY ?? '';
  const SECRET_KEY      = process.env.INTASEND_SECRET_KEY ?? '';

  // Derive test mode from the key prefix — test keys contain "test", live keys contain "live"
  const IS_TEST = SECRET_KEY.includes('test') || PUBLISHABLE_KEY.includes('test');

  if (!SECRET_KEY) {
    throw new Error('INTASEND_SECRET_KEY is not set');
  }

  if (!PUBLISHABLE_KEY) {
    throw new Error('NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY is not set');
  }

  return new IntaSend(PUBLISHABLE_KEY, SECRET_KEY, IS_TEST);
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface CreateCheckoutParams {
  email: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  /** Amount in KSh */
  amount: number;
  currency?: string;
  /** Your own tracking reference */
  api_ref: string;
  /** URL to redirect the customer after successful payment */
  redirect_url?: string;
  comment?: string;
}

export interface CreateCheckoutResult {
  /** The hosted checkout URL to redirect the customer to */
  url: string;
  /** IntaSend invoice/checkout ID — use this to verify status */
  id: string;
  signature?: string;
}

export interface CheckoutStatusResult {
  invoice_id: string;
  state: 'PENDING' | 'PROCESSING' | 'COMPLETE' | 'FAILED';
  provider: string;
  charges: string;
  net_amount: string;
  currency: string;
  value: string;
  account: string;
  api_ref: string;
  failed_reason: string | null;
  failed_code: string | null;
  created_at: string;
  updated_at: string;
}

export interface InitiateSendMoneyParams {
  /** Amount in KSh */
  amount: number;
  /** Beneficiary M-Pesa phone number — must include country code e.g. 254712345678 */
  account: string;
  name: string;
  narrative?: string;
  currency?: string;
}

export interface SendMoneyResult {
  file_id: string;
  tracking_id: string;
  status: string;
  transactions: Array<{
    transaction_id: string;
    status: string;
    account: string;
    amount: string;
    narrative: string;
  }>;
}

// ---------------------------------------------------------------------------
// Checkout (Payment Collection)
// ---------------------------------------------------------------------------

/**
 * Create an IntaSend checkout session using the official SDK.
 * SDK call: intasend.collection().charge({ ... })
 * Returns the hosted checkout URL to redirect the customer to.
 */
export async function createCheckout(
  params: CreateCheckoutParams
): Promise<CreateCheckoutResult> {
  const intasend = getSdk();
  const collection = intasend.collection();

  const resp = await collection.charge({
    first_name:   params.first_name,
    last_name:    params.last_name,
    email:        params.email,
    phone_number: params.phone_number,
    amount:       params.amount,
    currency:     params.currency ?? 'KES',
    api_ref:      params.api_ref,
    redirect_url: params.redirect_url,
    comment:      params.comment,
  });

  // SDK returns the full response — url and id are at the top level
  if (!resp.url || !resp.id) {
    throw new Error(
      'IntaSend checkout response is missing url or id — check your API keys and account status'
    );
  }

  return {
    url:       resp.url as string,
    id:        resp.id as string,
    signature: resp.signature as string | undefined,
  };
}

/**
 * Check payment status by invoice_id.
 * SDK call: intasend.collection().status('<INVOICE-ID>')
 */
export async function verifyCheckout(
  invoiceId: string
): Promise<CheckoutStatusResult> {
  const intasend = getSdk();
  const collection = intasend.collection();

  const resp = await collection.status(invoiceId);

  // SDK returns { invoice: { ... }, meta: { ... } }
  // The invoice object is what we need
  const invoice = (resp.invoice ?? resp) as Record<string, unknown>;

  if (typeof invoice.state !== 'string') {
    throw new Error(
      'IntaSend status response has unexpected shape — invoice.state is not a string'
    );
  }

  return invoice as unknown as CheckoutStatusResult;
}

// ---------------------------------------------------------------------------
// Send Money (Tutor Payouts via M-Pesa B2C)
// ---------------------------------------------------------------------------

/**
 * Initiate an M-Pesa B2C payout to a tutor.
 * SDK call: intasend.payouts().mpesa({ ... }) then .approve(response)
 */
export async function initiateMpesaPayout(
  params: InitiateSendMoneyParams
): Promise<SendMoneyResult> {
  const intasend = getSdk();
  const payouts = intasend.payouts();

  // Step 1: Initiate
  const initiated = await payouts.mpesa({
    currency: params.currency ?? 'KES',
    transactions: [
      {
        name:      params.name,
        account:   params.account,
        amount:    params.amount,
        narrative: params.narrative ?? 'NurseFiti tutor payout',
      },
    ],
  });

  // Step 2: Approve (required even when auto-approving)
  const approved = await payouts.approve(initiated);

  return approved as unknown as SendMoneyResult;
}

// ---------------------------------------------------------------------------
// Webhook verification
// ---------------------------------------------------------------------------

/**
 * Validate that a webhook request came from IntaSend.
 * IntaSend uses a "challenge" string configured in the dashboard.
 * The webhook payload includes a `challenge` field — compare it to your stored value.
 *
 * Set INTASEND_WEBHOOK_CHALLENGE in your env to the challenge string
 * you configured in the IntaSend dashboard under Webhooks.
 */
export function verifyWebhookChallenge(challenge: string | null | undefined): boolean {
  const expected = process.env.INTASEND_WEBHOOK_CHALLENGE;
  if (!expected || !challenge) return false;
  return challenge === expected;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a unique payment reference */
export function generateReference(prefix = 'NF'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
