import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const contact = await prisma.contactHistory.create({ data });

  await prisma.client.update({
    where: { id: data.clientId },
    data: {
      lastContactAt: new Date(),
      nextFollowUpAt: data.nextActionAt ?? null,
    },
  });

  return NextResponse.json(contact);
}
