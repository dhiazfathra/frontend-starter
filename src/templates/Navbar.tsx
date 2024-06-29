import React from 'react';

import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-2">
        <Logo />
      </div>
    </nav>
  );
};
