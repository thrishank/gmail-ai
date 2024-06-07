import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI('AIzaSyDjJ9gUbceGyqZtubkJ3XeoyHY4vDgl_9I');

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function classify(text: string) {
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
    console.log(res.text());
    return res.text();
  } catch (err) {
    console.log(err);
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const classifiedData = await Promise.all(
    body.map(async (item: any) => {
      const type = await classify(
        Buffer.from(item.fullMsg, 'base64').toString('utf-8'),
      );
      item.category = type?.split(' ')[0] || '';
      return item;
    }),
  );

  return NextResponse.json(classifiedData);
}
