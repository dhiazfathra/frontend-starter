import React from 'react';

import Breadcrumbs from '@/components/Breadcrumbs';
import DetailSidebar from '@/templates/DetailSidebar';
import { FundDetails } from '@/templates/FundDetails';
import Sidebar from '@/templates/Sidebar';

const GBSPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <div className="container mx-auto p-4">
          <Breadcrumbs />
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
