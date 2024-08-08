'use client';
import { signIn, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';

import { VerificationLevel, IDKitWidget, useIDKit } from '@worldcoin/idkit';
import type { ISuccessResult } from '@worldcoin/idkit';
import { verify } from '../actions/verify';

export default function Login() {
  const handleLogin = async () => {
    await signIn('google');
    redirect('/');
  };

  const session = useSession();
  if (session?.data?.user) {
    redirect('/');
  }

  const app_id = process.env.NEXT_PUBLIC_WLD_APP_ID as `app_${string}`;
  const action = process.env.NEXT_PUBLIC_WLD_ACTION;

  if (!app_id) {
    throw new Error('app_id is not set in environment variables!');
  }
  if (!action) {
    throw new Error('action is not set in environment variables!');
  }

  const { setOpen } = useIDKit();

  const onSuccess = (result: ISuccessResult) => {
    window.alert(
      'Successfully verified with World ID! Your nullifier hash is: ' +
        result.nullifier_hash,
    );
    // await signIn();
    // This is where you should perform frontend actions once a user has been verified,
    // such as redirecting to a new page
  };

  const handleProof = async (result: ISuccessResult) => {
    const data = await verify(result);
    if (data.success) {
      // store data in db and implement authentication logic(JWT, Cookie)
    } else {
      throw new Error(`Verification failed: ${data.detail}`);
    }
  };

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
        <IDKitWidget
          action={action}
          app_id={app_id}
          onSuccess={onSuccess}
          handleVerify={handleProof}
          verification_level={VerificationLevel.Device}
        />
        <button
          className="m-4 rounded-md border border-black"
          onClick={() => setOpen(true)}
        >
          <div className="mx-3 my-1">Verify with World ID</div>
        </button>
      </div>
    </div>
  );
}
