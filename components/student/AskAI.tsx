"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

interface AskAIProps {
  question: {
    stem: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    rationale: string;
    unit: string;
    topic: string;
  };
}

const SUGGESTED_QUESTIONS = [
  'Why is this the correct answer?',
  'Explain the pathophysiology behind this',
  'What would happen if the wrong option was chosen?',
  'How does this relate to clinical practice?',
];

export function AskAI({ question }: AskAIProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Thinking…');
  const [error, setError] = useState('');
  const [hasAsked, setHasAsked] = useState(false);

  const askGemini = async (q: string) => {
    if (!q.trim() || isLoading) return;

    setIsLoading(true);
    setLoadingText('Thinking…');
    setError('');
    setAnswer('');
    setHasAsked(true);

    // Change the loading text if it takes longer than 2.5s using psychological triggers
    const timeoutId = setTimeout(() => {
      setLoadingText('Synthesizing optimal clinical insights... Take a slow, grounding breath. Your brain is building the neural pathways that save lives.');
    }, 2500);

    try {
      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, userQuestion: q }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.');
        return;
      }

      setAnswer(data.answer);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    askGemini(userQuestion);
  };

  const handleSuggestion = (suggestion: string) => {
    setUserQuestion(suggestion);
    askGemini(suggestion);
  };

  const handleReset = () => {
    setUserQuestion('');
    setAnswer('');
    setError('');
    setHasAsked(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="
          flex items-center gap-2 px-4 py-2.5 rounded-xl w-full
          border border-dashed border-primary/40
          text-primary text-sm font-semibold
          hover:bg-primary/5 hover:border-primary/60
          transition-all duration-200
        "
      >
        <span className="text-base">✨</span>
        Ask AI for a deeper explanation
      </button>
    );
  }

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        borderColor: 'rgba(8,81,79,0.25)',
        background: 'var(--color-card)',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: 'rgba(8,81,79,0.06)', borderBottom: '1px solid rgba(8,81,79,0.12)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-base">✨</span>
          <span className="text-sm font-bold text-primary">NurseFiti AI</span>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors text-lg leading-none"
          aria-label="Close AI panel"
        >
          ×
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Suggested questions — shown before first ask */}
        {!hasAsked && (
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider">
              Quick questions
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSuggestion(s)}
                  className="
                    text-xs px-3 py-1.5 rounded-full border
                    border-primary/25 text-primary
                    hover:bg-primary/8 hover:border-primary/50
                    transition-all duration-150
                  "
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AI Answer */}
        {isLoading && (
          <div className="flex items-center gap-3 py-3">
            <Spinner size="sm" color="primary" />
            <span className="text-sm text-[var(--color-text-secondary)]">{loadingText}</span>
          </div>
        )}

        {answer && !isLoading && (
          <div
            className="rounded-lg p-4"
            style={{ background: 'rgba(8,81,79,0.05)', border: '1px solid rgba(8,81,79,0.12)' }}
          >
            <p className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">AI Explanation</p>
            <p className="text-sm text-[var(--color-text)] leading-relaxed whitespace-pre-wrap">
              {answer}
            </p>
            <button
              onClick={handleReset}
              className="mt-3 text-xs text-primary hover:underline font-semibold"
            >
              Ask another question →
            </button>
          </div>
        )}

        {error && !isLoading && (
          <div className="rounded-lg p-3 bg-error/8 border border-error/20">
            <p className="text-sm text-error">{error}</p>
            <button
              onClick={handleReset}
              className="mt-2 text-xs text-error hover:underline font-semibold"
            >
              Try again
            </button>
          </div>
        )}

        {/* Input form */}
        {(!hasAsked || (!isLoading && !answer && !error)) && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask anything about this question…"
              maxLength={500}
              className="input flex-1 text-sm"
              autoFocus
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!userQuestion.trim() || isLoading}
            >
              Ask
            </Button>
          </form>
        )}

        {/* Follow-up input after answer */}
        {hasAsked && answer && !isLoading && (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              type="text"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Ask a follow-up question…"
              maxLength={500}
              className="input flex-1 text-sm"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!userQuestion.trim() || isLoading}
            >
              Ask
            </Button>
          </form>
        )}

        <p className="text-[10px] text-[var(--color-text-secondary)] text-center">
          AI can make mistakes — always verify with your textbooks and tutors.
        </p>
      </div>
    </div>
  );
}
