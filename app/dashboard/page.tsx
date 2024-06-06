'use client';
import { Top } from '@/components/top';
import axios from 'axios';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [selectedNumber, setSelectedNumber] = useState(15);

  const handleChange = (event: any) => {
    setSelectedNumber(event.target.value);
  };

  const session = useSession();
  const router = useRouter();
  if (!session?.data?.user) {
    router.push('/signin');
  }

  const [emailData, setEmailData] = useState([]);
  useEffect(() => {
    async function getData() {
      const res = await axios.get('/api/gmail');
      setEmailData(res.data);
    }
    getData();
  }, []);

  return (
    <div>
      <Top
        name={session.data?.user?.name}
        email={session.data?.user?.email}
        img={session.data?.user?.image}
      />
      <h1>{JSON.stringify(session)}</h1>
      <div className="relative inline-block text-gray-700">
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
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2">
          <svg
            className="h-4 w-4 fill-current text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12l-4-4h8l-4 4z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
