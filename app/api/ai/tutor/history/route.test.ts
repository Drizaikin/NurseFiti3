import { describe, it, expect, vi, beforeEach } from 'vitest';

const { mockSupabaseAuth, mockSupabaseFrom } = vi.hoisted(() => {
  const mockSupabaseAuth = { getUser: vi.fn() };
  const mockSupabaseFrom = vi.fn();
  return { mockSupabaseAuth, mockSupabaseFrom };
});

vi.mock('@/lib/supabase/server', () => ({
  createRouteClient: () => ({
    auth: mockSupabaseAuth,
    from: mockSupabaseFrom,
  }),
}));

import { GET, POST, DELETE } from './route';
import { NextRequest } from 'next/server';

describe('AI Tutor History API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('rejects unauthorized requests with 401 on GET', async () => {
    mockSupabaseAuth.getUser.mockResolvedValueOnce({ data: { user: null } });
    const res = await GET();
    expect(res.status).toBe(401);
  });

  it('returns empty list gracefully if table is not migrated on GET', async () => {
    mockSupabaseAuth.getUser.mockResolvedValueOnce({ data: { user: { id: 'u1' } } });
    mockSupabaseFrom.mockReturnValueOnce({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValueOnce({
        data: null,
        error: { message: "Could not find the table 'public.ai_tutor_conversations'" },
      }),
    });

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.sessions).toEqual([]);
    expect(body.dbAvailable).toBe(false);
  });

  it('returns sessions successfully on GET', async () => {
    mockSupabaseAuth.getUser.mockResolvedValueOnce({ data: { user: { id: 'u1' } } });
    const sample = [{ id: 's1', title: 'Pharm Session', messages: [], updated_at: '2026-10-15T00:00:00Z' }];
    mockSupabaseFrom.mockReturnValueOnce({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValueOnce({
        data: sample,
        error: null,
      }),
    });

    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.sessions).toHaveLength(1);
    expect(body.sessions[0].title).toBe('Pharm Session');
  });

  it('handles POST upsert and returns fallback if table query fails', async () => {
    mockSupabaseAuth.getUser.mockResolvedValueOnce({ data: { user: { id: 'u1' } } });
    mockSupabaseFrom.mockReturnValueOnce({
      upsert: vi.fn().mockReturnThis(),
      select: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValueOnce({
        data: null,
        error: { message: 'Table does not exist' },
      }),
    });

    const req = new NextRequest('http://localhost/api/ai/tutor/history', {
      method: 'POST',
      body: JSON.stringify({
        id: 'session-123',
        title: 'Cardiac Pharmacology',
        messages: [{ role: 'user', content: 'What is digoxin toxicity?' }],
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.localOnly).toBe(true);
  });

  it('handles DELETE request', async () => {
    mockSupabaseAuth.getUser.mockResolvedValueOnce({ data: { user: { id: 'u1' } } });
    mockSupabaseFrom.mockReturnValueOnce({
      delete: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
    });

    const req = new NextRequest('http://localhost/api/ai/tutor/history?id=session-123', {
      method: 'DELETE',
    });

    const res = await DELETE(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.success).toBe(true);
  });
});
