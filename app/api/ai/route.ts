import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI('AIzaSyDjJ9gUbceGyqZtubkJ3XeoyHY4vDgl_9I');

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function classify(text: string): Promise<string | null> {
  const prompt = `Classify the following email into one of this six categories 
                  Important: Emails that are personal or work-related and require immediate attention
                  Promotions: Emails related to sales, discounts, and marketing campaigns.
                  Social: Emails from social networks, friends, and family.
                  Marketing: Emails related to marketing, newsletters, and notifications.
                  Spam: Unwanted or unsolicited emails.
                  General: If none of the above are matched, use General 
                  your answer should be just one word from the above
                  here is the email you need to classify ${text}`;
  try {
    const result = await model.generateContent(prompt);
    const res = result.response;
    return res.text();
  } catch (err) {
    console.error(`Error classifying text: ${text.substring(5000)}`, err);
    return null;
  }
}

export async function POST(req: Request) {
  const body = await req.json();
  const data: (string | null)[] = [];

  try {
    const promises = body.map(async (item: any) => {
      const fullMsg = item.fullMsg;
      if (typeof fullMsg !== 'string') {
        return null;
      }
      const type = await classify(
        Buffer.from(item.fullMsg, 'base64').toString('utf-8'),
      );
      return type?.split(' ')[0] || '';
    });

    const resolvedTypes = await Promise.all(promises);
    data.push(...resolvedTypes.filter((type): type is string => type !== null));

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json('failed', { status: 400 });
  }
}
