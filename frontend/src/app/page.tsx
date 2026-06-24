'use client';

import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/logochudoc.png';
import csglogo from '@/assets/CSG-LOGO-YELLOW@1x1.png';
import fptlogo from '@/assets/Logo cam eng-01.png';
import nttlogo from '@/assets/nttkc.png';

export default function HomePage() {
  const router = useRouter();
  const reset = useQuizStore((s) => s.reset);

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center max-w-md animate-fade-in">
        {/* Decorative top */}
        <div className="mb-6 flex justify-center">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="object-contain"
            priority
          />
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold uppercase tracking-[0.2em] mb-8 animate-gold-title">
          Hương Trà Sắc Lụa
        </h2>

        {/* Main title */}
        <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-semibold text-cream leading-tight mb-4">
          Giải mã bản sắc hương thơm cùng AI
        </h1>
        <p className="font-display text-lg md:text-xl text-blush italic mb-8">
          Kiến tạo dấu hương mang đậm dấu ấn riêng cùng Hương Trà Sắc Lụa
        </p>

        {/* Divider */}
        <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-8" />

        {/* Description */}
        <p className="text-sm text-cream/80 leading-relaxed mb-10 font-body">
          Khám phá dấu ấn mùi hương riêng của bạn qua 10 câu hỏi tính cách.
          AI sẽ phân tích và tạo công thức tinh dầu dành riêng cho bạn.
        </p>

        {/* CTA Button */}
        <button
          onClick={() => router.push('/register')}
          className="group relative px-10 py-4 rounded-full bg-gradient-to-r from-sage to-deep-green text-white font-medium text-sm hover:shadow-xl hover:shadow-sage/30 transition-all duration-500 active:scale-95"
        >
          <span className="relative z-10">Bắt đầu trải nghiệm →</span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-deep-green to-sage opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </button>

        {/* Bottom decoration */}
        <div className="mt-12 flex justify-center">
          <Image
            src={csglogo}
            alt="csglogo"
            width={96}
            height={96}
            className="object-contain"
            priority
          />
          <Image
            src={nttlogo}
            alt="nttlogo"
            width={150}
            height={150}
            className="object-contain"
            style={{ width: 'auto', height: 'auto' }}
            priority
          />
          <Image
            src={fptlogo}
            alt="fptlogo"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
