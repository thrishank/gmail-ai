'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Login from './signin/page';
import Home from './dashboard/page';

export default function Page() {
  const session = useSession();
  if (!session?.data?.user) {
    return <Login />;
  }
  return <Home />;
}
