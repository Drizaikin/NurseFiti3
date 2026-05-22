/**
 * Paystack API helper — server-side only.
 *
 * All amounts are in KES (Kenyan Shillings).
 * Paystack Kenya uses KES and accepts amounts in the smallest currency unit
 * (i.e. multiply KSh by 100 to get kobo/cents equivalent).
 *
 * Docs: https://paystack.com/docs/api/
 */

import crypto from 'crypto';

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY!;
const PAYSTACK_BASE_URL = 'https://api.paystack.co';

if (!PAYSTACK_SECRET_KEY && process.env.NODE_ENV === 'production') {
  throw new Error('PAYSTACK_SECRET_KEY is not set');
}

/** Shared fetch wrapper with auth header */
async function paystackFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${PAYSTACK_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = (await res.json()) as { status: boolean; message: string; data: T };

  if (!json.status) {
    throw new Error(`Paystack error: ${json.message}`);
  }

  return json.data;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface InitializeTransactionParams {
  email: string;
  /** Amount in KSh — will be converted to kobo (×100) internally */
  amountKsh: number;
  reference?: string;
  callbackUrl?: string;
  metadata?: Record<string, unknown>;
  channels?: Array<'card' | 'bank' | 'ussd' | 'qr' | 'mobile_money' | 'bank_transfer'>;
}

export interface InitializeTransactionResult {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface VerifyTransactionResult {
  id: number;
  status: 'success' | 'failed' | 'abandoned' | 'pending';
  reference: string;
  amount: number; // in kobo
  currency: string;
  paid_at: string | null;
  channel: string;
  customer: {
    email: string;
    phone: string | null;
  };
  metadata: Record<string, unknown> | null;
}

export interface CreateTransferRecipientParams {
  name: string;
  /** M-Pesa phone number e.g. 0712345678 */
  accountNumber: string;
  bankCode: string; // 'MPESA' for M-Pesa Kenya
  currency?: string;
}

export interface TransferRecipientResult {
  recipient_code: string;
  name: string;
  type: string;
}

export interface InitiateTransferParams {
  /** Amount in KSh */
  amountKsh: number;
  recipientCode: string;
  reason?: string;
  reference?: string;
}

export interface TransferResult {
  transfer_code: string;
  status: string;
  amount: number;
  recipient: string;
}

// ---------------------------------------------------------------------------
// Transactions
// ---------------------------------------------------------------------------

/**
 * Initialize a Paystack transaction.
 * Returns the authorization_url to redirect the user to, plus a reference.
 */
export async function initializeTransaction(
  params: InitializeTransactionParams
): Promise<InitializeTransactionResult> {
  const reference =
    params.reference ?? `NF-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return paystackFetch<InitializeTransactionResult>('/transaction/initialize', {
    method: 'POST',
    body: JSON.stringify({
      email: params.email,
      amount: params.amountKsh * 100, // convert KSh → kobo
      reference,
      currency: 'KES',
      callback_url: params.callbackUrl,
      metadata: params.metadata,
      channels: params.channels ?? ['card', 'bank', 'mobile_money', 'bank_transfer'],
    }),
  });
}

/**
 * Verify a transaction by reference.
 * Always call this server-side before provisioning access.
 */
export async function verifyTransaction(
  reference: string
): Promise<VerifyTransactionResult> {
  return paystackFetch<VerifyTransactionResult>(
    `/transaction/verify/${encodeURIComponent(reference)}`
  );
}

// ---------------------------------------------------------------------------
// Transfers (Tutor Payouts)
// ---------------------------------------------------------------------------

/**
 * Create a transfer recipient for M-Pesa payouts.
 * This only needs to be done once per tutor — store the recipient_code.
 *
 * For Kenya M-Pesa, use bankCode = 'MPESA' and accountNumber = phone number.
 */
export async function createTransferRecipient(
  params: CreateTransferRecipientParams
): Promise<TransferRecipientResult> {
  return paystackFetch<TransferRecipientResult>('/transferrecipient', {
    method: 'POST',
    body: JSON.stringify({
      type: 'mobile_money',
      name: params.name,
      account_number: params.accountNumber,
      bank_code: params.bankCode ?? 'MPESA',
      currency: params.currency ?? 'KES',
    }),
  });
}

/**
 * Initiate a transfer (payout) to a recipient.
 * Requires Transfers to be enabled on your Paystack dashboard.
 */
export async function initiateTransfer(
  params: InitiateTransferParams
): Promise<TransferResult> {
  const reference =
    params.reference ??
    `PAYOUT-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  return paystackFetch<TransferResult>('/transfer', {
    method: 'POST',
    body: JSON.stringify({
      source: 'balance',
      amount: params.amountKsh * 100, // KSh → kobo
      recipient: params.recipientCode,
      reason: params.reason ?? 'NurseFiti tutor payout',
      currency: 'KES',
      reference,
    }),
  });
}

// ---------------------------------------------------------------------------
// Webhook verification
// ---------------------------------------------------------------------------

/**
 * Verify that a webhook request genuinely came from Paystack.
 * Paystack signs the request body with your secret key using HMAC-SHA512.
 *
 * Usage in your webhook route:
 *   const isValid = verifyWebhookSignature(rawBody, req.headers['x-paystack-signature']);
 */
export function verifyWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature) return false;
  const hash = crypto
    .createHmac('sha512', PAYSTACK_SECRET_KEY)
    .update(rawBody)
    .digest('hex');
  return hash === signature;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert kobo (Paystack amount) back to KSh for display */
export function koboToKsh(kobo: number): number {
  return Math.round(kobo / 100);
}

/** Generate a unique payment reference */
export function generateReference(prefix = 'NF'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}
