import React from 'react';

import DetailSidebar from '@/templates/DetailSidebar';
import { FundDetails } from '@/templates/FundDetails';
import Sidebar from '@/templates/Sidebar';

const GBSPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="container mx-auto p-4">
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
          <div className="flex">
            <div className="flex-1">
              <FundDetails />
            </div>
            <DetailSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GBSPage;
