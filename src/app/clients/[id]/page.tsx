import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import ContactTimeline from '@/components/contact-timeline';
import TaskList from '@/components/task-list';
import FollowupQuick from '@/components/followup-quick';

export const dynamic = 'force-dynamic';

export default async function ClientDetail({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({
    where: { id: params.id },
    include: {
      contacts: true,
      tasks: { where: { status: 'open' }, include: { client: true }, orderBy: { dueAt: 'asc' } },
    },
  });

  if (!client) return <div>Not found</div>;

  return (
    <div className="space-y-4">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold">{client.fullName}</h1>
          <div className="text-sm text-slate-500">{client.address}</div>
        </div>
        <Link href={`/clients/${client.id}/edit`} className="btn-secondary">Редактировать</Link>
      </header>

      <div className="grid gap-2">
        <div className="card">
          <div className="text-sm text-slate-600">Телефон</div>
          <div className="text-lg font-medium">{client.phone}</div>
          <div className="mt-2 flex gap-2">
            <a className="btn-primary flex-1 text-center" href={`tel:${client.phone}`}>Позвонить</a>
            <a className="btn-outline flex-1 text-center" href={`https://wa.me/${client.phone.replace(/\D/g, '')}`}>WhatsApp</a>
          </div>
        </div>

        <div className="card">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="text-slate-500">Статус:</span> {client.leadStatus}</div>
            <div><span className="text-slate-500">Приоритет:</span> {client.leadPriority}</div>
            <div><span className="text-slate-500">Тек. оператор:</span> {client.currentOperator ?? '—'}</div>
            <div><span className="text-slate-500">След. касание:</span> {client.nextFollowUpAt ? new Date(client.nextFollowUpAt).toLocaleString('ru-RU') : '—'}</div>
            <div><span className="text-slate-500">Revisit:</span> {client.revisitNeeded ? 'да' : 'нет'}</div>
            <div><span className="text-slate-500">Последний контакт:</span> {client.lastContactAt ? new Date(client.lastContactAt).toLocaleString('ru-RU') : '—'}</div>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-2">Открытые задачи</h2>
        <TaskList tasks={client.tasks} />
      </section>

      <FollowupQuick clientId={client.id} />

      <section>
        <h2 className="text-lg font-semibold mb-2">История контактов</h2>
        <ContactTimeline contacts={client.contacts} />
      </section>
    </div>
  );
}
