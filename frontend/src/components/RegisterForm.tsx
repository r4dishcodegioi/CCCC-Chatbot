'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerParticipant } from '@/lib/api';
import { useQuizStore } from '@/lib/store';

const schema = z.object({
  fullName: z.string().min(1, 'Vui lòng nhập họ và tên'),
  studentId: z
    .string()
    .min(1, 'Vui lòng nhập mã số')
    .regex(
      /^(?:(?:SE|SS|SA|QS|QE|QA|HS|HA|HE|CS|CA|CE|DS|DA|DE)\d{6}|(?!0{8})\d{8})$/i,
      'Mã số không hợp lệ (VD: SE123456 hoặc 8 chữ số)'
    )
    .transform((val) => val.toUpperCase()),
  email: z.string().min(1, 'Vui lòng nhập email').email('Email không hợp lệ'),
});

type FormData = z.infer<typeof schema>;

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const setParticipant = useQuizStore((s) => s.setParticipant);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError('');
    try {
      const participant = await registerParticipant(data);
      setParticipant(participant.id, participant.fullName);
      router.push('/quiz');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-tea-brown mb-2">
          Họ và tên
        </label>
        <input
          {...register('fullName')}
          placeholder="Nguyễn Văn A"
          className="w-full px-4 py-3 rounded-2xl text-tea-brown bg-white/60 border border-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all text-sm placeholder:text-warm-gray/50"
        />
        {errors.fullName && (
          <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-tea-brown mb-2">
          Mã số sinh viên / Mã số nhân viên
        </label>
        <input
          {...register('studentId')}
          placeholder="SE123456"
          className="w-full px-4 py-3 rounded-2xl text-tea-brown bg-white/60 border border-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all text-sm placeholder:text-warm-gray/50"
        />
        {errors.studentId && (
          <p className="text-red-400 text-xs mt-1">{errors.studentId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-tea-brown mb-2">
          Email
        </label>
        <input
          {...register('email')}
          type="email"
          placeholder="email@example.com"
          className="w-full px-4 py-3 rounded-2xl text-tea-brown bg-white/60 border border-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sage/50 focus:border-sage transition-all text-sm placeholder:text-warm-gray/50"
        />
        {errors.email && (
          <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
        )}
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-100">
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sage to-deep-green text-white font-medium text-sm hover:shadow-lg hover:shadow-sage/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Đang đăng ký...
          </span>
        ) : (
          'Bắt đầu khám phá →'
        )}
      </button>
    </form>
  );
}
