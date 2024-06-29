import React from 'react';

import { Footer } from '@/templates/Footer';
import { FundDetails } from '@/templates/FundDetails';
import { Hero } from '@/templates/Hero';
import { Navbar } from '@/templates/Navbar';

const App: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grow">
        <Hero />
        <FundDetails />
      </main>
      <Footer />
    </div>
  );
};

export default App;
