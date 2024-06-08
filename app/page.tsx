'use client';
import { EmailCard } from '@/components/email';
import { Top } from '@/components/top';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function Home() {
  const [selectedNumber, setSelectedNumber] = useState(15);
  const [loading, setLoading] = useState(false);
  const [lodaingtext, setLoadingtext] = useState('');
  const handleChange = (event: any) => {
    setSelectedNumber(event.target.value);
  };

  const session: any = useSession();
  if (!session?.data?.user) {
    redirect('/signin');
  }

  const [emailData, setEmailData] = useState([
    {
      snippet: '',
      payload: {
        headers: [
          {
            name: '',
            value: '',
          },
        ],
        body: {
          data: '',
        },
        parts: [
          {
            mimeType: '',
            body: {
              data: '',
            },
          },
        ],
      },
    },
  ]);

  const [modifyData, setModifyData] = useState([
    {
      msg: '',
      from: '',
      fullMsg: '',
    },
  ]);

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
        };
      }),
    );
  }, [emailData]);

  return (
    <div className="mx-auto w-1/2">
      <Top
        name={session.data?.user?.name}
        email={session.data?.user?.email}
        img={session.data?.user?.picture}
      />
      <div className="flex justify-evenly p-4">
        <div className="relative">
          <select
            value={selectedNumber}
            onChange={handleChange}
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
          >
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="50">50</option>
            <option value="100">100</option>
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
