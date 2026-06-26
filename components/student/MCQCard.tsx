"use client";

import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { AskAI } from './AskAI';
import toast from 'react-hot-toast';

interface MCQCardProps {
  question: {
    id: string;
    stem: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string;
    rationale: string;
    rationale_a?: string;
    rationale_b?: string;
    rationale_c?: string;
    rationale_d?: string;
    unit: string;
    topic: string;
    difficulty?: string;
  };
  onAnswer: (questionId: string, selectedOption: string, isCorrect: boolean, timeTaken: number) => void;
  showFeedback?: boolean;
}

export function MCQCard({ question, onAnswer, showFeedback = true }: MCQCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [startTime] = useState(Date.now());
  const [isFlagModalOpen, setIsFlagModalOpen] = useState(false);
  const [flagReason, setFlagReason] = useState('Wrong Answer');
  const [flagDetails, setFlagDetails] = useState('');
  const [isSubmittingFlag, setIsSubmittingFlag] = useState(false);

  const submitFlag = async () => {
    setIsSubmittingFlag(true);
    try {
      const res = await fetch('/api/questions/flag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: question.id,
          reason: flagReason,
          details: flagDetails,
        }),
      });
      if (!res.ok) throw new Error('Failed to flag');
      toast.success('Question flagged for review. Thank you!');
      setIsFlagModalOpen(false);
      setFlagDetails('');
    } catch (error) {
      toast.error('Could not flag question. Please try again.');
    } finally {
      setIsSubmittingFlag(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    if (hasAnswered) return;
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (!selectedOption || hasAnswered) return;

    const isCorrect = selectedOption === question.correct_option;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    setHasAnswered(true);
    onAnswer(question.id, selectedOption, isCorrect, timeTaken);
  };

  const getOptionClass = (option: string) => {
    if (!hasAnswered) {
      return selectedOption === option
        ? 'border-primary bg-primary/5 dark:bg-primary/10'
        : 'border-neutral-border hover:border-primary/50';
    }

    // After answering
    if (option === question.correct_option) {
      return 'border-success bg-success/10';
    }
    if (option === selectedOption && option !== question.correct_option) {
      return 'border-error bg-error/10';
    }
    return 'border-neutral-border opacity-50';
  };

  const getOptionBadgeClass = (option: string) => {
    if (!hasAnswered) {
      return selectedOption === option
        ? 'bg-primary text-white'
        : 'bg-neutral-border text-neutral-mid';
    }

    if (option === question.correct_option) {
      return 'bg-success text-white';
    }
    if (option === selectedOption && option !== question.correct_option) {
      return 'bg-error text-white';
    }
    return 'bg-neutral-border text-neutral-mid';
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'error';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      {/* Question Header */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">
          {question.unit}
        </Badge>
        <Badge variant="primary">
          {question.topic}
        </Badge>
        <Badge variant={getDifficultyColor()}>
          {question.difficulty}
        </Badge>
      </div>

      {/* Question Stem */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-neutral-dark dark:text-neutral-light leading-relaxed">
          {question.stem}
        </h3>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {['A', 'B', 'C', 'D'].map((option) => {
          const optionText = question[`option_${option.toLowerCase()}` as keyof typeof question] as string;

          return (
            <button
              key={option}
              onClick={() => handleOptionSelect(option)}
              disabled={hasAnswered}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${getOptionClass(option)} ${
                hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold mr-3 flex-shrink-0 ${getOptionBadgeClass(
                    option
                  )}`}
                >
                  {option}
                </div>
                <p className="text-neutral-dark dark:text-neutral-light pt-1">
                  {optionText}
                </p>
                {hasAnswered && option === question.correct_option && (
                  <span className="ml-auto text-success text-xl">✓</span>
                )}
                {hasAnswered && option === selectedOption && option !== question.correct_option && (
                  <span className="ml-auto text-error text-xl">✗</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Submit Button */}
      {!hasAnswered && (
        <Button
          variant="primary"
          size="lg"
          onClick={handleSubmit}
          disabled={!selectedOption}
          className="w-full"
        >
          Submit Answer
        </Button>
      )}

      {/* Feedback */}
      {hasAnswered && showFeedback && (
        <div className="mt-6 space-y-4">
          {/* Result Badge */}
          <div className="flex items-center justify-between">
            {selectedOption === question.correct_option ? (
              <Badge variant="success" size="lg">
                ✓ Correct! +8 XP
              </Badge>
            ) : (
              <Badge variant="error" size="lg">
                ✗ Incorrect
              </Badge>
            )}
            
            <button
              onClick={() => setIsFlagModalOpen(true)}
              className="text-sm text-neutral-mid hover:text-error transition-colors flex items-center gap-1"
              title="Report an issue with this question"
            >
              <span>🚩</span> Flag Question
            </button>
          </div>

          {/* General Rationale */}
          <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
            <h4 className="font-semibold text-primary mb-2">Explanation:</h4>
            <p className="text-sm text-neutral-dark dark:text-neutral-light">
              {question.rationale}
            </p>
          </div>

          {/* Option-specific Rationales */}
          {(question.rationale_a || question.rationale_b || question.rationale_c || question.rationale_d) && (
            <div className="space-y-2">
              <h4 className="font-semibold text-neutral-dark dark:text-neutral-light text-sm">
                Why each option:
              </h4>
              {question.rationale_a && (
                <div className="text-sm">
                  <span className="font-semibold">A:</span> {question.rationale_a}
                </div>
              )}
              {question.rationale_b && (
                <div className="text-sm">
                  <span className="font-semibold">B:</span> {question.rationale_b}
                </div>
              )}
              {question.rationale_c && (
                <div className="text-sm">
                  <span className="font-semibold">C:</span> {question.rationale_c}
                </div>
              )}
              {question.rationale_d && (
                <div className="text-sm">
                  <span className="font-semibold">D:</span> {question.rationale_d}
                </div>
              )}
            </div>
          )}

          {/* AI deeper explanation */}
          <AskAI question={question} />
        </div>
      )}

      {/* Flag Modal */}
      {isFlagModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-[var(--color-card)] rounded-xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setIsFlagModalOpen(false)}
              className="absolute top-4 right-4 text-neutral-mid hover:text-neutral-dark dark:hover:text-neutral-light"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span>🚩</span> Flag Question
            </h3>
            <p className="text-sm text-neutral-dark dark:text-neutral-light mb-4">
              Found an issue with this question? Let us know so our clinical review team can fix it.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1">Reason</label>
                <select
                  className="w-full p-2 border rounded-lg bg-transparent text-sm"
                  value={flagReason}
                  onChange={(e) => setFlagReason(e.target.value)}
                >
                  <option value="Wrong Answer">Incorrect Answer Marked</option>
                  <option value="Confusing Rationale">Confusing/Contradictory Rationale</option>
                  <option value="Typo">Typo / Formatting Issue</option>
                  <option value="Outdated Information">Outdated Medical Guideline</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold mb-1">Details (Optional)</label>
                <textarea
                  className="w-full p-2 border rounded-lg bg-transparent text-sm h-24 resize-none"
                  placeholder="Tell us what is wrong..."
                  value={flagDetails}
                  onChange={(e) => setFlagDetails(e.target.value)}
                />
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <Button variant="outline" onClick={() => setIsFlagModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={submitFlag} disabled={isSubmittingFlag}>
                  {isSubmittingFlag ? 'Submitting...' : 'Submit Report'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
