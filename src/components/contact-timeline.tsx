export default function ContactTimeline({ contacts }: { contacts: any[] }) {
  if (!contacts.length) return <div className="text-sm text-slate-500">Нет контактов</div>;
  return (
    <div className="space-y-2">
      {contacts
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((c) => (
          <div key={c.id} className="card">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{c.contactType}</span>
              <span className="text-slate-500">{new Date(c.createdAt).toLocaleString('ru-RU')}</span>
            </div>
            {c.result && <div className="text-sm">{c.result}</div>}
            {c.notes && <div className="text-sm text-slate-600">{c.notes}</div>}
            {c.nextActionAt && (
              <div className="text-xs text-orange-600">
                След. шаг: {new Date(c.nextActionAt).toLocaleString('ru-RU')}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
