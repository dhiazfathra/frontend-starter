import React from 'react';

export const FundDetails: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold">GLAM Investment Fund</h2>
        <p className="mb-6 text-gray-600">
          The GLAM Investment Fund seeks to reflect generally the performance of
          Bitcoin and Solana.
        </p>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">NAV</h3>
            <p className="text-3xl font-bold">100.00</p>
            <p className="text-green-500">1.00 (1.00%)</p>
            <p className="text-sm text-gray-500">1 Day NAV Change</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">AUM</h3>
            <p className="text-3xl font-bold">21.0M</p>
            <p className="text-red-500">1M (0.42%)</p>
            <p className="text-sm text-gray-500">1 Day AUM Change</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Symbol</h3>
            <p>GBS</p>
          </div>
          <div>
            <h3 className="font-semibold">Share Class Asset</h3>
            <p>USDC</p>
          </div>
          <div>
            <h3 className="font-semibold">Management Fee</h3>
            <p>1.5%</p>
          </div>
          <div>
            <h3 className="font-semibold">Performance Fee</h3>
            <p>10%</p>
          </div>
        </div>
      </div>
    </div>
  );
};
