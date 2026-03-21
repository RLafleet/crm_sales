import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const data = await req.json();
  const client = await prisma.client.create({ data });
  return NextResponse.json(client);
}

export async function GET() {
  const clients = await prisma.client.findMany({ take: 200, orderBy: { createdAt: 'desc' } });
  return NextResponse.json(clients);
}
