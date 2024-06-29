'use client';

import { useState } from 'react';

const DetailSidebar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`bg-white shadow-md transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-full md:w-80'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isCollapsed ? '⬅️' : '➡️'}
        </button>
      </div>
      {!isCollapsed && (
        <div className="p-4">
          <div className="mb-4 flex justify-between">
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              Subscribe
            </button>
            <button className="rounded border border-blue-500 px-4 py-2 text-blue-500">
              Redeem
            </button>
            <button className="rounded border border-blue-500 px-4 py-2 text-blue-500">
              Switch
            </button>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600">Share Class Asset</p>
            <p className="font-semibold">In-kind</p>
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
            <div className="flex justify-between text-sm">
              <p>Lock-up Period</p>
              <p>24 hours</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Minimum Investment</p>
              <p>USDC 1,000</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Maximum Investment</p>
              <p>USDC 10,000</p>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="mb-2 font-semibold">Summary</h3>
            <div className="flex justify-between text-sm">
              <p>Latest NAV</p>
              <p>100.00</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Subscription Fees</p>
              <p>(0%) 0</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Approx. Subscription Amount</p>
              <p>GBS 123.45</p>
            </div>
          </div>

          <button className="w-full rounded bg-green-500 py-2 text-white">
            Subscribe 1,000 USDC
          </button>
        </div>
      )}
    </div>
  );
};

export default DetailSidebar;
