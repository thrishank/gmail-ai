import { intailPrompt } from '@/lib/data';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

async function classify(
  emails: Array<{ text: string; fulltext?: string }>,
  apikey: string,
): Promise<Array<string | null>> {
  const myapiKey = process.env.GOOGLE_AI_API_KEY;
  if (apikey === 'null') {
    apikey = myapiKey || '';
  }

  const genAI = new GoogleGenerativeAI(apikey);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  let prompt = intailPrompt;

  emails.forEach((email, index) => {
    prompt += `\n\nEmail ${index + 1}: ${email.text}`;
    if (typeof email.fulltext === 'string') {
      prompt += `\nFull text: ${Buffer.from(email.fulltext, 'base64').toString('utf-8')}`;
    }
  });

  prompt += `\n\nReturn the results in a single line like this "Important, General, etc`;

  try {
    const result = await model.generateContent(prompt);
    const res = result.response;

    const classifications = res
      .text()
      .split(',')
      .map((item) => item.trim());
    return classifications;
  } catch (err) {
    console.error('Error classifying emails:', err);
    return emails.map(() => null);
  }
}

export async function POST(req: Request) {
  const { modifyData, apikey } = await req.json();

  try {
    const emails = modifyData.map((item: any) => ({
      text: item.msg,
      fulltext: item.plaintext,
    }));

    const resolvedTypes = await classify(emails, apikey);
    const data = resolvedTypes.filter((type) => type !== 'Error');

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json('failed', { status: 400 });
  }
}
