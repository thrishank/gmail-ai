import { authoptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authoptions);

  return NextResponse.json(session);
}
