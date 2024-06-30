'use client';

import React, { useState } from 'react';

const DetailSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Subscribe');
  const [activeAsset, setActiveAsset] = useState('In-kind');
  const buttonStyle = (isActive: boolean) => `
    flex-1 py-2 text-sm
    ${isActive ? 'bg-white text-gray-800 font-semibold' : 'bg-gray-100 text-gray-600'}
    border-2 ${isActive ? 'border-gray-300' : 'border-transparent'}
  `;

  return (
    <div
      className={`bg-gray-200 shadow-md transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-80'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700"
          type="button"
        >
          {isCollapsed ? '⬅️' : '➡️'}
        </button>
      </div>
      {!isCollapsed && (
        <div className="p-4">
          <div className="mb-4 flex">
            {['Subscribe', 'Redeem', 'Switch'].map((tab) => (
              <button
                key={tab}
                className={buttonStyle(activeTab === tab)}
                onClick={() => setActiveTab(tab)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mb-4">
            <p className="mb-2 text-sm text-gray-600">Share Class Asset</p>
            <div className="flex">
              {['In-kind', 'USDC'].map((asset) => (
                <button
                  key={asset}
                  className={buttonStyle(activeAsset === asset)}
                  onClick={() => setActiveAsset(asset)}
                  type="button"
                >
                  {asset}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Amount</p>
            <input
              type="number"
              className="w-full rounded border p-2"
              placeholder="0"
            />
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="font-semibold">89,901.00</p>
          </div>
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Terms</h3>
            {[
              ['Lock-up Period', '24 hours'],
              ['Minimum Investment', 'USDC 1,000'],
              ['Maximum Investment', 'USDC 10,000'],
            ].map(([term, value]) => (
              <div key={term} className="flex justify-between text-sm">
                <p>{term}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Summary</h3>
            {[
              ['Latest NAV', '100.00'],
              ['Subscription Fees', '(0%) 0'],
              ['Approx. Subscription Amount', 'GBS 123.45'],
            ].map(([item, value]) => (
              <div key={item} className="flex justify-between text-sm">
                <p>{item}</p>
                <p>{value}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              className="grow bg-gray-300 py-2 text-gray-700"
              style={{ flex: '1' }}
              type="button"
            >
              Clear
            </button>
            <button
              className="grow bg-green-500 py-2 text-white"
              style={{ flex: '3' }}
              type="button"
            >
              Subscribe 1,000 USDC
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailSidebar;
