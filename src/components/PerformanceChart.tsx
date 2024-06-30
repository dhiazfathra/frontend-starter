'use client';

import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import React, { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface PerformanceChartProps {
  isDarkMode: boolean;
}

export function PerformanceChart({ isDarkMode }: PerformanceChartProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solana = new Connection(
          process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '',
        );

        // Fetch the current slot
        const currentSlot = await solana.getSlot();
        setSlot(currentSlot);

        // Fetch the balance
        const publicKey = new PublicKey(
          'B5yxyzu1DpTRLDLffn3ycoytp17dMFAnyiUWypsqrqB1',
        );
        const balanceInLamports = await solana.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(balanceInSOL);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const lineColor = isDarkMode ? '#4287f5' : '#1e90ff';
  const tooltipStyle = {
    backgroundColor: isDarkMode ? '#333' : '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    color: textColor,
  };

  // Create a simple dataset with the current balance
  const data =
    balance !== null
      ? [{ date: new Date().toISOString().split('T')[0], value: balance }]
      : [];

  return (
    <>
      {balance !== null && slot !== null ? (
        <>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" stroke={textColor} />
              <YAxis
                domain={['dataMin', 'dataMax']}
                stroke={textColor}
                orientation="right"
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2}
                dot
              />
            </LineChart>
          </ResponsiveContainer>
          <p style={{ color: textColor, fontSize: '1em', textAlign: 'center' }}>
            Current Balance: {balance.toLocaleString()} SOL
          </p>
          <p style={{ color: textColor, fontSize: '1em', textAlign: 'center' }}>
            Current Slot: {slot.toLocaleString()}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <p style={{ color: textColor, fontSize: '0.8em', textAlign: 'center' }}>
        Note: This app uses a QuickNode RPC endpoint.
      </p>
    </>
  );
}

export default PerformanceChart;
