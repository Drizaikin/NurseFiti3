import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSupabaseAuth } = vi.hoisted(() => {
  const mockSupabaseAuth = {
    getUser: vi.fn(),
    getSession: vi.fn(),
  };
  return { mockSupabaseAuth };
});

vi.mock('@/lib/supabase/server', () => ({
  createRouteClient: () => ({
    auth: mockSupabaseAuth,
  }),
}));

import { POST } from './route';

describe('AI Tutor Speak API (/api/ai/tutor/speak)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.DEEPGRAM_API_KEY = 'test-deepgram-key';
  });

  it('returns 503 if DEEPGRAM_API_KEY is not set', async () => {
    delete process.env.DEEPGRAM_API_KEY;
    const req = new Request('http://localhost/api/ai/tutor/speak', {
      method: 'POST',
      body: JSON.stringify({ text: 'Hello' }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.fallback).toBe('browser');
  });

  it('returns 401 if no user authentication is found', async () => {
    mockSupabaseAuth.getUser.mockResolvedValue({ data: { user: null } });
    mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });

    const req = new Request('http://localhost/api/ai/tutor/speak', {
      method: 'POST',
      body: JSON.stringify({ text: 'Hello' }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(401);
  });

  it('accepts authorization Bearer token if cookies are missing', async () => {
    mockSupabaseAuth.getUser.mockImplementation((token?: string) => {
      if (token === 'valid-user-jwt') {
        return Promise.resolve({ data: { user: { id: 'user-123' } } });
      }
      return Promise.resolve({ data: { user: null } });
    });
    mockSupabaseAuth.getSession.mockResolvedValue({ data: { session: null } });

    const originalFetch = globalThis.fetch;
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'audio/mp3' }),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
    });
    globalThis.fetch = mockFetch;

    const req = new Request('http://localhost/api/ai/tutor/speak', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer valid-user-jwt',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: 'Hello student', model: 'aura-angus-en' }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(200);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('model=aura-angus-en'),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Token test-deepgram-key',
        }),
      })
    );

    globalThis.fetch = originalFetch;
  });

  it('forwards the selected voice model accurately to Deepgram', async () => {
    mockSupabaseAuth.getUser.mockResolvedValue({ data: { user: { id: 'u1' } } });

    const originalFetch = globalThis.fetch;
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'audio/mp3' }),
      arrayBuffer: () => Promise.resolve(new ArrayBuffer(10)),
    });
    globalThis.fetch = mockFetch;

    const req = new Request('http://localhost/api/ai/tutor/speak', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: '### Clinical pearl: check airway',
        model: 'aura-zeus-en',
      }),
    });

    const res = await POST(req as any);
    expect(res.status).toBe(200);

    const calledUrl = mockFetch.mock.calls[0][0];
    const calledBody = JSON.parse(mockFetch.mock.calls[0][1].body);

    expect(calledUrl).toContain('model=aura-zeus-en');
    // Ensure markdown hashes are stripped
    expect(calledBody.text).not.toContain('###');
    expect(calledBody.text).toContain('Clinical pearl: check airway');

    globalThis.fetch = originalFetch;
  });
});
