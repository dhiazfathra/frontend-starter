'use client';

import React, { useState } from 'react';

const DetailSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('Subscribe');
  const [activeAsset, setActiveAsset] = useState('In-kind');

  return (
    <div
      className={`bg-white shadow-md transition-all duration-300 ${
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
                className={`flex-1 py-2 text-sm ${
                  activeTab === tab
                    ? 'bg-white font-semibold text-gray-800'
                    : 'bg-gray-100 text-gray-600'
                } border-b-2 ${
                  activeTab === tab ? 'border-gray-800' : 'border-transparent'
                }`}
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
                  className={`flex-1 py-2 text-sm ${
                    activeAsset === asset
                      ? 'bg-white font-semibold text-gray-800'
                      : 'bg-gray-100 text-gray-600'
                  } border-b-2 ${
                    activeAsset === asset
                      ? 'border-gray-800'
                      : 'border-transparent'
                  }`}
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

          <button
            className="w-full rounded bg-green-500 py-2 text-white"
            type="button"
          >
            Subscribe 1,000 USDC
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailSidebar;
