import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Hoisted mocks
const { mockGenerateContent, MockGoogleGenAI } = vi.hoisted(() => {
  const mockGenerateContent = vi.fn();
  class MockGoogleGenAI {
    models: { generateContent: any };
    constructor() {
      this.models = { generateContent: mockGenerateContent };
    }
  }
  return { mockGenerateContent, MockGoogleGenAI };
});

const { mockSupabaseAuth, mockSupabaseFrom, mockAdminFrom, mockAdminRpc } = vi.hoisted(() => {
  const mockSupabaseAuth = { getUser: vi.fn() };
  const mockSupabaseFrom = vi.fn();
  const mockAdminFrom = vi.fn();
  const mockAdminRpc = vi.fn();
  return { mockSupabaseAuth, mockSupabaseFrom, mockAdminFrom, mockAdminRpc };
});

vi.mock('@google/genai', () => ({
  GoogleGenAI: MockGoogleGenAI,
}));

vi.mock('@/lib/supabase/server', () => ({
  createRouteClient: () => ({
    auth: mockSupabaseAuth,
    from: mockSupabaseFrom,
  }),
}));

vi.mock('@/lib/supabase/admin', () => ({
  createAdminClient: () => ({
    from: mockAdminFrom,
    rpc: mockAdminRpc,
  }),
}));

// Mock environment
vi.stubEnv('GEMINI_API_KEY', 'test-key');

// Import after mocks
import { POST } from './route';

// Mock NextRequest
class MockNextRequest {
  constructor(
    public body: any,
    public headers: Record<string, string> = {}
  ) {}
  json() { return Promise.resolve(this.body); }
}

describe('AI Tutor fallback', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure API key is set for each test
    process.env.GEMINI_API_KEY = 'test-key';
    // Default successful auth
    mockSupabaseAuth.getUser.mockResolvedValue({ data: { user: { id: 'user-1' } } });
    mockSupabaseFrom.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({ data: { cadre: 'KRCHN' } }),
      maybeSingle: vi.fn().mockResolvedValue({ data: { cadre: 'KRCHN' } }),
    });
    mockAdminFrom.mockReturnValue({
      select: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      or: vi.fn().mockReturnThis(),
      order: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue({ data: [] }),
      maybeSingle: vi.fn().mockResolvedValue({ data: null }),
    });
    mockAdminRpc.mockResolvedValue({ data: [] });
  });

  afterEach(() => {
    delete process.env.GEMINI_API_KEY;
  });

  it('returns answer on primary model success', async () => {
    mockGenerateContent.mockResolvedValue({ text: 'Primary answer' });

    const req = new MockNextRequest({ message: 'Hello', history: [] });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.answer).toBe('Primary answer');
    expect(mockGenerateContent).toHaveBeenCalledTimes(1);
    expect(mockGenerateContent).toHaveBeenCalledWith(
      expect.objectContaining({ model: 'gemini-3.8-flash' }),
      expect.any(Object)
    );
  });

  it('falls back to secondary on primary transient error', async () => {
    mockGenerateContent
      .mockRejectedValueOnce(new Error('503 Service Unavailable'))
      .mockResolvedValueOnce({ text: 'Secondary answer' });

    const req = new MockNextRequest({ message: 'Hello', history: [] });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.answer).toBe('Secondary answer');
    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
    expect(mockGenerateContent).toHaveBeenNthCalledWith(1, expect.objectContaining({ model: 'gemini-3.8-flash' }), expect.any(Object));
    expect(mockGenerateContent).toHaveBeenNthCalledWith(2, expect.objectContaining({ model: 'gemini-3.6-flash' }), expect.any(Object));
  });

  it('falls back to tertiary when first two fail transiently', async () => {
    mockGenerateContent
      .mockRejectedValueOnce(new Error('503'))
      .mockRejectedValueOnce(new Error('429'))
      .mockResolvedValueOnce({ text: 'Tertiary answer' });

    const req = new MockNextRequest({ message: 'Hello', history: [] });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.answer).toBe('Tertiary answer');
    expect(mockGenerateContent).toHaveBeenCalledTimes(3);
  });

  it('skips permanently invalid model and continues', async () => {
    mockGenerateContent
      .mockRejectedValueOnce({ status: 404, message: 'Model not found' })
      .mockResolvedValueOnce({ text: 'Secondary answer' });

    const req = new MockNextRequest({ message: 'Hello', history: [] });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.answer).toBe('Secondary answer');
    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
    expect(mockGenerateContent).toHaveBeenNthCalledWith(2, expect.objectContaining({ model: 'gemini-3.6-flash' }), expect.any(Object));
  });

  it('returns 503 when all three models fail transiently', async () => {
    mockGenerateContent
      .mockRejectedValueOnce(new Error('503'))
      .mockRejectedValueOnce(new Error('503'))
      .mockRejectedValueOnce(new Error('503'));

    const req = new MockNextRequest({ message: 'Hello', history: [] });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(503);
    expect(json.error).toContain('busy');
    expect(mockGenerateContent).toHaveBeenCalledTimes(3);
  });

  it('does not retry same model on transient error', async () => {
    mockGenerateContent
      .mockRejectedValueOnce(new Error('503'))
      .mockResolvedValueOnce({ text: 'Secondary answer' });

    const req = new MockNextRequest({ message: 'Hello', history: [] });
    await POST(req as any);

    expect(mockGenerateContent).toHaveBeenCalledTimes(2);
  });

  it('returns 401 when unauthorized', async () => {
    mockSupabaseAuth.getUser.mockResolvedValue({ data: { user: null } });

    const req = new MockNextRequest({ message: 'Hello' });
    const res = await POST(req as any);

    expect(res.status).toBe(401);
  });

  it('returns 400 when message missing', async () => {
    const req = new MockNextRequest({ message: '' });
    const res = await POST(req as any);

    expect(res.status).toBe(400);
  });

  it('retrieves student material and global textbooks in synergy', async () => {
    mockGenerateContent.mockResolvedValue({ text: 'Synergy response' });
    mockAdminRpc
      .mockResolvedValueOnce({
        data: [{ id: 'c-1', material_id: 'mat-student', title: 'Student Notes', chunk_index: 0, content: 'Student content' }],
      })
      .mockResolvedValueOnce({
        data: [{ id: 'c-2', material_id: 'mat-global', title: 'Core Textbook', chunk_index: 2, content: 'Textbook content' }],
      });

    const req = new MockNextRequest({ message: 'Explain hypertension', materialId: 'mat-student' });
    const res = await POST(req as any);
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.answer).toBe('Synergy response');
    expect(mockAdminRpc).toHaveBeenCalledTimes(2);
    expect(mockAdminRpc).toHaveBeenNthCalledWith(1, 'search_ai_tutor_chunks', expect.objectContaining({
      p_material_id: 'mat-student',
    }));
    expect(mockAdminRpc).toHaveBeenNthCalledWith(2, 'search_ai_tutor_chunks', expect.objectContaining({
      p_material_id: null,
      p_user_id: null,
    }));
    expect(json.sources).toEqual([
      { title: 'Student Notes', chunkIndex: 0, isStudentDoc: true },
      { title: 'Core Textbook', chunkIndex: 2, isStudentDoc: false },
    ]);
  });
});