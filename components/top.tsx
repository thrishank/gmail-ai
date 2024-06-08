import { signOut } from 'next-auth/react';

export function Top({ img, name, email }: any) {
  return (
    <div className="mt-8 flex justify-evenly">
      <div className="flex items-center">
        <div className="rounded-full overflow-hidden h-12 w-12 flex items-center justify-center mr-4">
          <img src={img} alt="User avatar" className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col">
          <div className="text-lg font-bold">{name}</div>
          <div className="text-sm text-gray-500">{email}</div>
        </div>
      </div>
      <button
        onClick={() => signOut()}
        className="font-bold text-black"
      >
        Log out
      </button>
    </div>
  );
}
