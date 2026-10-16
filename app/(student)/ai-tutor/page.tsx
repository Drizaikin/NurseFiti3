'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DeepgramClient } from '@deepgram/sdk';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { TutorMarkdown } from '@/components/ai/TutorMarkdown';
import { AiTutorExitFeedbackModal } from '@/components/ai/AiTutorExitFeedbackModal';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';
import {
  LocalMaterial,
  getLocalMaterials,
  saveLocalMaterial,
  deleteLocalMaterial,
  searchLocalChunks,
  extractTextFromClientFile,
  chunkClientText,
} from '@/lib/ai/localTutorStore';

interface Material {
  id: string;
  title: string;
  scope?: string;
}

interface SourceItem {
  title: string;
  chunkIndex: number;
  isStudentDoc?: boolean;
}

interface ChatMessage {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  visible?: string;
  sources?: SourceItem[];
}

interface ChatSession {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
}

const STORAGE_KEY_SESSIONS = 'nursefiti_ai_tutor_sessions_v2';
const STORAGE_KEY_ACTIVE = 'nursefiti_ai_tutor_active_session_id_v2';

const DEFAULT_WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome-initial',
  role: 'assistant',
  content:
    'Hello! I am NurseFiti AI Clinical Tutor. I am connected to your core nursing textbooks, your uploaded notes, and your practice exam performance. Ask me anything, request a diagnosis of your weak areas, or click below to review questions you recently failed!',
  visible:
    'Hello! I am NurseFiti AI Clinical Tutor. I am connected to your core nursing textbooks, your uploaded notes, and your practice exam performance. Ask me anything, request a diagnosis of your weak areas, or click below to review questions you recently failed!',
};

const SUGGESTED_PROMPTS = [
  '📊 Analyze my weak topics and mistake patterns',
  '❌ Review questions I recently failed',
  '🎯 Quiz me on my weakest unit',
  '💡 Explain this concept in simple terms',
  '🏥 What should I remember for the NCK exam?',
];

interface TutorVoiceOption {
  id: string;
  name: string;
  accent: 'British' | 'American';
  gender: 'Female' | 'Male';
  flag: string;
  persona: string;
  sample: string;
  langCode: string;
  pitch: number;
  rate: number;
}

const AI_TUTOR_VOICES: TutorVoiceOption[] = [
  {
    id: 'aura-athena-en',
    name: 'Athena',
    accent: 'British',
    gender: 'Female',
    flag: '🇬🇧',
    persona: 'Scholarly UK Clinical Professor · Crisp, Academic & Articulate',
    sample: 'Hello! I am Athena. We will review clinical scenarios and NCLEX principles methodically.',
    langCode: 'en-GB',
    pitch: 1.05,
    rate: 1.00,
  },
  {
    id: 'aura-angus-en',
    name: 'Angus',
    accent: 'British',
    gender: 'Male',
    flag: '🇬🇧',
    persona: 'Senior UK Consultant Clinician · Analytical, Grounded & Clear',
    sample: 'Greetings. Let us examine the physiological mechanism and diagnostic criteria together.',
    langCode: 'en-GB',
    pitch: 0.90,
    rate: 0.98,
  },
  {
    id: 'aura-asteria-en',
    name: 'Asteria',
    accent: 'American',
    gender: 'Female',
    flag: '🇺🇸',
    persona: 'Warm Bedside Nurse Preceptor · Compassionate & Encouraging',
    sample: 'Hi there! I am Asteria. Remember to always prioritize airway and circulation first.',
    langCode: 'en-US',
    pitch: 1.00,
    rate: 1.00,
  },
  {
    id: 'aura-luna-en',
    name: 'Luna',
    accent: 'American',
    gender: 'Female',
    flag: '🇺🇸',
    persona: 'Calm Clinical Coach · Patient, Soothing & Reassuring',
    sample: 'Take a steady breath. We have plenty of time to master this pharmacology concept.',
    langCode: 'en-US',
    pitch: 1.12,
    rate: 0.92,
  },
  {
    id: 'aura-stella-en',
    name: 'Stella',
    accent: 'American',
    gender: 'Female',
    flag: '🇺🇸',
    persona: 'Focused NCLEX Specialist · Direct, Sharp & High-Yield',
    sample: 'Let us isolate the key question stem and eliminate the incorrect distractors.',
    langCode: 'en-US',
    pitch: 1.18,
    rate: 1.06,
  },
  {
    id: 'aura-hera-en',
    name: 'Hera',
    accent: 'American',
    gender: 'Female',
    flag: '🇺🇸',
    persona: 'Senior Nurse Specialist · Confident, Authoritative & Decisive',
    sample: 'In critical emergencies, swift clinical judgment and standardized protocols save lives.',
    langCode: 'en-US',
    pitch: 0.94,
    rate: 1.02,
  },
  {
    id: 'aura-orion-en',
    name: 'Orion',
    accent: 'American',
    gender: 'Male',
    flag: '🇺🇸',
    persona: 'Steady Clinical Guide · Methodical, Calm & Structured',
    sample: 'Good work. Let us trace this pathophysiology from cellular origin to presenting symptoms.',
    langCode: 'en-US',
    pitch: 0.88,
    rate: 0.96,
  },
  {
    id: 'aura-arcas-en',
    name: 'Arcas',
    accent: 'American',
    gender: 'Male',
    flag: '🇺🇸',
    persona: 'Healthcare Educator · Smooth, Approachable & Accessible',
    sample: 'Welcome back. Let us break down this nursing care plan into manageable milestones.',
    langCode: 'en-US',
    pitch: 0.96,
    rate: 1.02,
  },
  {
    id: 'aura-perseus-en',
    name: 'Perseus',
    accent: 'American',
    gender: 'Male',
    flag: '🇺🇸',
    persona: 'Dynamic Clinical Instructor · Energetic, Inspiring & Engaging',
    sample: 'Fantastic question! Here is the clinical pearl that makes this concept click every time.',
    langCode: 'en-US',
    pitch: 1.04,
    rate: 1.08,
  },
  {
    id: 'aura-zeus-en',
    name: 'Zeus',
    accent: 'American',
    gender: 'Male',
    flag: '🇺🇸',
    persona: 'Senior Medical Authority · Deep Resonance, Resolute & Commanding',
    sample: 'Standardized nursing practice demands vigilance, sterile precision, and sound evidence.',
    langCode: 'en-US',
    pitch: 0.80,
    rate: 0.92,
  },
];

const STORAGE_KEY_VOICE = 'nf_ai_tutor_selected_voice';

function createDefaultSession(): ChatSession {
  return {
    id: crypto.randomUUID(),
    title: 'New Clinical Session',
    updatedAt: new Date().toISOString(),
    messages: [DEFAULT_WELCOME_MESSAGE],
  };
}

export default function AiTutorPage() {
  // Session & persistence state
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  // Active chat state
  const [messages, setMessages] = useState<ChatMessage[]>([DEFAULT_WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [localMaterials, setLocalMaterials] = useState<LocalMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [showUploadPanel, setShowUploadPanel] = useState(false);
  const [shareWithLibrary, setShareWithLibrary] = useState(true);

  // Audio / Voice state
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<string>('aura-asteria-en');
  const selectedVoiceRef = useRef<string>('aura-asteria-en');

  useEffect(() => {
    selectedVoiceRef.current = selectedVoice;
  }, [selectedVoice]);

  const getAuthHeaders = useCallback(async () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.access_token) {
        headers['Authorization'] = `Bearer ${session.access_token}`;
      }
    } catch {}
    return headers;
  }, []);

  // Preload speech synthesis voices so they are instantly ready when fallback is needed
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }
  }, []);
  const [showVoicePicker, setShowVoicePicker] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [previewingVoiceId, setPreviewingVoiceId] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isSynthesizingVoice, setIsSynthesizingVoice] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const listenConnectionRef = useRef<any>(null);
  const browserRecognitionRef = useRef<any>(null);
  const voiceEnabledRef = useRef(false);
  const replyAbortRef = useRef<AbortController | null>(null);
  const replySequenceRef = useRef(0);
  const sendMessageRef = useRef<(text: string) => void>(() => {});
  const activeSessionIdRef = useRef<string>('');
  const router = useRouter();
  const [showExitModal, setShowExitModal] = useState(false);
  const isFeedbackSubmittedRef = useRef(false);
  const pendingDestinationRef = useRef<string | null>(null);
  const isBackNavRef = useRef(false);

  useEffect(() => {
    voiceEnabledRef.current = voiceEnabled;
  }, [voiceEnabled]);

  useEffect(() => {
    activeSessionIdRef.current = activeSessionId;
  }, [activeSessionId]);

  // Intercept navigation away from the AI Tutor page to prompt for exit feedback
  useEffect(() => {
    try {
      window.history.pushState({ page: 'ai-tutor' }, '', window.location.href);
    } catch {}

    const handleAnchorClick = (e: MouseEvent) => {
      if (isFeedbackSubmittedRef.current) return;

      const target = e.target as HTMLElement | null;
      const anchor = target?.closest('a') as HTMLAnchorElement | null;
      if (!anchor || !anchor.href) return;

      if (anchor.target === '_blank' || anchor.rel?.includes('external')) return;

      try {
        const targetUrl = new URL(anchor.href, window.location.href);
        if (targetUrl.origin !== window.location.origin) return;
        if (targetUrl.pathname === window.location.pathname) return;

        // User is attempting to leave the AI Tutor page
        e.preventDefault();
        e.stopPropagation();

        pendingDestinationRef.current = targetUrl.pathname + targetUrl.search + targetUrl.hash;
        isBackNavRef.current = false;
        setShowExitModal(true);
      } catch {}
    };

    const handlePopState = () => {
      if (isFeedbackSubmittedRef.current) return;

      try {
        window.history.pushState({ page: 'ai-tutor' }, '', window.location.href);
      } catch {}

      isBackNavRef.current = true;
      pendingDestinationRef.current = null;
      setShowExitModal(true);
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isFeedbackSubmittedRef.current && messages.length > 1) {
        e.preventDefault();
        e.returnValue = 'Before leaving, please tell us how your experience was with the AI Tutor!';
        return e.returnValue;
      }
    };

    document.addEventListener('click', handleAnchorClick, true);
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleAnchorClick, true);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [messages.length]);

  const handleProceedExit = () => {
    isFeedbackSubmittedRef.current = true;
    setShowExitModal(false);

    if (pendingDestinationRef.current) {
      router.push(pendingDestinationRef.current);
    } else if (isBackNavRef.current) {
      window.history.back();
    } else {
      router.push('/dashboard');
    }
  };

  const handleStay = () => {
    setShowExitModal(false);
    pendingDestinationRef.current = null;
    isBackNavRef.current = false;
  };

  // Load materials from server
  const loadMaterials = useCallback(async () => {
    try {
      const res = await fetch('/api/ai/tutor/materials');
      const d = await res.json();
      if (res.ok) setMaterials(d.materials ?? []);
    } catch {}
  }, []);

  // Load student-uploaded local materials from browser IndexedDB (zero database quota used)
  const loadLocalMaterials = useCallback(async () => {
    try {
      const items = await getLocalMaterials();
      setLocalMaterials(items);
    } catch (err) {
      console.warn('[ai-tutor] Failed to load local materials:', err);
    }
  }, []);

  // 1. Initial Load: Instant 0ms Local Storage Cache + Background Remote Sync
  useEffect(() => {
    loadMaterials();
    loadLocalMaterials();

    // Instant local voice preference load
    try {
      const savedVoice = localStorage.getItem(STORAGE_KEY_VOICE);
      if (savedVoice && AI_TUTOR_VOICES.some((v) => v.id === savedVoice)) {
        setSelectedVoice(savedVoice);
        selectedVoiceRef.current = savedVoice;
      }
    } catch {}

    // Instant local load (zero lag)
    try {
      const storedSessionsJson = localStorage.getItem(STORAGE_KEY_SESSIONS);
      const storedActiveId = localStorage.getItem(STORAGE_KEY_ACTIVE);

      if (storedSessionsJson) {
        const parsed: ChatSession[] = JSON.parse(storedSessionsJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setSessions(parsed);
          const active = parsed.find((s) => s.id === storedActiveId) || parsed[0];
          setActiveSessionId(active.id);
          setMessages(active.messages && active.messages.length > 0 ? active.messages : [DEFAULT_WELCOME_MESSAGE]);
        } else {
          const fresh = createDefaultSession();
          setSessions([fresh]);
          setActiveSessionId(fresh.id);
          setMessages(fresh.messages);
          localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify([fresh]));
          localStorage.setItem(STORAGE_KEY_ACTIVE, fresh.id);
        }
      } else {
        const fresh = createDefaultSession();
        setSessions([fresh]);
        setActiveSessionId(fresh.id);
        setMessages(fresh.messages);
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify([fresh]));
        localStorage.setItem(STORAGE_KEY_ACTIVE, fresh.id);
      }
    } catch (e) {
      console.warn('[ai/tutor] LocalStorage load fallback:', e);
      const fresh = createDefaultSession();
      setSessions([fresh]);
      setActiveSessionId(fresh.id);
      setMessages(fresh.messages);
    }

    // Background server sync (non-blocking)
    fetch('/api/ai/tutor/history')
      .then((res) => res.json())
      .then((data) => {
        if (data?.sessions && Array.isArray(data.sessions) && data.sessions.length > 0) {
          setSessions((prevLocal) => {
            const map = new Map<string, ChatSession>();
            for (const s of prevLocal) map.set(s.id, s);
            for (const s of data.sessions) {
              const local = map.get(s.id);
              if (!local || new Date(s.updated_at).getTime() > new Date(local.updatedAt).getTime()) {
                map.set(s.id, {
                  id: s.id,
                  title: s.title || 'Study Session',
                  updatedAt: s.updated_at,
                  messages: Array.isArray(s.messages) && s.messages.length > 0 ? s.messages : [DEFAULT_WELCOME_MESSAGE],
                });
              }
            }
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
            );
            try {
              localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(merged));
            } catch {}
            return merged;
          });
        }
      })
      .catch((err) => console.warn('[ai/tutor] Remote history sync note:', err));
  }, [loadMaterials]);

  // Auto-scroll chat container to bottom when messages update
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, isLoading]);

  // Clean up audio & streams on unmount
  useEffect(() => {
    return () => {
      replyAbortRef.current?.abort();
      if (audioPlayerRef.current) {
        audioPlayerRef.current.pause();
        audioPlayerRef.current = null;
      }
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      processorRef.current?.disconnect();
      mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
      try {
        listenConnectionRef.current?.close();
      } catch {}
      void audioContextRef.current?.close().catch(() => {});
    };
  }, []);

  // Save active session to local storage & background sync
  const persistSession = useCallback((updatedMessages: ChatMessage[], sessionTitle?: string) => {
    const activeId = activeSessionIdRef.current;
    if (!activeId) return;

    setSessions((prevSessions) => {
      const idx = prevSessions.findIndex((s) => s.id === activeId);
      const existing = idx >= 0 ? prevSessions[idx] : null;

      // Smart title: if current title is default, use first user question
      let nextTitle = sessionTitle || existing?.title || 'New Clinical Session';
      if ((nextTitle === 'New Clinical Session' || nextTitle === 'Study Session') && updatedMessages.length > 1) {
        const firstUserMsg = updatedMessages.find((m) => m.role === 'user');
        if (firstUserMsg) {
          nextTitle = firstUserMsg.content.slice(0, 48).trim();
          if (firstUserMsg.content.length > 48) nextTitle += '…';
        }
      }

      const updatedSession: ChatSession = {
        id: activeId,
        title: nextTitle,
        updatedAt: new Date().toISOString(),
        messages: updatedMessages,
      };

      const nextSessions = idx >= 0
        ? [updatedSession, ...prevSessions.filter((_, i) => i !== idx)]
        : [updatedSession, ...prevSessions];

      try {
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(nextSessions));
        localStorage.setItem(STORAGE_KEY_ACTIVE, activeId);
      } catch (err) {
        console.warn('[ai/tutor] LocalStorage save error:', err);
      }

      // Non-blocking server background sync
      fetch('/api/ai/tutor/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: updatedSession.id,
          title: updatedSession.title,
          messages: updatedSession.messages,
        }),
      }).catch((e) => console.warn('[ai/tutor] Background history sync failed:', e));

      return nextSessions;
    });
  }, []);

  // Start a fresh clinical session
  const handleNewChat = () => {
    stopVoicePlayback();
    replyAbortRef.current?.abort();
    setIsLoading(false);

    const fresh = createDefaultSession();
    setSessions((prev) => [fresh, ...prev]);
    setActiveSessionId(fresh.id);
    setMessages(fresh.messages);
    setShowHistoryDrawer(false);

    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE, fresh.id);
    } catch {}
    toast.success('Started a new clinical study session');
  };

  // Switch to a previous chat session
  const handleSwitchSession = (session: ChatSession) => {
    stopVoicePlayback();
    replyAbortRef.current?.abort();
    setIsLoading(false);

    setActiveSessionId(session.id);
    setMessages(session.messages && session.messages.length > 0 ? session.messages : [DEFAULT_WELCOME_MESSAGE]);
    setShowHistoryDrawer(false);

    try {
      localStorage.setItem(STORAGE_KEY_ACTIVE, session.id);
    } catch {}
  };

  // Delete a session
  const handleDeleteSession = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this study session?')) return;

    setSessions((prev) => {
      const filtered = prev.filter((s) => s.id !== sessionId);
      try {
        localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(filtered));
      } catch {}

      if (sessionId === activeSessionIdRef.current) {
        if (filtered.length > 0) {
          setActiveSessionId(filtered[0].id);
          setMessages(filtered[0].messages);
          try {
            localStorage.setItem(STORAGE_KEY_ACTIVE, filtered[0].id);
          } catch {}
        } else {
          const fresh = createDefaultSession();
          setActiveSessionId(fresh.id);
          setMessages(fresh.messages);
          try {
            localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify([fresh]));
            localStorage.setItem(STORAGE_KEY_ACTIVE, fresh.id);
          } catch {}
          return [fresh];
        }
      }
      return filtered;
    });

    fetch(`/api/ai/tutor/history?id=${encodeURIComponent(sessionId)}`, { method: 'DELETE' }).catch(() => {});
    toast.success('Session deleted');
  };

  // Browser Speech Synthesis fallback: Guaranteed offline/client voice support with distinct persona acoustics
  const playBrowserSpeech = (text: string, messageId?: string, voiceOverride?: TutorVoiceOption) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSynthesizingVoice(false);
      setSpeakingMessageId(null);
      setIsSpeaking(false);
      setPreviewingVoiceId(null);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      const targetVoice =
        voiceOverride ||
        AI_TUTOR_VOICES.find((v) => v.id === selectedVoiceRef.current) ||
        AI_TUTOR_VOICES[0];

      // Set custom pitch & rate to ensure every persona sounds distinct even on limited system synthesizers
      utterance.pitch = targetVoice.pitch ?? 1.0;
      utterance.rate = targetVoice.rate ?? 1.0;
      utterance.lang = targetVoice.langCode || (targetVoice.accent === 'British' ? 'en-GB' : 'en-US');

      const voices = window.speechSynthesis.getVoices();
      const isBritish = targetVoice.accent === 'British';
      const isMale = targetVoice.gender === 'Male';

      const maleKeywords = ['david', 'mark', 'alex', 'fred', 'george', 'daniel', 'guy', 'oliver', 'tom', 'male', 'ryan', 'arthur'];
      const femaleKeywords = ['zira', 'samantha', 'jenny', 'ava', 'karen', 'hazel', 'susan', 'stephanie', 'kate', 'serena', 'female', 'fiona', 'sonia', 'libby'];

      let matchedVoice: SpeechSynthesisVoice | undefined;

      if (voices.length > 0) {
        // Step 1: Match both accent/locale and gender
        const targetLocaleVoices = voices.filter((v) => {
          const l = v.lang.toLowerCase();
          return isBritish
            ? l.startsWith('en-gb') || l.startsWith('en-uk') || l.startsWith('en_gb')
            : l.startsWith('en-us') || l.startsWith('en_us');
        });

        const pool = targetLocaleVoices.length > 0 ? targetLocaleVoices : voices.filter((v) => v.lang.toLowerCase().startsWith('en'));

        if (pool.length > 0) {
          const targetKeywords = isMale ? maleKeywords : femaleKeywords;
          const avoidKeywords = isMale ? femaleKeywords : maleKeywords;

          // Prefer matching positive keywords and not matching opposite keywords
          matchedVoice = pool.find((v) => {
            const nameLower = v.name.toLowerCase();
            const hasTarget = targetKeywords.some((k) => nameLower.includes(k));
            const hasAvoid = avoidKeywords.some((k) => nameLower.includes(k));
            return hasTarget && !hasAvoid;
          });

          // Second pass: any voice matching target gender keyword in name
          if (!matchedVoice) {
            matchedVoice = pool.find((v) => {
              const nameLower = v.name.toLowerCase();
              return targetKeywords.some((k) => nameLower.includes(k));
            });
          }

          // Third pass: pick a distinct voice by hashing persona ID across candidate pool
          if (!matchedVoice && pool.length > 0) {
            const voiceIndex = Math.abs(
              targetVoice.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
            ) % pool.length;
            matchedVoice = pool[voiceIndex];
          }
        }
      }

      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsSynthesizingVoice(false);
        if (voiceOverride) setPreviewingVoiceId(voiceOverride.id);
        if (messageId) setSpeakingMessageId(messageId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        setIsSynthesizingVoice(false);
        if (voiceOverride) setPreviewingVoiceId(null);
      };

      utterance.onerror = (e) => {
        console.warn('[ai/tutor] Browser speech error:', e);
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        setIsSynthesizingVoice(false);
        if (voiceOverride) setPreviewingVoiceId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('[ai/tutor] Web speech synthesis failed:', e);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      setIsSynthesizingVoice(false);
      if (voiceOverride) setPreviewingVoiceId(null);
    }
  };

  // Voice Audio Engine: Plays tutor audio via neural `/api/ai/tutor/speak` with browser fallback
  const stopVoicePlayback = () => {
    if (audioPlayerRef.current) {
      audioPlayerRef.current.pause();
      audioPlayerRef.current.currentTime = 0;
      audioPlayerRef.current = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakingMessageId(null);
    setIsSynthesizingVoice(false);
    setPreviewingVoiceId(null);
  };

  const handleSelectVoice = (voiceId: string) => {
    setSelectedVoice(voiceId);
    selectedVoiceRef.current = voiceId;
    try {
      localStorage.setItem(STORAGE_KEY_VOICE, voiceId);
    } catch {}
    const v = AI_TUTOR_VOICES.find((item) => item.id === voiceId);
    toast.success(`Voice set to ${v?.name || voiceId} (${v?.accent} Accent)`);
    setShowVoicePicker(false);
  };

  const previewVoiceSample = async (e: React.MouseEvent, v: TutorVoiceOption) => {
    e.stopPropagation();
    if (previewingVoiceId === v.id && isSpeaking) {
      stopVoicePlayback();
      return;
    }

    stopVoicePlayback();
    setPreviewingVoiceId(v.id);
    setIsSynthesizingVoice(true);

    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/ai/tutor/speak', {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: v.sample, model: v.id }),
      });

      if (res.ok) {
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audioPlayerRef.current = audio;

        audio.onplay = () => {
          setIsSpeaking(true);
          setIsSynthesizingVoice(false);
        };
        audio.onended = () => {
          setIsSpeaking(false);
          setPreviewingVoiceId(null);
          URL.revokeObjectURL(audioUrl);
          audioPlayerRef.current = null;
        };
        audio.onerror = () => {
          setPreviewingVoiceId(null);
          playBrowserSpeech(v.sample, undefined, v);
        };
        await audio.play();
        return;
      }
    } catch (err) {
      console.warn('[ai/tutor] Voice preview API error, falling back to browser speech:', err);
    }

    setPreviewingVoiceId(null);
    playBrowserSpeech(v.sample, undefined, v);
  };

  const playTutorAudio = async (text: string, messageId?: string) => {
    stopVoicePlayback();
    if (!text || !text.trim()) return;

    // Clean text for natural speech synthesis
    const clean = text
      .replace(/\|[^\n]+\|/g, '') // strip table formatting
      .replace(/[*#_`~]/g, '')
      .replace(/^>\s*/gm, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/⚠️/g, 'Clinical warning: ')
      .replace(/💡/g, 'Clinical pearl: ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Use first 1200 characters to keep voice generation instant with zero lag
    const speechSegment = clean.slice(0, 1200);
    if (!speechSegment) return;

    const activeVoiceId = selectedVoiceRef.current;
    const currentVoiceOption =
      AI_TUTOR_VOICES.find((v) => v.id === activeVoiceId) || AI_TUTOR_VOICES[0];

    setIsSynthesizingVoice(true);
    if (messageId) setSpeakingMessageId(messageId);

    try {
      const headers = await getAuthHeaders();
      const res = await fetch('/api/ai/tutor/speak', {
        method: 'POST',
        headers,
        body: JSON.stringify({ text: speechSegment, model: activeVoiceId }),
      });

      if (!res.ok) {
        // Fall back seamlessly to browser speech synthesis
        console.info('[ai/tutor] Neural voice API returned', res.status, '— using browser speech synthesis');
        playBrowserSpeech(speechSegment, messageId, currentVoiceOption);
        return;
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioPlayerRef.current = audio;

      audio.onplay = () => {
        setIsSpeaking(true);
        setIsSynthesizingVoice(false);
        if (messageId) setSpeakingMessageId(messageId);
      };

      audio.onended = () => {
        URL.revokeObjectURL(audioUrl);
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        audioPlayerRef.current = null;
      };

      audio.onerror = () => {
        URL.revokeObjectURL(audioUrl);
        audioPlayerRef.current = null;
        // Fallback to browser speech synthesis on decode/playback failure
        playBrowserSpeech(speechSegment, messageId, currentVoiceOption);
      };

      try {
        await audio.play();
      } catch (playErr: any) {
        // Browser autoplay policy blocked unprompted play — fallback to speech synthesis
        console.info('[ai/tutor] Audio play interrupted by browser policy, using speech synthesis:', playErr?.message);
        playBrowserSpeech(speechSegment, messageId, currentVoiceOption);
      }
    } catch (err: any) {
      console.warn('[ai/tutor] Neural audio fetch error, using browser speech synthesis:', err?.message || err);
      playBrowserSpeech(speechSegment, messageId, currentVoiceOption);
    }
  };

  // Upload student study notes (Option 2: parsed and stored 100% on student device via IndexedDB; zero Supabase database quota used)
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error('Choose a textbook file first.');
      return;
    }
    if (uploadFile.size > 50 * 1024 * 1024) {
      toast.error('File too large. Maximum size is 50 MB.');
      return;
    }

    setIsUploading(true);
    setUploadStatus('Reading and extracting text on your device…');

    try {
      // Step 1: Extract text client-side directly on device
      const rawText = await extractTextFromClientFile(uploadFile);
      const chunks = chunkClientText(rawText);

      if (chunks.length === 0) {
        throw new Error('No readable text found in document. If it is an image scan, please use an OCR or text document.');
      }

      const title = uploadTitle.trim() || uploadFile.name.replace(/\.[^.]+$/, '');
      const localId = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      // Step 2: Save to browser IndexedDB (zero database bytes/quotas used on Supabase)
      setUploadStatus(`Indexing ${chunks.length} sections into your browser…`);
      const localMaterial: LocalMaterial = {
        id: localId,
        title,
        fileName: uploadFile.name,
        fileSize: uploadFile.size,
        chunkCount: chunks.length,
        createdAt: new Date().toISOString(),
        sharedWithAdmin: shareWithLibrary,
      };

      const localChunkItems = chunks.map((content, idx) => ({
        id: `${localId}-chunk-${idx}`,
        materialId: localId,
        materialTitle: title,
        chunkIndex: idx,
        content,
      }));

      await saveLocalMaterial(localMaterial, localChunkItems);

      // Step 3: If user opted into sharing with NurseFiti Library, upload raw file for Admin (zero DB chunks generated)
      if (shareWithLibrary) {
        setUploadStatus('Sharing copy with NurseFiti Library…');
        try {
          const signRes = await fetch('/api/ai/tutor/materials', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'get-upload-url',
              fileName: uploadFile.name,
              fileType: uploadFile.type || 'application/octet-stream',
              fileSize: uploadFile.size,
              title,
            }),
          });

          if (signRes.ok) {
            const signData = await signRes.json();
            if (signData?.filePath) {
              const supabase = createClient();
              let uploadSuccess = false;

              try {
                const { error: uploadError } = await supabase.storage
                  .from('ai-tutor-materials')
                  .uploadToSignedUrl(signData.path, signData.token, uploadFile, {
                    contentType: uploadFile.type || 'application/octet-stream',
                    upsert: false,
                  });
                if (!uploadError) uploadSuccess = true;
              } catch (err) {
                console.warn('[ai-tutor] uploadToSignedUrl fallback to PUT:', err);
              }

              if (!uploadSuccess && signData.signedUrl) {
                const putRes = await fetch(signData.signedUrl, {
                  method: 'PUT',
                  body: uploadFile,
                  headers: { 'Content-Type': uploadFile.type || 'application/octet-stream' },
                });
                if (putRes.ok) uploadSuccess = true;
              }

              if (uploadSuccess) {
                await fetch('/api/ai/tutor/materials', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    action: 'share-with-admin',
                    filePath: signData.filePath,
                    fileName: uploadFile.name,
                    fileSize: uploadFile.size,
                    fileType: uploadFile.type || 'application/octet-stream',
                    title,
                  }),
                });
              }
            }
          }
        } catch (shareErr) {
          console.warn('[ai-tutor] Share copy with library notice:', shareErr);
        }
      }

      toast.success(
        `Added "${title}" (${chunks.length} sections) to your device!${
          shareWithLibrary ? ' Copy shared with NurseFiti Library.' : ''
        }`
      );
      setUploadFile(null);
      setUploadTitle('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadLocalMaterials();
      setSelectedMaterial(localId);
      setShowUploadPanel(false);
    } catch (err: any) {
      console.error('[ai-tutor] local upload error:', err);
      toast.error(err.message ?? 'Upload failed');
    } finally {
      setIsUploading(false);
      setUploadStatus('');
    }
  };

  const handleDeleteLocalMaterial = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}" from your browser's local storage?`)) return;
    try {
      await deleteLocalMaterial(id);
      toast.success(`Removed "${name}" from your device`);
      if (selectedMaterial === id) setSelectedMaterial('');
      await loadLocalMaterials();
    } catch (err: any) {
      toast.error(err.message ?? 'Failed to delete');
    }
  };

  // Main message sending pipeline with streaming SSE & auto-audio
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    stopVoicePlayback();
    replyAbortRef.current?.abort();
    const abortController = new AbortController();
    replyAbortRef.current = abortController;
    const sequence = ++replySequenceRef.current;
    const userId = `user-${Date.now()}-${sequence}`;
    const assistantId = `assistant-${Date.now()}-${sequence}`;

    const history = messages
      .slice(-12)
      .filter((m) => m.content)
      .map((m) => ({ role: m.role, content: m.content }));

    const userMessage: ChatMessage = { id: userId, role: 'user', content: trimmed, visible: trimmed };
    const initialAssistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
      visible: '',
      sources: [],
    };

    const newMessages = [...messages, userMessage, initialAssistantMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    let fullAssistantContent = '';

    // Search student device IndexedDB chunks (Option 2: instant local search, zero Supabase quota used)
    let localContext: Array<{ title: string; content: string }> = [];
    try {
      const isLocal = selectedMaterial.startsWith('local-');
      const targetId = isLocal ? selectedMaterial : null;
      if (isLocal || !selectedMaterial) {
        const hits = await searchLocalChunks(trimmed, targetId, 4);
        if (hits.length > 0) {
          localContext = hits.map((h) => ({ title: h.title, content: h.content }));
        }
      }
    } catch (err) {
      console.warn('[ai-tutor] local chunk search error:', err);
    }

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          message: trimmed,
          history,
          materialId: selectedMaterial.startsWith('local-') ? null : (selectedMaterial || null),
          localContext,
          stream: true,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error ?? 'Could not reach the AI Tutor.');
      }
      if (!response.body) throw new Error('The AI Tutor returned an empty response.');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffered = '';
      let receivedAnswer = false;

      const handleBlock = (block: string) => {
        let event = '';
        let data = '';
        for (const line of block.split('\n')) {
          if (line.startsWith('event:')) event = line.slice(6).trim();
          if (line.startsWith('data:')) data += line.slice(5).trim();
        }
        if (!data) return;
        const payload = JSON.parse(data);

        if (event === 'sources') {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, sources: payload.sources ?? [] } : msg
            )
          );
        } else if (event === 'token') {
          const token = String(payload.text ?? '');
          if (!token) return;
          receivedAnswer = true;
          fullAssistantContent += token;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId
                ? { ...msg, content: msg.content + token, visible: (msg.visible ?? '') + token }
                : msg
            )
          );
        } else if (event === 'done') {
          // Streaming completed
        } else if (event === 'error') {
          throw new Error(payload.error ?? 'The AI Tutor encountered an error.');
        }
      };

      while (true) {
        const { value, done } = await reader.read();
        buffered += decoder.decode(value, { stream: !done });
        let boundary = buffered.indexOf('\n\n');
        while (boundary >= 0) {
          handleBlock(buffered.slice(0, boundary));
          buffered = buffered.slice(boundary + 2);
          boundary = buffered.indexOf('\n\n');
        }
        if (done) break;
      }
      if (buffered.trim()) handleBlock(buffered);

      if (!receivedAnswer && sequence === replySequenceRef.current) {
        throw new Error('The AI Tutor returned an empty answer. Please try again.');
      }

      // Persist conversation update to local storage & backend
      setMessages((finalMessages) => {
        persistSession(finalMessages);
        return finalMessages;
      });

      // If voice is enabled or user used microphone, automatically speak the answer
      if (voiceEnabledRef.current && fullAssistantContent) {
        playTutorAudio(fullAssistantContent, assistantId);
      }
    } catch (error: any) {
      if (error?.name !== 'AbortError' && sequence === replySequenceRef.current) {
        toast.error(error.message ?? 'Failed to reach AI Tutor.');
        setMessages((prev) => {
          const updated = prev.map((msg) =>
            msg.id === assistantId && !msg.content
              ? {
                  ...msg,
                  content: 'Sorry, something went wrong. Please check your connection and try again.',
                  visible: 'Sorry, something went wrong. Please check your connection and try again.',
                }
              : msg
          );
          persistSession(updated);
          return updated;
        });
      }
    } finally {
      if (sequence === replySequenceRef.current) {
        replyAbortRef.current = null;
        setIsLoading(false);
      }
    }
  };
  sendMessageRef.current = sendMessage;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  // Deepgram Live Audio Transcription Engine (Speech-to-Text)
  const downsampleTo16k = (pcmData: Float32Array, inputRate: number) => {
    const ratio = inputRate / 16000;
    const outputLength = Math.floor(pcmData.length / ratio);
    const output = new Int16Array(outputLength);
    for (let i = 0; i < outputLength; i++) {
      const start = Math.floor(i * ratio);
      const end = Math.min(pcmData.length, Math.floor((i + 1) * ratio));
      let sum = 0;
      for (let j = start; j < end; j++) sum += pcmData[j];
      const sample = Math.max(-1, Math.min(1, sum / Math.max(1, end - start)));
      output[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
    }
    return output;
  };

  const stopVoiceSession = () => {
    if (browserRecognitionRef.current) {
      try {
        browserRecognitionRef.current.stop();
      } catch {}
      browserRecognitionRef.current = null;
    }
    processorRef.current?.disconnect();
    processorRef.current = null;
    mediaStreamRef.current?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;
    try {
      listenConnectionRef.current?.close();
    } catch {}
    listenConnectionRef.current = null;
    void audioContextRef.current?.close().catch(() => {});
    audioContextRef.current = null;
    setIsListening(false);
    setInterimTranscript('');
  };

  const startListening = async () => {
    stopVoicePlayback();

    const SpeechRecognition = typeof window !== 'undefined'
      ? ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)
      : null;

    let deepgramStarted = false;
    let mediaStream: MediaStream | null = null;

    // 1. Attempt Deepgram live streaming if mic access is available
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const tokenHeaders = await getAuthHeaders();
        const tokenResponse = await fetch('/api/ai/tutor/voice-token', { method: 'POST', headers: tokenHeaders });
        if (tokenResponse.ok) {
          const tokenData = await tokenResponse.json();
          if (tokenData?.accessToken) {
            mediaStream = await navigator.mediaDevices.getUserMedia({
              audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
            });
            mediaStreamRef.current = mediaStream;

            const client = new DeepgramClient({ accessToken: tokenData.accessToken });
            const listenConnection = await client.listen.v2.connect({
              model: 'flux-general-en',
              encoding: 'linear16',
              sample_rate: '16000',
              eot_threshold: 0.7,
              connectionTimeoutInSeconds: 12,
              reconnectAttempts: 1,
            });
            listenConnectionRef.current = listenConnection;

            listenConnection.on('message', (message: any) => {
              if (message?.type !== 'TurnInfo') return;
              if (message.event === 'StartOfTurn') {
                setInterimTranscript('Listening…');
                replyAbortRef.current?.abort();
                replyAbortRef.current = null;
                setIsLoading(false);
                stopVoicePlayback();
              } else if (message.event === 'Update') {
                setInterimTranscript(message.transcript ?? '');
              } else if (message.event === 'EndOfTurn') {
                const transcript = String(message.transcript ?? '').trim();
                setInterimTranscript('');
                if (transcript) {
                  sendMessageRef.current(transcript);
                }
              }
            });

            listenConnection.on('error', (error: Error) => {
              console.warn('[ai/tutor] Deepgram live error:', error);
              stopVoiceSession();
            });

            listenConnection.connect();
            await listenConnection.waitForOpen();

            const audioContext = new AudioContext({ latencyHint: 'interactive' });
            await audioContext.resume();
            audioContextRef.current = audioContext;

            const source = audioContext.createMediaStreamSource(mediaStream);
            const processor = audioContext.createScriptProcessor(4096, 1, 1);
            const gain = audioContext.createGain();
            gain.gain.value = 0;

            processor.onaudioprocess = (event) => {
              const connection = listenConnectionRef.current;
              if (!connection || connection.readyState !== 1) return;
              const pcm = downsampleTo16k(event.inputBuffer.getChannelData(0), audioContext.sampleRate);
              if (pcm.length) connection.sendMedia(pcm.buffer);
            };

            source.connect(processor);
            processor.connect(gain);
            gain.connect(audioContext.destination);
            processorRef.current = processor;

            deepgramStarted = true;
            setIsListening(true);
            toast.success('Listening… Speak your clinical question naturally.');
            return;
          }
        }
      } catch (deepgramErr) {
        console.warn('[ai/tutor] Deepgram streaming unavailable, falling back to Web Speech API:', deepgramErr);
      }
    }

    // Clean up acquired media stream tracks if Deepgram didn't connect
    mediaStream?.getTracks().forEach((track) => track.stop());
    mediaStreamRef.current = null;

    // 2. Seamless Fallback: Native Browser SpeechRecognition (Chrome, Edge, Safari, Android)
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        browserRecognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          setIsListening(true);
          setInterimTranscript('Listening… (Browser Voice)');
          toast.success('Listening… Speak your clinical question naturally.');
        };

        recognition.onresult = (event: any) => {
          let interim = '';
          let final = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }
          if (interim) {
            setInterimTranscript(interim);
          }
          if (final.trim()) {
            setInterimTranscript('');
            stopVoiceSession();
            sendMessageRef.current(final.trim());
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('[ai/tutor] Browser speech recognition:', event.error);
          if (event.error !== 'no-speech') {
            toast.error(event.error === 'not-allowed' ? 'Microphone permission denied.' : `Voice recognition: ${event.error}`);
          }
          stopVoiceSession();
        };

        recognition.onend = () => {
          setIsListening(false);
          setInterimTranscript('');
        };

        recognition.start();
        return;
      } catch (recErr: any) {
        console.error('[ai/tutor] Failed to start browser SpeechRecognition:', recErr);
      }
    }

    stopVoiceSession();
    toast.error('Voice input requires a browser with Web Speech support (Chrome, Edge, Safari) or Deepgram configuration.');
  };

  const activeSession = sessions.find((s) => s.id === activeSessionId);

  return (
    <div className="flex flex-col h-[calc(100dvh-5rem)] sm:h-[calc(100dvh-5.25rem)] lg:h-[calc(100dvh-5.5rem)] w-full max-w-7xl 2xl:max-w-[1700px] mx-auto px-2 sm:px-4 md:px-6 py-2 gap-2 relative">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-[var(--color-border)]/60 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg sm:text-xl shrink-0 shadow-sm">
            🩺
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl md:text-2xl font-heading font-bold text-[var(--color-text)] leading-tight">
                AI Clinical Tutor
              </h1>
              {activeSession && (
                <span className="hidden sm:inline-block text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium truncate max-w-[200px]">
                  {activeSession.title}
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--color-text-secondary)] line-clamp-1">
              Personalized clinical mentor • Core textbooks, your notes & analytics
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 font-semibold"
            onClick={handleNewChat}
            title="Start a new clinical conversation"
          >
            + New Chat
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 font-medium"
            onClick={() => setShowHistoryDrawer((prev) => !prev)}
            title="View previous study sessions"
          >
            🕒 Past Chats {sessions.length > 0 && `(${sessions.length})`}
          </Button>

          <select
            value={selectedMaterial}
            onChange={(e) => setSelectedMaterial(e.target.value)}
            className="input text-xs sm:text-sm py-1 px-2 h-8 sm:h-9 max-w-[150px] sm:max-w-[200px]"
            aria-label="Filter source textbook"
          >
            <option value="">📚 All Textbooks</option>
            {materials.length > 0 && (
              <optgroup label="🌐 NurseFiti Knowledge Base">
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    📚 {m.title}
                  </option>
                ))}
              </optgroup>
            )}
            {localMaterials.length > 0 && (
              <optgroup label="📱 Your Device (Local Storage)">
                {localMaterials.map((lm) => (
                  <option key={lm.id} value={lm.id}>
                    📝 {lm.title}
                  </option>
                ))}
              </optgroup>
            )}
          </select>

          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
            onClick={() => setShowUploadPanel((prev) => !prev)}
          >
            {showUploadPanel ? '✕ Close' : '📤 Upload'}
          </Button>

          <Button
            variant={voiceEnabled ? 'primary' : 'ghost'}
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3"
            onClick={() => {
              const next = !voiceEnabled;
              setVoiceEnabled(next);
              voiceEnabledRef.current = next;
              if (!next) {
                stopVoicePlayback();
              } else {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  try { window.speechSynthesis.getVoices(); } catch {}
                }
                toast.success('Auto-voice enabled. The tutor will speak responses aloud.');
              }
            }}
            title={voiceEnabled ? 'Auto-voice is ON' : 'Turn auto-voice ON'}
          >
            {voiceEnabled ? '🔊 Voice on' : '🔇 Voice off'}
          </Button>

          {/* Voice Accent & Model Selector Button */}
          {(() => {
            const curVoice = AI_TUTOR_VOICES.find((v) => v.id === selectedVoice) || AI_TUTOR_VOICES[0];
            return (
              <button
                type="button"
                onClick={() => setShowVoicePicker(true)}
                className="flex items-center gap-1.5 text-xs sm:text-sm h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] hover:border-primary/60 hover:bg-primary/5 transition-all font-medium text-[var(--color-text)] shadow-xs"
                title="Change AI Tutor voice & accent (British, American, clinical personalities)"
              >
                <span>{curVoice.flag}</span>
                <span className="font-semibold text-primary">{curVoice.name}</span>
                <span className="text-[11px] text-[var(--color-text-secondary)] hidden md:inline">({curVoice.accent})</span>
                <span className="text-[10px] opacity-70">▾</span>
              </button>
            );
          })()}

          {/* Review AI Tutor Button */}
          <Button
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3 font-semibold text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
            onClick={() => setShowReviewModal(true)}
            title="Review & recommend features for the AI Tutor (Private to admin)"
          >
            ⭐ Review Tutor
          </Button>

          {isSpeaking && (
            <Button
              variant="danger"
              size="sm"
              className="text-xs sm:text-sm h-8 sm:h-9 px-2.5 animate-pulse"
              onClick={stopVoicePlayback}
              title="Stop audio playback"
            >
              ⏹️ Stop
            </Button>
          )}
        </div>
      </div>

      {/* Collapsible Upload Panel (Option 2: 100% on student device) */}
      {showUploadPanel && (
        <div className="rounded-xl border border-dashed border-primary/40 bg-[var(--color-card)] p-3 sm:p-4 space-y-3 shrink-0 shadow-sm transition-all animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <p className="text-sm font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                <span>📱</span> Upload Study Notes / Textbook (PDF, DOCX, TXT)
              </p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                Processed & stored 100% on your device (IndexedDB). Zero server storage quota consumed.
              </p>
            </div>
          </div>

          <form onSubmit={handleUpload} className="space-y-3">
            <div className="flex flex-wrap gap-2 items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt,.md"
                onChange={(e) => setUploadFile(e.target.files?.[0] ?? null)}
                className="text-sm"
                disabled={isUploading}
              />
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="Title (optional, e.g. Pediatric Notes)"
                className="input text-sm flex-1 min-w-[180px]"
                disabled={isUploading}
              />
              <Button type="submit" variant="primary" size="sm" disabled={!uploadFile || isUploading}>
                {isUploading ? <><Spinner size="sm" color="primary" /> {uploadStatus || 'Processing…'}</> : 'Save to Device'}
              </Button>
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs text-[var(--color-text-secondary)]">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={shareWithLibrary}
                  onChange={(e) => setShareWithLibrary(e.target.checked)}
                  className="rounded border-[var(--color-border)] text-primary focus:ring-primary"
                  disabled={isUploading}
                />
                <span>Share a copy with NurseFiti Library (Allows Admin to review & download)</span>
              </label>
            </div>
          </form>

          {localMaterials.length > 0 && (
            <div className="pt-2 border-t border-[var(--color-border)]/50 space-y-1.5">
              <p className="text-xs font-semibold text-[var(--color-text)]">
                Stored on this device ({localMaterials.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {localMaterials.map((lm) => (
                  <div
                    key={lm.id}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-[var(--color-bg)] border border-[var(--color-border)]"
                  >
                    <span className="font-medium text-[var(--color-text)] truncate max-w-[200px]" title={lm.title}>
                      📝 {lm.title}
                    </span>
                    <span className="text-[10px] text-[var(--color-text-secondary)]">
                      ({lm.chunkCount} sections)
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteLocalMaterial(lm.id, lm.title)}
                      className="text-error hover:text-red-700 ml-1 font-bold text-xs"
                      title="Delete from device storage"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Chat Scroll Container - Maximized to fill all remaining vertical and horizontal space */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto rounded-2xl border border-[var(--color-border)] p-3 sm:p-5 md:p-6 space-y-4 bg-[var(--color-card)] shadow-sm"
      >
        {messages.map((m, i) => (
          <div key={m.id || i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`rounded-2xl px-4 py-3.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'max-w-[90%] sm:max-w-[80%] bg-primary text-white shadow-sm font-medium ml-auto'
                  : 'w-full max-w-full lg:max-w-[94%] bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-text)] shadow-sm'
              }`}
            >
              {m.role === 'assistant' ? (
                <TutorMarkdown content={m.visible ?? m.content} />
              ) : (
                <span className="whitespace-pre-wrap">{m.content}</span>
              )}

              {/* Source badges */}
              {m.role === 'assistant' && m.sources && m.sources.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-[var(--color-border)]/60">
                  <span className="text-[10px] uppercase font-semibold text-[var(--color-text-secondary)] block mb-1.5 tracking-wider">
                    Referenced Sources:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {Array.from(new Map(m.sources.map((s) => [s.title, s])).values()).map((s, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 text-[11px] px-2.5 py-0.5 rounded-md border font-medium ${
                          s.isStudentDoc
                            ? 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/30'
                            : 'bg-primary/10 text-primary border-primary/25'
                        }`}
                      >
                        {s.isStudentDoc ? '📝 Your Upload:' : '📚 Core Textbook:'} {s.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Toolbar on Assistant Messages (Listen button & Quick action chips) */}
              {m.role === 'assistant' && (
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-[var(--color-border)]/40">
                  {/* Listen / Stop audio button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (speakingMessageId === (m.id || String(i))) {
                        stopVoicePlayback();
                      } else {
                        playTutorAudio(m.visible ?? m.content, m.id || String(i));
                      }
                    }}
                    className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all font-medium ${
                      speakingMessageId === (m.id || String(i))
                        ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse'
                        : isSynthesizingVoice && speakingMessageId === (m.id || String(i))
                        ? 'bg-primary/10 text-primary border-primary/30'
                        : 'bg-[var(--color-bg)] hover:bg-primary/10 text-[var(--color-text-secondary)] hover:text-primary border-[var(--color-border)]'
                    }`}
                    title={speakingMessageId === (m.id || String(i)) ? 'Stop voice playback' : 'Listen to explanation'}
                  >
                    {speakingMessageId === (m.id || String(i)) ? (
                      <>
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                        <span>⏹️ Stop Voice</span>
                      </>
                    ) : isSynthesizingVoice && speakingMessageId === (m.id || String(i)) ? (
                      <>
                        <Spinner size="sm" color="primary" />
                        <span>Loading voice…</span>
                      </>
                    ) : (
                      <>
                        <span>🔊 Listen</span>
                      </>
                    )}
                  </button>

                  {/* Interactive Quick Action Chips (Only on recent answers) */}
                  {i > 0 && !isLoading && (
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => sendMessage('Generate a 3-question MCQ quiz on what we just discussed to test my retention.')}
                        className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium flex items-center gap-1"
                      >
                        📝 3-Question Quiz
                      </button>
                      <button
                        type="button"
                        onClick={() => sendMessage('Give me a challenging NCK-style Socratic scenario question on this topic.')}
                        className="text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 transition-colors font-medium flex items-center gap-1"
                      >
                        🤔 Socratic Challenge
                      </button>
                      <button
                        type="button"
                        onClick={() => sendMessage('How does this connect to my past mistake patterns or weak areas?')}
                        className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors font-medium flex items-center gap-1"
                      >
                        📊 Check My Weakspots
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="rounded-2xl px-4 py-3 bg-[var(--color-bg)] border border-[var(--color-border)] flex items-center gap-2 shadow-sm">
              <Spinner size="sm" color="primary" />
              <span className="text-xs text-[var(--color-text-secondary)] font-medium">
                Analyzing official textbooks & generating clinical guidance…
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Suggested Prompts (when starting a conversation) */}
      {messages.length <= 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar shrink-0">
          {SUGGESTED_PROMPTS.map((p) => (
            <button
              key={p}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              className="text-xs whitespace-nowrap px-3 py-1.5 rounded-full border border-primary/25 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all font-medium shrink-0 shadow-xs"
            >
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Live transcription feedback indicator */}
      {interimTranscript && (
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs shrink-0 animate-pulse">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <span>{interimTranscript}</span>
        </div>
      )}

      {/* Bottom Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center shrink-0">
        <Button
          type="button"
          variant={isListening ? 'danger' : 'ghost'}
          onClick={isListening ? stopVoiceSession : startListening}
          className="h-10 sm:h-11 px-3 sm:px-4 shrink-0 font-medium"
          aria-label={isListening ? 'Stop live voice' : 'Start live voice tutoring'}
          title={isListening ? 'Stop voice conversation' : 'Start voice conversation'}
        >
          {isListening ? '🛑 Stop' : '🎙️ Talk'}
        </Button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your tutor or request practice on weak areas…"
          maxLength={1000}
          className="input flex-1 h-10 sm:h-11 text-sm shadow-xs"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={!input.trim() || isLoading}
          className="h-10 sm:h-11 px-4 sm:px-6 shrink-0 font-semibold"
        >
          Send
        </Button>
      </form>

      <p className="text-[10px] sm:text-[11px] text-[var(--color-text-secondary)] text-center shrink-0">
        Grounded in official textbooks, national NCK standards & your practice analytics. Educational use only.
      </p>

      {/* Past Study Sessions Slide-Over Drawer */}
      {showHistoryDrawer && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fadeIn"
          onClick={() => setShowHistoryDrawer(false)}
        >
          <div
            className="w-full max-w-md h-full bg-[var(--color-card)] border-l border-[var(--color-border)] shadow-xl flex flex-col p-4 sm:p-5 gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[var(--color-border)]">
              <div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-[var(--color-text)]">
                  Previous Study Sessions
                </h3>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  Continue where you left off
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryDrawer(false)}
                className="w-8 h-8 rounded-full hover:bg-[var(--color-bg)] flex items-center justify-center text-[var(--color-text-secondary)] text-sm"
              >
                ✕
              </button>
            </div>

            <Button
              variant="primary"
              size="sm"
              className="w-full justify-center text-sm py-2"
              onClick={handleNewChat}
            >
              + Start Fresh Chat
            </Button>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {sessions.length === 0 ? (
                <p className="text-sm text-[var(--color-text-secondary)] text-center py-8">
                  No previous sessions yet.
                </p>
              ) : (
                sessions.map((s) => {
                  const isActive = s.id === activeSessionId;
                  const dateStr = new Date(s.updatedAt).toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  });

                  return (
                    <div
                      key={s.id}
                      onClick={() => handleSwitchSession(s)}
                      className={`group p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start justify-between gap-2 ${
                        isActive
                          ? 'border-primary bg-primary/10 shadow-xs'
                          : 'border-[var(--color-border)] bg-[var(--color-bg)]/60 hover:border-primary/50 hover:bg-[var(--color-bg)]'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm">🩺</span>
                          <h4 className="text-sm font-semibold text-[var(--color-text)] truncate">
                            {s.title}
                          </h4>
                        </div>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-[var(--color-text-secondary)]">
                          <span>{dateStr}</span>
                          <span>•</span>
                          <span>{s.messages.filter((m) => m.content).length} messages</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleDeleteSession(e, s.id)}
                        className="opacity-60 group-hover:opacity-100 hover:text-rose-500 p-1 text-xs transition-opacity"
                        title="Delete session"
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Exit Feedback Prompt Modal */}
      <AiTutorExitFeedbackModal
        isOpen={showExitModal}
        onProceedExit={handleProceedExit}
        onStay={handleStay}
        sessionMessageCount={messages.filter((m) => m.content).length}
        selectedVoice={selectedVoice}
      />

      {/* Manual In-App Review & Recommendations Modal */}
      <AiTutorExitFeedbackModal
        isOpen={showReviewModal}
        onProceedExit={() => setShowReviewModal(false)}
        onStay={() => setShowReviewModal(false)}
        sessionMessageCount={messages.filter((m) => m.content).length}
        selectedVoice={selectedVoice}
        isReviewOnly={true}
      />

      {/* Voice & Accent Selector Modal */}
      {showVoicePicker && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-neutral-950/60 backdrop-blur-xs"
            onClick={() => setShowVoicePicker(false)}
          />

          <div className="relative w-full max-w-xl bg-[var(--color-card)] border border-[var(--color-border)] rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--color-border)] bg-gradient-to-r from-primary/10 via-primary/5 to-transparent flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🎙️</span>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[var(--color-text)]">
                    Choose AI Tutor Voice & Accent
                  </h3>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    Select British or American clinical accents to match your preferred study style
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowVoicePicker(false)}
                className="w-8 h-8 rounded-full bg-neutral-200/50 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center justify-center text-sm transition-colors text-[var(--color-text)]"
              >
                ✕
              </button>
            </div>

            {/* Voices List */}
            <div className="p-3 sm:p-5 space-y-4 overflow-y-auto">
              {/* British Accents */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">🇬🇧</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    British Accents (Crisp & Scholarly)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AI_TUTOR_VOICES.filter((v) => v.accent === 'British').map((v) => {
                    const isSelected = selectedVoice === v.id;
                    const isPreviewing = previewingVoiceId === v.id && isSpeaking;
                    return (
                      <div
                        key={v.id}
                        onClick={() => handleSelectVoice(v.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 text-left relative ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-xs'
                            : 'border-[var(--color-border)] hover:border-primary/50 hover:bg-[var(--color-bg-secondary)]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-sm text-[var(--color-text)] flex items-center gap-1.5">
                              <span>{v.flag}</span> {v.name}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-border)]/60 text-[var(--color-text-secondary)]">
                              {v.gender}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                            {v.persona}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--color-border)]/40 mt-1">
                          <button
                            type="button"
                            onClick={(e) => previewVoiceSample(e, v)}
                            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20"
                            title="Hear voice sample"
                          >
                            <span>{isPreviewing ? '⏹️ Stop' : '▶ Sample'}</span>
                          </button>

                          {isSelected && (
                            <span className="text-xs font-bold text-primary flex items-center gap-1">
                              ✓ Active
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* American Accents */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">🇺🇸</span>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--color-text-secondary)]">
                    American Accents (Warm, Direct & Clinical)
                  </h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {AI_TUTOR_VOICES.filter((v) => v.accent === 'American').map((v) => {
                    const isSelected = selectedVoice === v.id;
                    const isPreviewing = previewingVoiceId === v.id && isSpeaking;
                    return (
                      <div
                        key={v.id}
                        onClick={() => handleSelectVoice(v.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-2 text-left relative ${
                          isSelected
                            ? 'border-primary ring-2 ring-primary/20 bg-primary/5 shadow-xs'
                            : 'border-[var(--color-border)] hover:border-primary/50 hover:bg-[var(--color-bg-secondary)]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-bold text-sm text-[var(--color-text)] flex items-center gap-1.5">
                              <span>{v.flag}</span> {v.name}
                            </span>
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[var(--color-border)]/60 text-[var(--color-text-secondary)]">
                              {v.gender}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--color-text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                            {v.persona}
                          </p>
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--color-border)]/40 mt-1">
                          <button
                            type="button"
                            onClick={(e) => previewVoiceSample(e, v)}
                            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 hover:bg-primary/20"
                            title="Hear voice sample"
                          >
                            <span>{isPreviewing ? '⏹️ Stop' : '▶ Sample'}</span>
                          </button>

                          {isSelected && (
                            <span className="text-xs font-bold text-primary flex items-center gap-1">
                              ✓ Active
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-3 sm:p-4 border-t border-[var(--color-border)] bg-[var(--color-card)] flex justify-end shrink-0">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setShowVoicePicker(false)}
                className="text-xs sm:text-sm px-4"
              >
                Done
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
