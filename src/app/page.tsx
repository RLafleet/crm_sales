import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import TaskList from '@/components/task-list';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const now = new Date();
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const tasksToday = await prisma.followUpTask.findMany({
    where: {
      dueAt: { gte: new Date(now.setHours(0, 0, 0, 0)), lte: end },
      status: 'open',
    },
    include: { client: true },
    orderBy: { dueAt: 'asc' },
  });

  const overdue = await prisma.followUpTask.findMany({
    where: { dueAt: { lt: new Date() }, status: 'open' },
    include: { client: true },
    orderBy: { dueAt: 'asc' },
  });

  const revisits = await prisma.client.findMany({
    where: { revisitNeeded: true },
    orderBy: { nextFollowUpAt: 'asc' },
    take: 10,
  });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Дашборд</h1>
        <Link href="/clients/new" className="btn-primary w-auto px-4">+ Клиент</Link>
      </header>

      <section>
        <h2 className="text-lg font-semibold mb-2 text-red-600">Просрочено</h2>
        <TaskList tasks={overdue} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Кому звонить сегодня</h2>
        <TaskList tasks={tasksToday} />
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">К кому вернуться</h2>
        <div className="grid gap-2">
          {revisits.map((c) => (
            <Link key={c.id} href={`/clients/${c.id}`} className="card">
              <div className="font-medium">{c.fullName}</div>
              <div className="text-sm text-slate-500">{c.address}</div>
              <div className="text-xs text-orange-600">
                Повторно: {c.nextFollowUpAt ? new Date(c.nextFollowUpAt).toLocaleString('ru-RU') : '—'}
              </div>
            </Link>
          ))}
          {revisits.length === 0 && <div className="text-sm text-slate-500">Нет повторных визитов</div>}
        </div>
      </section>
    </div>
  );
}
