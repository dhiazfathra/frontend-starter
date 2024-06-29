import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white p-4 shadow-sm">
      <div className="container mx-auto">
        <div className="flex items-center">
          <svg
            className="mr-2 size-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12H7L10 19L14 5L17 12H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="text-xl font-semibold">GLAM Investment Fund</span>
        </div>
      </div>
    </nav>
  );
};
