/**
 * This is the Signin page which  allows users to log in using their Google account.
 * Users can enter their Gemini AI API key to authenticate.
 * If the API key is provided, it is stored in localStorage.
 * If the user is already authenticated, they are redirected to the homepage.
 * Users can click on the Google login button to initiate the login process.
 */

'use client';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

export default function Login() {
  const handleLogin = async () => {
    await signIn('google');
    redirect('/');
  };

  const session = useSession();
  if (session?.data?.user) {
    redirect('/');
  }

  return (
    <div className="flex h-screen items-center justify-center bg-slate-300">
      <div className="w-96 rounded-md bg-white p-4 text-center">
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center rounded border-2 bg-gray-300 p-2 font-bold text-black hover:border-black"
        >
          <FcGoogle className="mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
