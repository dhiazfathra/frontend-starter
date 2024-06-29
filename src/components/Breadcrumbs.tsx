'use client';

import React from 'react';

const Breadcrumbs: React.FC = () => {
  const handleClick = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="breadcrumbs pb-4 text-sm">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => handleClick('/')}
            className="text-gray-700 hover:text-blue-500"
            type="button"
          >
            Screener
          </button>
        </li>
        <li className="text-gray-500">
          <span>&gt;</span>
        </li>
        <li>
          <button
            onClick={() => handleClick('/')}
            className="text-gray-700 hover:text-blue-500"
            type="button"
          >
            GBS
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
