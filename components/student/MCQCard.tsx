"use client";

import { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

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
    difficulty: string;
  };
  onAnswer: (questionId: string, selectedOption: string, isCorrect: boolean, timeTaken: number) => void;
  showFeedback?: boolean;
}

export function MCQCard({ question, onAnswer, showFeedback = true }: MCQCardProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [startTime] = useState(Date.now());

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
          <div className="flex items-center justify-center">
            {selectedOption === question.correct_option ? (
              <Badge variant="success" size="lg">
                ✓ Correct! +5 XP
              </Badge>
            ) : (
              <Badge variant="error" size="lg">
                ✗ Incorrect
              </Badge>
            )}
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
        </div>
      )}
    </Card>
  );
}
