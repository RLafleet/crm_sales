import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const data = await req.json();
  const task = await prisma.followUpTask.create({ data });
  return NextResponse.json(task);
}

export async function PUT(req: Request) {
  const { id, status, dueAt } = await req.json();
  const data: any = {};
  if (status) data.status = status;
  if (dueAt) data.dueAt = new Date(dueAt);
  const task = await prisma.followUpTask.update({ where: { id }, data });
  return NextResponse.json(task);
}
