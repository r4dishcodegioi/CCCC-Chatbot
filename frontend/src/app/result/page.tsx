'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import ResultCard from '@/components/ResultCard';

export default function ResultPage() {
  const router = useRouter();
  const { result, participantName, reset } = useQuizStore();

  useEffect(() => {
    if (!result) {
      router.push('/');
    }
  }, [result, router]);

  if (!result) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <ResultCard result={result} participantName={participantName || undefined} />

      {/* Action buttons */}
      <div className="mt-8 flex flex-col gap-3 w-full max-w-md animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <button
          onClick={() => {
            reset();
            router.push('/');
          }}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sage to-deep-green text-white font-medium text-sm hover:shadow-lg hover:shadow-sage/20 transition-all duration-300 active:scale-[0.98]"
        >
          Làm lại bài test 🌿
        </button>
      </div>
    </div>
  );
}
