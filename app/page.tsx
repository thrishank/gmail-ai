'use client';
import { EmailCard } from '@/components/email';
import { Top } from '@/components/top';
import { emailDataBody, modifyDataBody } from '@/lib/data';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const [selectedNumber, setSelectedNumber] = useState(15); // Number of emails to fetch
  const [loading, setLoading] = useState(false); // Loading state
  const [lodaingtext, setLoadingtext] = useState(''); // Text to display while loading
  const [emailData, setEmailData] = useState([emailDataBody]); // All the data of emails
  const [modifyData, setModifyData] = useState([modifyDataBody]); // Extracting the required data from emailData

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedNumber(parseInt(event.target.value, 10));
  };

  const session: any = useSession();
  if (!session?.data?.user) {
    redirect('/signin');
  }

  // Fetch the new set of emails when the selectedNumber changes
  useEffect(() => {
    async function getData() {
      setLoading(true);
      setLoadingtext('Fetching Your Emails...');
      try {
        const res = await axios.get(`/api/gmail?count=${selectedNumber}`);
        if (res.status === 200) {
          setEmailData(res.data);
          setLoading(false);
        } else {
          setLoading(false);
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setEmailData([
          {
            snippet: 'Error fetching the emails',
            payload: {
              headers: [{ name: '', value: '' }],
              body: { data: '' },
              parts: [{ mimeType: '', body: { data: '' } }],
            },
          },
        ]);
        // The error mainly occurs due to token expirations
        // So signout and login to get the new token
        signOut();
        redirect('signin/');
      }
    }
    getData();
  }, [selectedNumber]);

  const [emailType, setEmailType] = useState([]);

  if (typeof window !== undefined) {
    var apikey = localStorage.getItem('apiKey');
  }

  const handleClassify = async () => {
    setLoading(true);
    setLoadingtext('Classifying your emails with gemini API');
    const res = await axios.post(
      `/api/ai`,
      { apikey, modifyData },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    if (res.status === 200) {
      setEmailType(res.data);
      setLoading(false);
    }
  };

  useEffect(() => {
    setModifyData(
      emailData.map((item) => {
        return {
          msg: item.snippet,
          category: '',
          from:
            item.payload.headers
              .find((header) => header.name === 'From')
              ?.value.split('<')[0]
              .trim() || '',

          fullMsg:
            item.payload?.parts?.find((part) => part.mimeType === 'text/html')
              ?.body?.data || item.payload.body.data,

          plaintext:
            item.payload.parts?.find((part) => part.mimeType === 'text/plain')
              ?.body?.data || '',
        };
      }),
    );
  }, [emailData]);

  return (
    <div className="sm:mx-auto sm:w-1/2">
      <Top
        name={session.data?.user?.name}
        email={session.data?.user?.email}
        img={session.data?.user?.picture}
      />
      <div>{JSON.stringify(session)}</div>
      <div className="flex justify-evenly p-4">
        <div className="relative">
          <select
            value={selectedNumber}
            onChange={handleChange}
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
          >
            {[5, 15, 30, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
            <svg
              className="h-4 w-4 fill-current text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 12l-4-4h8l-4 4z" />
            </svg>
          </div>
        </div>
        <button
          onClick={handleClassify}
          className="rounded bg-green-500 px-4 py-2 font-bold text-white"
        >
          Classify
        </button>
      </div>

      {loading && (
        <div className="mt-4 flex flex-col items-center justify-center py-8">
          <PulseLoader
            color={'#7df9ff'}
            loading={loading}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {''}
          <p>{lodaingtext}</p>
        </div>
      )}

      {modifyData.map((item, idx) => (
        <EmailCard
          msg={item.msg}
          name={item.from}
          key={idx}
          fullEmail={item.fullMsg}
          type={emailType[idx]}
        />
      ))}
    </div>
  );
}
