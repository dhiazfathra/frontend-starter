'use client';

import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { ColorType, createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

interface PerformanceChartProps {
  isDarkMode: boolean;
}

export function PerformanceChart({ isDarkMode }: PerformanceChartProps) {
  const [balance, setBalance] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solana = new Connection(
          process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '',
        );

        const currentSlot = await solana.getSlot();
        setSlot(currentSlot);

        const publicKey = new PublicKey(
          'B5yxyzu1DpTRLDLffn3ycoytp17dMFAnyiUWypsqrqB1',
        );
        const balanceInLamports = await solana.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
        setBalance(balanceInSOL);

        if (chartContainerRef.current) {
          const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
            layout: {
              background: {
                type: ColorType.Solid,
                color: isDarkMode ? '#1E1E1E' : '#FFFFFF',
              },
              textColor: isDarkMode ? '#FFFFFF' : '#000000',
            },
            grid: {
              vertLines: { color: isDarkMode ? '#2B2B43' : '#E1E1E1' },
              horzLines: { color: isDarkMode ? '#2B2B43' : '#E1E1E1' },
            },
          });

          const lineSeries = chart.addLineSeries({
            color: isDarkMode ? '#4287f5' : '#1e90ff',
            lineWidth: 2,
          });

          lineSeries.setData([
            { time: new Date().getTime() / 1000, value: balanceInSOL },
          ]);

          chart.timeScale().fitContent();
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();
  }, [isDarkMode]);

  const textColor = isDarkMode ? '#ffffff' : '#000000';

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
      {balance !== null && slot !== null ? (
        <>
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
