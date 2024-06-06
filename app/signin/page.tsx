'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={async () => {
          const res = await signIn('google');
          router.push('/');
        }}
      >
        Login with google
      </button>

      <br />
    </div>
  );
}
