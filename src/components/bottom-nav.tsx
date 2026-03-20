'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { href: '/', label: 'День' },
  { href: '/clients', label: 'Клиенты' },
  { href: '/clients/new', label: 'Добавить' },
  { href: '/follow-ups', label: 'Follow-ups' },
];

export default function BottomNav() {
  const path = usePathname();
  return (
    <nav className="bottom-nav">
      <ul className="max-w-screen-md mx-auto">
        {items.map((it) => {
          const active = path === it.href || (it.href !== '/' && path.startsWith(it.href));
          return (
            <li key={it.href}>
              <Link href={it.href} className={active ? 'active' : ''}>
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
