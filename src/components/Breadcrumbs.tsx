'use client';

import React from 'react';

const Breadcrumbs: React.FC = () => {
  return (
    <div className="breadcrumbs pb-4 text-sm">
      <ul className="flex items-center space-x-2">
        <li>
          <button
            onClick={() => (window.location.href = '/')}
            className="text-gray-700 hover:text-blue-500"
          >
            Screener
          </button>
        </li>
        <li className="text-gray-500">
          <span>&gt;</span>
        </li>
        <li>
          <button
            onClick={() => (window.location.href = '/')}
            className="text-gray-700 hover:text-blue-500"
          >
            GBS
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
