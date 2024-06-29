'use client';

import { useState } from 'react';

const DetailSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`fixed inset-y-0 right-0 z-30 bg-white shadow-md transition-all duration-300 ${
        isCollapsed ? 'translate-x-full' : 'translate-x-0'
      } md:relative md:translate-x-0 ${isCollapsed ? 'w-0 md:w-16' : 'w-full md:w-80'}`}
    >
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-12 top-4 rounded-full bg-white p-2 text-gray-500 shadow-md hover:text-gray-700 md:hidden"
      >
        {isCollapsed ? '◀' : '▶'}
      </button>
      <div className="flex h-16 items-center justify-between p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden text-gray-500 hover:text-gray-700 md:block"
        >
          {isCollapsed ? '⬅️' : '➡️'}
        </button>
      </div>
      {!isCollapsed && <div className="p-4" />}
    </div>
  );
};

export default DetailSidebar;
