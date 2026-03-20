import './globals.css';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import BottomNav from '@/components/bottom-nav';

export const metadata: Metadata = {
  title: 'Field Sales CRM',
  description: 'Mobile-first CRM для полевых продажников',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={cn('bg-slate-50 text-slate-900 pb-16')}>
        <div className="max-w-screen-md mx-auto min-h-screen p-3">{children}</div>
        <BottomNav />
      </body>
    </html>
  );
}
