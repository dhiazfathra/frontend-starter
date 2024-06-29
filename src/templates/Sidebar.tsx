'use client';

import React, { useState } from 'react';

const sidebarItems = [
  { id: 'screener', name: 'Screener', icon: '📊' },
  { id: 'portfolio', name: 'Portfolio', icon: '📁' },
  { id: 'ibtc', name: 'IBTC', icon: '📈' },
  { id: 'isol', name: 'ISOL', icon: '🔒' },
  { id: 'ieth', name: 'IETH', icon: '💎' },
  { id: 'meme', name: 'MEME', icon: '😂' },
  { id: 'defi', name: 'DEFI', icon: '🏦' },
  { id: 'stake', name: 'STAKE', icon: '🥩' },
  { id: 'depin', name: 'DEPIN', icon: '🔌' },
  { id: 'desci', name: 'DESCI', icon: '🧪' },
  { id: 'deai', name: 'DEAI', icon: '🤖' },
  { id: 'stable', name: 'STABLE', icon: '💰' },
];

const Sidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="fixed left-4 top-4 z-50 rounded-full bg-white p-2 shadow-md md:hidden"
      >
        {isCollapsed ? '☰' : '✕'}
      </button>
      <div
        className={`fixed inset-y-0 left-0 z-40 bg-white shadow-md transition-all duration-300 ${
          isCollapsed ? '-translate-x-full' : 'translate-x-0'
        } ${
          isCollapsed ? 'w-0' : 'w-full md:w-64'
        } md:relative md:translate-x-0`}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h1 className="text-xl font-bold">GLAM *+</h1>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700 md:hidden"
          >
            ✕
          </button>
        </div>
        <nav className="mt-4">
          <ul>
            {sidebarItems.map((item) => (
              <li
                key={item.id}
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              >
                <a href="#" className="flex items-center space-x-2">
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-4 px-4">
          <button className="w-full rounded bg-gray-200 py-2 text-gray-700 hover:bg-gray-300">
            + Create Product
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
