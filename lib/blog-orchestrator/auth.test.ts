import { describe, expect, it } from 'vitest';
import { hashAutomationToken, verifyAutomationBearer } from './auth';

describe('verifyAutomationBearer', () => {
  const token = 'a'.repeat(48);
  const hash = hashAutomationToken(token);

  it('accepts the matching bearer token', () => {
    expect(verifyAutomationBearer(`Bearer ${token}`, hash)).toBe(true);
  });

  it('rejects missing, short and incorrect tokens', () => {
    expect(verifyAutomationBearer(null, hash)).toBe(false);
    expect(verifyAutomationBearer('Bearer short', hash)).toBe(false);
    expect(verifyAutomationBearer(`Bearer ${'b'.repeat(48)}`, hash)).toBe(false);
  });
});
