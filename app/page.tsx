'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Login from './signin/page';

export default function () {
  const session = useSession();
  if (session?.data?.user) {
    return (
      <div>
        <h1>{JSON.stringify(session)}</h1>
        <button onClick={() => signOut()}>LogOut</button>
      </div>
    );
  }
  return <Login />;
}
