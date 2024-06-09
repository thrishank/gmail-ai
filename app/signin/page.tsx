/**
 * This is the Signin page which  allows users to log in using their Google account.
 * Users can enter their Gemini AI API key to authenticate.
 * If the API key is provided, it is stored in localStorage.
 * If the user is already authenticated, they are redirected to the homepage.
 * Users can click on the Google login button to initiate the login process.
 */

'use client';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const [apikey, setApiKey] = useState('');

  const handleLogin = async () => {
    if (apikey.length > 0) {
      await signIn('google');
      localStorage.setItem('apiKey', apikey);
      redirect('/');
    } else {
      alert('Enter your OpenAPI key');
    }
  };

  const session = useSession();
  if (session?.data?.user) {
    redirect('/');
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-300">
      <div className="w-96 rounded-md bg-white p-4 text-center">
        <input
          type="text"
          placeholder="Enter your Gemini AI API key"
          value={apikey}
          onChange={(e) => setApiKey(e.target.value)}
          required
          className="mb-4 w-full border border-black p-2"
        />
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center rounded border-2 bg-gray-300 p-2 font-bold text-black hover:border-black"
        >
          <FcGoogle className="mr-2" />
          Login with Google
        </button>
        <div className="p-4 font-normal">
          <p>
            To get the google gemini API key go to the{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="blank"
              className="text-blue-500 underline"
            >
              Google AI Studio
            </a>{' '}
            and create one or if your lazy just enter{' '}
            <span
              className="cursor-pointer font-bold"
              onClick={() => setApiKey('null')}
            >
              null
            </span>{' '}
            to use my api key
          </p>
          {/* <Image
            src={'/image.png'}
            width={400}
            height={100}
            alt="google verfication"
            className="mt-4 border-4 border-black"
          />
          <h3 className="mt-4 text-red-500">
            you will see this screen while logging using the google this is
            because google takes time to verify the app anyway i am not storing
            any data so your good.
          </h3>

          <h2 className="mt-4 font-bold">
            To test the website click on the advanced and procced
          </h2> */}
        </div>
      </div>
    </div>
  );
}
