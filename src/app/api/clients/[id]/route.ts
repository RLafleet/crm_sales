import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const client = await prisma.client.findUnique({ where: { id: params.id } });
  return NextResponse.json(client);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  const client = await prisma.client.update({ where: { id: params.id }, data });
  return NextResponse.json(client);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await prisma.client.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
