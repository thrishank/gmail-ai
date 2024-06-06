'use client';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
  const router = useRouter();
  const [apikey, setApiKey] = useState('');

  const fn = async () => {
    if (apikey.length > 0) {
      const res = await signIn('google');
      localStorage.setItem('apiKey', apikey);
      router.push('/');
    } else alert('Enter your OpenAPI key');
  };

  const session = useSession();
  if (session?.data?.user) {
    router.push('/');
  }

  return (
    <div className="flex h-screen justify-center bg-slate-300">
      <div className="flex flex-col justify-center">
        <div className="w-100 h-max rounded-md bg-white p-2 px-4 text-center">
          <input
            type="text"
            placeholder="Enter your OpenAI api key"
            onChange={(e) => setApiKey(e.target.value)}
            required
            className="mb-4 border border-black p-2"
          />
          <button
            onClick={fn}
            className="w-full rounded bg-blue-500 p-2 font-bold text-white hover:bg-blue-700"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
