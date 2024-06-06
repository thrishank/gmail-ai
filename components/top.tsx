import { signOut } from 'next-auth/react';

export function Top({ img, name, email }: any) {
  return (
    <div className="mt-8 flex justify-evenly">
      <div className="flex">
        <img src={img}></img>
        <div className="flex flex-col">
          <div>{name}</div>
          <div>{email}</div>
        </div>
      </div>
      <button onClick={() => signOut()}>Log out</button>
    </div>
  );
}
