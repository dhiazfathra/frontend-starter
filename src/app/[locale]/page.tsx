import React from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import DetailSidebar from '@/templates/DetailSidebar';
import { FundDetails } from '@/templates/FundDetails';
import Sidebar from '@/templates/Sidebar';

const GBSPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-4">
              <Breadcrumbs />
              <FundDetails />
            </div>
          </div>
          <DetailSidebar />
        </div>
      </div>
    </div>
  );
};

export default GBSPage;
