import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="mb-4 text-4xl font-bold">
          Welcome to GLAM Investment Fund
        </h1>
        <p className="text-xl">
          The GLAM Investment Fund seeks to reflect generally the performance of
          Bitcoin and Solana.
        </p>
      </div>
    </div>
  );
};
