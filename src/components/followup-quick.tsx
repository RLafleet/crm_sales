'use client';
import { useRouter } from 'next/navigation';

type Props = { clientId: string };

const presets = [
  { label: 'Сегодня 18:00', offsetDays: 0, hour: 18 },
  { label: 'Завтра 12:00', offsetDays: 1, hour: 12 },
  { label: '+3 дня', offsetDays: 3, hour: 12 },
];

export default function FollowupQuick({ clientId }: Props) {
  const router = useRouter();

  async function create(offsetDays: number, hour: number) {
    const due = new Date();
    due.setDate(due.getDate() + offsetDays);
    due.setHours(hour, 0, 0, 0);
    await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clientId, type: 'call', dueAt: due, notes: 'Авто follow-up' }),
    });
    router.refresh();
  }

  return (
    <div className="card">
      <div className="text-sm font-medium mb-2">Быстро поставить follow-up</div>
      <div className="flex gap-2">
        {presets.map((p) => (
          <button key={p.label} onClick={() => create(p.offsetDays, p.hour)} className="btn-outline text-xs px-2 py-2">
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
