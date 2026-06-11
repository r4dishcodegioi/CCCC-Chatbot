import type { Metadata } from 'next';
import './globals.css';
import SmokeBackground from '@/components/ApexUI-Kit/SmokeBackground/SmokeBackground';

export const metadata: Metadata = {
  title: 'AI Scent Personality Test | Chi Chi Chành Chành 2026',
  description: 'Khám phá dấu ấn mùi hương riêng của bạn qua bài test tính cách AI - Chi Chi Chành Chành 2026: Hương Trà Sắc Lụa',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen font-body antialiased" suppressHydrationWarning>
        <main className="relative min-h-screen overflow-hidden">
          {/* Decorative elements */}
          <div className="fixed inset-0 overflow-hidden z-[-1]">
            <SmokeBackground
              color="#FFDEA2"
              opacity={1}
              speed={0.5}
              scale={1.5}
              direction="funny, forward, backward"
              mouseInteractive={true}
            />
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
