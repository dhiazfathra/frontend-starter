import React from 'react';

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
  return (
    <div className="w-64 bg-white shadow-md">
      <div className="border-b p-4">
        <h1 className="text-xl font-bold">GLAM *+</h1>
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
  );
};

export default Sidebar;
