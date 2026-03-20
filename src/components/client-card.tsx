import Link from 'next/link';
import { priorityClass, statusClass } from '@/lib/utils';

export default function ClientCard({ client }: { client: any }) {
  return (
    <Link href={`/clients/${client.id}`} className="card flex justify-between items-center gap-3">
      <div className="flex-1">
        <div className="font-semibold">
          <span className={priorityClass(client.leadPriority)}></span>
          {client.fullName}
        </div>
        <div className="text-sm text-slate-500">{client.phone}</div>
        <div className="text-xs text-slate-500">
          След. касание: {client.nextFollowUpAt ? new Date(client.nextFollowUpAt).toLocaleString('ru-RU') : '—'}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1 text-xs">
        <span className={statusClass(client.leadStatus)}>{client.leadStatus}</span>
        <div className="flex gap-2">
          <a href={`tel:${client.phone}`} onClick={(e)=>e.stopPropagation()} className="btn-outline px-2 py-1 text-xs">Позвонить</a>
          <a href={`https://wa.me/${client.phone?.replace(/\D/g, '')}`} onClick={(e)=>e.stopPropagation()} className="btn-outline px-2 py-1 text-xs">WA</a>
        </div>
      </div>
    </Link>
  );
}
