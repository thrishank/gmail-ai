import React, { useState } from 'react';

export function EmailCard({
  name,
  msg,
  type,
  fullEmail,
}: {
  name: string;
  msg: string;
  type?: any;
  fullEmail?: string;
}) {
  const typeStyles: any = {
    Important: 'border-green-500 text-green-500',
    Promotions: 'border-yellow-500 text-yellow-500',
    Social: 'border-blue-500 text-blue-500',
    Marketing: 'border-yellow-500 text-yellow-500',
    Spam: 'border-red-500 text-red-500',
    General: 'border-gray-500 text-gray-500',
    '': 'none',
  };

  const defaultStyle = 'border-gray-500 text-gray-500';
  const currentStyle = type ? typeStyles[type] || defaultStyle : defaultStyle;

  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);

  console.log(type);
  return (
    <div
      className={`mb-4 cursor-pointer rounded-lg border-2 p-4`}
      onClick={() => setSelectedEmail(selectedEmail === name ? null : name)}
    >
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xl font-bold">{name}</h2>
        {type && <span className={`font-bold ${currentStyle}`}>{type}</span>}
      </div>
      <p className="font-normal">{msg}</p>
      {selectedEmail === name && (
        <div className="absolute right-0 top-0 h-full w-1/2 overflow-y-auto bg-gray-200 bg-opacity-50 p-4 backdrop-blur-lg">
          <h1 onClick={() => setSelectedEmail(null)} className="cursor-pointer">
            Close
          </h1>
          <div
            className="email-content mt-4"
            dangerouslySetInnerHTML={{ __html: fullEmail || '' }}
          />
        </div>
      )}
    </div>
  );
}