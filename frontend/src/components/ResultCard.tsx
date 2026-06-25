'use client';
import { useState } from 'react';

import { QuizResult } from '@/lib/types';
import ScentFormula from './ScentFormula';
import Image from 'next/image';
import logo from '@/assets/logochudoc.png';

interface ResultCardProps {
  result: QuizResult;
  participantName?: string;
}

export default function ResultCard({ result, participantName }: ResultCardProps) {
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  return (
    <div className="result-card p-8 md:p-10 max-w-md mx-auto animate-fade-in">
      {/* Scent Identity */}
      <div className="text-center mb-8">
        <p className="text-sage text-sm mb-2">🌿 Dấu ấn mùi hương của bạn 🌿</p>
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

      {/* Formula */}
      <div className="mb-8 px-4">
        <p className="text-sm tracking-[0.15em] text-deep-green mb-2 text-center font-display uppercase font-bold">
          Công thức của bạn:
        </p>
        <ScentFormula formula={result.formula} />
      </div>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-sage to-transparent mx-auto mb-8" />

      {/* Scent Description */}
      <div className="mb-8">
        <p className="text-sm tracking-[0.15em] text-deep-green mb-2 text-center font-display uppercase font-bold">
          🌸 Mùi hương của bạn: 🌸
        </p>
        <p className="text-sm leading-relaxed text-center text-gray-600 italic font-body">
          {result.scentDescription}
        </p>
      </div>

      <div className="w-24 h-px bg-gradient-to-r from-transparent via-sage to-transparent mx-auto mb-8" />

      {/* Closing messages - Letter Concept */}
      {!isLetterOpen ? (
        <div 
          onClick={() => setIsLetterOpen(true)}
          className="relative bg-[#FEFCF9] p-6 py-10 rounded shadow-md border border-[#E8D5C4] mt-8 mb-2 cursor-pointer animate-ring-ring hover:scale-[1.02] transition-transform"
        >
          {/* Large Wax seal in center */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-gradient-to-br from-[#735B29] to-[#261900] rounded-full shadow-lg flex items-center justify-center border-2 border-[#FEFCF9] z-10 overflow-hidden">
            <Image src={logo} alt="logo" width={100} height={100} className="object-contain" />
          </div>
          <div className="text-center opacity-80">
            <p className="text-xs text-[#735B29] mt-15 italic animate-pulse">Nhấn để mở</p>
          </div>
        </div>
      ) : (
        <div className="relative bg-[#FEFCF9] p-6 rounded shadow-md border border-[#E8D5C4] mt-8 mb-2 animate-fade-in">
          {/* Wax seal broken/open at top */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-gradient-to-br from-[#735B29] to-[#261900] rounded-full shadow-md flex items-center justify-center border-2 border-[#FEFCF9] z-10 overflow-hidden">
            <Image src={logo} alt="logo" width={24} height={24} className="object-contain" />
          </div>

          <div className="space-y-3 text-center mt-2 relative z-0">
            <p className="text-xs leading-relaxed text-[#735B29] font-body italic">
              🍃 Đôi khi, trà không chỉ là một hương vị mà còn có thể phản chiếu chính con người của bạn, từ cảm xúc, tính cách đến dấu ấn bạn để lại cho những người xung quanh.
            </p>
            <div className="flex justify-center py-2">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#C4A35A] to-transparent"></div>
            </div>
            <p className="text-xs leading-relaxed text-[#735B29] font-body italic">
              💌 Cảm ơn bạn đã tham gia Chi Chi Chành Chành 2026: Hương Trà Sắc Lụa. Chúc bạn có thật nhiều trải nghiệm thú vị và tận hưởng hành trình khám phá &ldquo;mùi hương dành riêng cho mình&rdquo; nhé!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
