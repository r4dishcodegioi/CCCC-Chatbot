'use client';

import { Question } from '@/lib/types';
import OptionButton from './OptionButton';

interface QuestionCardProps {
  question: Question;
  onAnswer: (option: string) => void;
  selectedOption?: string;
  disabled?: boolean;
}

export default function QuestionCard({ question, onAnswer, selectedOption, disabled }: QuestionCardProps) {
  return (
    <div className="animate-fade-in">
      <div className="space-y-3 mt-4">
        {question.options.map((option) => (
          <OptionButton
            key={option.label}
            label={option.label}
            text={option.text}
            onClick={() => onAnswer(option.label)}
            selected={selectedOption === option.label}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}
