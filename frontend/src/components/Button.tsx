import React from 'react';

export function Button({ children, className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`px-4 py-2 rounded bg-black text-white hover:bg-gray-600 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
