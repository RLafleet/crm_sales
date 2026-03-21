import TaskList from '@/components/task-list';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export default async function FollowUps() {
  const tasks = await prisma.followUpTask.findMany({
    where: { status: 'open' },
    include: { client: true },
    orderBy: { dueAt: 'asc' },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Follow-ups</h1>
      <TaskList tasks={tasks} />
    </div>
  );
}
