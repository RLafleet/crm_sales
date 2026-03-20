'use client';
import { useRouter, useSearchParams } from 'next/navigation';

const statuses = ['', 'new', 'thinking', 'warm', 'hot', 'call_later', 'revisit', 'not_relevant', 'refused', 'connected'];
const priorities = ['', 'low', 'medium', 'high'];

export default function Filters() {
  const router = useRouter();
  const params = useSearchParams();

  function update(key: string, value: string) {
    const sp = new URLSearchParams(params.toString());
    if (!value) sp.delete(key);
    else sp.set(key, value);
    router.push(`/clients?${sp.toString()}`);
  }

  return (
    <div className="card grid grid-cols-2 gap-2">
      <select className="input" value={params.get('status') || ''} onChange={(e) => update('status', e.target.value)}>
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s ? `Статус: ${s}` : 'Все статусы'}
          </option>
        ))}
      </select>
      <select className="input" value={params.get('priority') || ''} onChange={(e) => update('priority', e.target.value)}>
        {priorities.map((s) => (
          <option key={s} value={s}>
            {s ? `Приоритет: ${s}` : 'Все приоритеты'}
          </option>
        ))}
      </select>
      <input
        className="input"
        placeholder="Оператор"
        defaultValue={params.get('operator') || ''}
        onBlur={(e) => update('operator', e.target.value)}
      />
      <select className="input" value={params.get('next') || ''} onChange={(e) => update('next', e.target.value)}>
        <option value="">Все даты</option>
        <option value="today">Сегодня</option>
      </select>
    </div>
  );
}
