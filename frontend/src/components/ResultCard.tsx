'use client';

import { QuizResult } from '@/lib/types';
import ScentFormula from './ScentFormula';

interface ResultCardProps {
  result: QuizResult;
  participantName?: string;
}

export default function ResultCard({ result, participantName }: ResultCardProps) {
  return (
    <div className="result-card p-8 md:p-10 max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs tracking-[0.3em] uppercase text-warm-gray mb-3 font-body">
          Chi Chi Chành Chành 2026
        </p>
        <p className="text-xs tracking-[0.2em] uppercase text-gold mb-6 font-body">
          Lụa và Trà
        </p>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6" />
      </div>

      {/* Scent Identity */}
      <div className="text-center mb-8">
        <p className="text-sage text-sm mb-2">🌿 Scent Identity</p>
        <h2 className="font-display text-3xl md:text-4xl font-semibold text-deep-green mb-1">
          {result.scentIdentity}
        </h2>
        {participantName && (
          <p className="text-sm text-warm-gray mt-2">dành cho {participantName}</p>
        )}
      </div>

      {/* Personality */}
      <div className="mb-8">
        <p className="text-sm leading-relaxed text-gray-600 text-center italic font-body">
          {result.personalityDescription}
        </p>
      </div>

      <div className="w-12 h-px bg-gradient-to-r from-transparent via-sage to-transparent mx-auto mb-8" />

      {/* Formula */}
      <div className="mb-8">
        <p className="text-sm text-tea-brown mb-4 font-medium">
          ✨ Công thức dành cho bạn:
        </p>
        <ScentFormula formula={result.formula} />
      </div>

      <div className="w-12 h-px bg-gradient-to-r from-transparent via-sage to-transparent mx-auto mb-8" />

      {/* Scent Description */}
      <div className="mb-8">
        <p className="text-sm text-tea-brown mb-3 font-medium">
          🌸 Mùi hương của bạn:
        </p>
        <p className="text-sm leading-relaxed text-gray-600 italic font-body">
          {result.scentDescription}
        </p>
      </div>

      <div className="w-12 h-px bg-gradient-to-r from-transparent via-sage to-transparent mx-auto mb-8" />

      {/* Closing messages */}
      <div className="space-y-4 text-center">
        <p className="text-xs leading-relaxed text-warm-gray font-body">
          🍃 Đôi khi, trà không chỉ là một hương vị mà còn có thể phản chiếu chính con người của bạn, từ cảm xúc, tính cách đến dấu ấn bạn để lại cho những người xung quanh.
        </p>
        <p className="text-xs leading-relaxed text-warm-gray font-body">
          💌 Cảm ơn bạn đã tham gia Chi Chi Chành Chành 2026: Lụa và Trà. Chúc bạn có thật nhiều trải nghiệm thú vị và tận hưởng hành trình khám phá &ldquo;mùi hương dành riêng cho mình&rdquo; nhé!
        </p>
      </div>

      {/* Decorative footer */}
      <div className="mt-8 text-center">
        <div className="flex justify-center gap-2">
          <span className="text-sage/40">🍃</span>
          <span className="text-gold/40">✨</span>
          <span className="text-sage/40">🌸</span>
        </div>
      </div>
    </div>
  );
}
