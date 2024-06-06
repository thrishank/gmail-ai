import { authoptions } from '@/lib/auth';
import { google } from 'googleapis';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authoptions);
  if (!session) return NextResponse.json('Not authorized');

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: session.user.accessToken });

  const gmail = google.gmail({ version: 'v1', auth });

  //   return NextResponse.json(session)
  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults: 5,
    });
    const messageIds = response.data.messages?.map((item) => item.id) || [];
    const messages = await Promise.all(
      messageIds.map(async (id) => {
        const msg = await gmail.users.messages.get({ userId: 'me', id: id! });
        return msg.data;
      }),
    );
    return NextResponse.json(messages);
  } catch (Err) {
    return NextResponse.json(Err);
  }
}
