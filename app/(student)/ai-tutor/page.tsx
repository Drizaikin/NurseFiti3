'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { DeepgramClient } from '@deepgram/sdk';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';
import { TutorMarkdown } from '@/components/ai/TutorMarkdown';
import { AiTutorExitFeedbackModal } from '@/components/ai/AiTutorExitFeedbackModal';
import toast from 'react-hot-toast';

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
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [showUploadPanel, setShowUploadPanel] = useState(false);

  // Audio / Voice state
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [isSynthesizingVoice, setIsSynthesizingVoice] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Refs
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const listenConnectionRef = useRef<any>(null);
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

  // 1. Initial Load: Instant 0ms Local Storage Cache + Background Remote Sync
  useEffect(() => {
    loadMaterials();

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

  // Browser Speech Synthesis fallback: Guaranteed offline/client voice support
  const playBrowserSpeech = (text: string, messageId?: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSynthesizingVoice(false);
      setSpeakingMessageId(null);
      setIsSpeaking(false);
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const naturalVoice = voices.find(
        (v) =>
          v.lang.startsWith('en') &&
          (v.name.includes('Natural') ||
            v.name.includes('Google') ||
            v.name.includes('Samantha') ||
            v.name.includes('Jenny') ||
            v.name.includes('Ava') ||
            v.name.includes('Karen'))
      ) || voices.find((v) => v.lang.startsWith('en'));

      if (naturalVoice) utterance.voice = naturalVoice;

      utterance.onstart = () => {
        setIsSpeaking(true);
        setIsSynthesizingVoice(false);
        if (messageId) setSpeakingMessageId(messageId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        setIsSynthesizingVoice(false);
      };

      utterance.onerror = (e) => {
        console.warn('[ai/tutor] Browser speech error:', e);
        setIsSpeaking(false);
        setSpeakingMessageId(null);
        setIsSynthesizingVoice(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('[ai/tutor] Web speech synthesis failed:', e);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
      setIsSynthesizingVoice(false);
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

    setIsSynthesizingVoice(true);
    if (messageId) setSpeakingMessageId(messageId);

    try {
      const res = await fetch('/api/ai/tutor/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: speechSegment }),
      });

      if (!res.ok) {
        // Fall back seamlessly to browser speech synthesis
        console.info('[ai/tutor] Neural voice API returned', res.status, '— using browser speech synthesis');
        playBrowserSpeech(speechSegment, messageId);
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
        playBrowserSpeech(speechSegment, messageId);
      };

      try {
        await audio.play();
      } catch (playErr: any) {
        // Browser autoplay policy blocked unprompted play — fallback to speech synthesis
        console.info('[ai/tutor] Audio play interrupted by browser policy, using speech synthesis:', playErr?.message);
        playBrowserSpeech(speechSegment, messageId);
      }
    } catch (err: any) {
      console.warn('[ai/tutor] Neural audio fetch error, using browser speech synthesis:', err?.message || err);
      playBrowserSpeech(speechSegment, messageId);
    }
  };

  // Upload student study notes
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile) {
      toast.error('Choose a textbook file first.');
      return;
    }
    setIsUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', uploadFile);
      if (uploadTitle.trim()) fd.append('title', uploadTitle.trim());
      const res = await fetch('/api/ai/tutor/materials', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Upload failed');
      toast.success(`Added ${data.chunk_count} chunks from "${data.title}"`);
      setUploadFile(null);
      setUploadTitle('');
      if (fileInputRef.current) fileInputRef.current.value = '';
      await loadMaterials();
      setShowUploadPanel(false);
    } catch (err: any) {
      toast.error(err.message ?? 'Upload failed');
    } finally {
      setIsUploading(false);
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

    try {
      const response = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          message: trimmed,
          history,
          materialId: selectedMaterial || null,
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
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error('Microphone access is not supported in this browser.');
      return;
    }

    stopVoicePlayback();
    let mediaStream: MediaStream | null = null;
    try {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      mediaStreamRef.current = mediaStream;

      const tokenResponse = await fetch('/api/ai/tutor/voice-token', { method: 'POST' });
      const tokenData = await tokenResponse.json();
      if (!tokenResponse.ok) throw new Error(tokenData.error ?? 'Could not start live voice.');

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
        console.error('[ai/tutor] Deepgram transcription error:', error);
        toast.error('Live transcription disconnected.');
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

      setIsListening(true);
      toast.success('Listening… Speak your clinical question naturally.');
    } catch (error: any) {
      mediaStream?.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
      stopVoiceSession();
      console.error('[ai/tutor] Voice session error:', error);
      toast.error(error.message ?? 'Could not start microphone. Check browser permissions.');
    }
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
            {materials.map((m) => (
              <option key={m.id} value={m.id}>
                {m.scope === 'personal' ? '📝 ' : '📚 '}
                {m.title}
              </option>
            ))}
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

      {/* Collapsible Upload Panel */}
      {showUploadPanel && (
        <div className="rounded-xl border border-dashed border-primary/40 bg-[var(--color-card)] p-3 sm:p-4 space-y-3 shrink-0 shadow-sm transition-all animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm font-semibold text-[var(--color-text)]">
              Upload Your Study Notes or Textbook (PDF, DOCX, TXT)
            </p>
            <p className="text-xs text-[var(--color-text-secondary)]">
              Private to your account — analyzed in synergy with core textbooks.
            </p>
          </div>
          <form onSubmit={handleUpload} className="flex flex-wrap gap-2 items-center">
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
              {isUploading ? 'Uploading & Indexing…' : 'Upload & Ingest'}
            </Button>
          </form>
          {materials.some((m) => m.scope === 'personal') && (
            <div className="text-xs text-[var(--color-text-secondary)] pt-1 border-t border-[var(--color-border)]/50">
              Your personal materials:{' '}
              <span className="font-medium text-[var(--color-text)]">
                {materials
                  .filter((m) => m.scope === 'personal')
                  .map((m) => m.title)
                  .join(', ')}
              </span>
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
      />
    </div>
  );
}
