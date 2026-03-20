import ClientForm from '@/components/client-form';
import { prisma } from '@/lib/prisma';

export default async function EditClient({ params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  if (!client) return <div>Not found</div>;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Редактировать</h1>
      <ClientForm client={client} />
    </div>
  );
}
