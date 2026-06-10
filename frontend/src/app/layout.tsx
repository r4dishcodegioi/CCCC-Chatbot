import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Scent Personality Test | Chi Chi Chành Chành 2026',
  description: 'Khám phá dấu ấn mùi hương riêng của bạn qua bài test tính cách AI - Chi Chi Chành Chành 2026: Lụa và Trà',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen font-body antialiased">
        <main className="relative min-h-screen overflow-hidden">
          {/* Decorative elements */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <div className="leaf-decoration top-20 left-10">🍃</div>
            <div className="leaf-decoration top-40 right-16" style={{ animationDelay: '1s' }}>🌿</div>
            <div className="leaf-decoration bottom-32 left-20" style={{ animationDelay: '3s' }}>🍂</div>
            <div className="leaf-decoration bottom-20 right-8" style={{ animationDelay: '5s' }}>🌸</div>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
