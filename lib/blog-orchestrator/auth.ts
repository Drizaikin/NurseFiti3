import { createHash, timingSafeEqual } from 'node:crypto';

export function hashAutomationToken(token: string) {
  return createHash('sha256').update(token, 'utf8').digest('hex');
}

export function verifyAutomationBearer(authorization: string | null, expectedHash = process.env.BLOG_AUTOMATION_TOKEN_SHA256) {
  if (!authorization?.startsWith('Bearer ') || !expectedHash?.match(/^[a-f0-9]{64}$/i)) return false;

  const token = authorization.slice('Bearer '.length).trim();
  if (token.length < 32) return false;

  const actual = Buffer.from(hashAutomationToken(token), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}
