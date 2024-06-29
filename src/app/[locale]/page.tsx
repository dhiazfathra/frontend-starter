import React from 'react';

import { Footer } from '../../templates/Footer';
import { FundDetails } from '../../templates/FundDetails';
import { Hero } from '../../templates/Hero';
import { Navbar } from '../../templates/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
      <FundDetails />
    </>
  );
};

export default App;
