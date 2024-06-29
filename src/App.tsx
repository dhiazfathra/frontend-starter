// src/App.tsx
import React from 'react';

import { Footer } from './templates/Footer';
import { Hero } from './templates/Hero';
import { Navbar } from './templates/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Footer />
    </>
  );
};

export default App;
