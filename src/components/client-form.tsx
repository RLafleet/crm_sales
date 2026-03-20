'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const statuses = ['new', 'thinking', 'warm', 'hot', 'call_later', 'revisit', 'not_relevant', 'refused', 'connected'];
const priorities = ['low', 'medium', 'high'];

type ClientInput = {
  id?: string;
  fullName?: string;
  phone?: string;
  address?: string;
  entrance?: string | null;
  floor?: string | null;
  apartment?: string | null;
  leadStatus?: string;
  leadPriority?: string;
  nextFollowUpAt?: string | null;
  notes?: string | null;
};

export default function ClientForm({ client }: { client?: ClientInput }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ClientInput>({
    leadStatus: 'new',
    leadPriority: 'medium',
    ...client,
  });

  const quickSet = (offsetDays: number, hour: number) => {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    d.setHours(hour, 0, 0, 0);
    setData({ ...data, nextFollowUpAt: d.toISOString().slice(0, 16) });
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const method = client?.id ? 'PUT' : 'POST';
    const url = client?.id ? `/api/clients/${client.id}` : '/api/clients';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    router.push('/clients');
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div className="grid gap-2">
        <input
          className="input"
          placeholder="Имя"
          value={data.fullName || ''}
          onChange={(e) => setData({ ...data, fullName: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Телефон"
          value={data.phone || ''}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Адрес"
          value={data.address || ''}
          onChange={(e) => setData({ ...data, address: e.target.value })}
          required
        />
        <div className="grid grid-cols-3 gap-2">
          <input
            className="input"
            placeholder="Подъезд"
            value={data.entrance || ''}
            onChange={(e) => setData({ ...data, entrance: e.target.value })}
          />
          <input
            className="input"
            placeholder="Этаж"
            value={data.floor || ''}
            onChange={(e) => setData({ ...data, floor: e.target.value })}
          />
          <input
            className="input"
            placeholder="Квартира"
            value={data.apartment || ''}
            onChange={(e) => setData({ ...data, apartment: e.target.value })}
          />
        </div>
        <select className="input" value={data.leadStatus} onChange={(e) => setData({ ...data, leadStatus: e.target.value })}>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select className="input" value={data.leadPriority} onChange={(e) => setData({ ...data, leadPriority: e.target.value })}>
          {priorities.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="flex gap-2 items-center">
          <input
            className="input"
            type="datetime-local"
            value={data.nextFollowUpAt?.toString().slice(0, 16) || ''}
            onChange={(e) => setData({ ...data, nextFollowUpAt: e.target.value })}
          />
          <div className="flex flex-col gap-1 text-xs">
            <button type="button" className="btn-outline" onClick={() => quickSet(0, 18)}>Сегодня 18:00</button>
            <button type="button" className="btn-outline" onClick={() => quickSet(1, 12)}>Завтра 12:00</button>
          </div>
        </div>
        <textarea
          className="input"
          placeholder="Заметки"
          rows={3}
          value={data.notes || ''}
          onChange={(e) => setData({ ...data, notes: e.target.value })}
        />
      </div>
      <button disabled={loading} className="btn-primary w-full">
        {client ? 'Сохранить' : 'Создать'}
      </button>
    </form>
  );
}
