import { NextResponse } from 'next/server';
import { sendTelegramMessage } from '@/utils/telegram'; // adjust the path as needed

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    await sendTelegramMessage(message);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram send error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
