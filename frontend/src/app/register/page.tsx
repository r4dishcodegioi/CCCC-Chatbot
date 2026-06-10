'use client';

import RegisterForm from '@/components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-md animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-4xl mb-4 block">🌿</span>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-cream mb-2">
            Đăng ký tham gia
          </h1>
          <p className="text-sm text-blush font-body">
            Hãy cho chúng mình biết bạn là ai nhé!
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          <RegisterForm />
        </div>

        {/* Footer note */}
        <p className="text-center text-xs text-cream/60 mt-6 font-body">
          Thông tin của bạn chỉ được sử dụng cho sự kiện này
        </p>
      </div>
    </div>
  );
}
