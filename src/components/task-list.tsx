'use client';
import { useRouter } from 'next/navigation';

export default function TaskList({ tasks }: { tasks: any[] }) {
  const router = useRouter();

  async function complete(id: string) {
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'done' }),
    });
    router.refresh();
  }

  async function snooze(id: string, days: number) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const due = new Date(task.dueAt);
    due.setDate(due.getDate() + days);
    await fetch('/api/tasks', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, dueAt: due.toISOString(), status: 'open' }),
    });
    router.refresh();
  }

  if (!tasks.length) return <div className="text-sm text-slate-500">Задач нет</div>;

  return (
    <div className="space-y-2">
      {tasks.map((t) => (
        <div key={t.id} className="card flex justify-between items-center gap-3">
          <div>
            <div className="font-medium">{t.client?.fullName ?? ''}</div>
            <div className="text-sm text-slate-600 flex items-center gap-2">
              <span className="badge">{t.type}</span>
              <span>{new Date(t.dueAt).toLocaleString('ru-RU')}</span>
            </div>
            {t.notes && <div className="text-xs text-slate-500">{t.notes}</div>}
          </div>
          <div className="flex flex-col gap-1 min-w-[110px]">
            <button onClick={() => complete(t.id)} className="btn-primary text-xs px-3 py-1 w-auto">
              Сделано
            </button>
            <button onClick={() => snooze(t.id, 1)} className="btn-outline text-xs px-3 py-1 w-auto">
              +1 день
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
