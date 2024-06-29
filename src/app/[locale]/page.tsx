import React from 'react';

import DetailSidebar from '@/templates/DetailSidebar';
import { FundDetails } from '@/templates/FundDetails';
import Sidebar from '@/templates/Sidebar';

const GBSPage: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {' '}
      {/* Flex column for mobile, row for desktop */}
      <Sidebar />
      <div className="flex-1">
        <div className="container mx-auto p-4">
          <div className="breadcrumbs pb-4 text-sm">
            <ul className="flex items-center space-x-2">
              <li>
                <a href="/" className="text-gray-700 hover:text-blue-500">
                  Screener
                </a>
              </li>
              <li className="text-gray-500">
                <span>&gt;</span>
              </li>
              <li>
                <a href="/" className="text-gray-700 hover:text-blue-500">
                  GBS
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col md:flex-row">
            {' '}
            {/* Flex column for mobile, row for desktop */}
            <div className="mb-4 flex-1 md:mr-4">
              {' '}
              {/* Full width on mobile, margin on desktop */}
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
