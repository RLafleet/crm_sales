import ClientCard from '@/components/client-card';
import Filters from '@/components/filters';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

type Search = { [key: string]: string | string[] | undefined };

export default async function ClientsPage({ searchParams }: { searchParams: Search }) {
  const { status, operator, priority, next } = searchParams;
  const where: any = {};

  if (status && typeof status === 'string' && status.length) where.leadStatus = status;
  if (priority && typeof priority === 'string' && priority.length) where.leadPriority = priority;
  if (operator && typeof operator === 'string' && operator.length) where.currentOperator = operator;
  if (next === 'today') {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    where.nextFollowUpAt = { gte: start, lte: end };
  }

  const clients = await prisma.client.findMany({
    where,
    orderBy: [{ leadPriority: 'desc' }, { nextFollowUpAt: 'asc' }],
    take: 100,
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Клиенты</h1>
      </div>
      <Filters />
      <div className="grid gap-2">
        {clients.map((c) => (
          <ClientCard key={c.id} client={c} />
        ))}
        {clients.length === 0 && <div className="text-sm text-slate-500">Нет клиентов по фильтрам</div>}
      </div>
    </div>
  );
}
