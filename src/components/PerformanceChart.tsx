'use client';

import { Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';

export function PerformanceChart() {
  const [balanceData, setBalanceData] = useState<
    { time: string; value: number }[]
  >([]);
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const [slot, setSlot] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const solana = new Connection(
          process.env.NEXT_PUBLIC_SOLANA_RPC_URL || '',
        );

        const publicKey = new PublicKey(
          'B5yxyzu1DpTRLDLffn3ycoytp17dMFAnyiUWypsqrqB1',
        );

        // Get the current slot
        const currentSlot = await solana.getSlot();
        setSlot(currentSlot);

        // Get current balance
        const currentBalanceInLamports = await solana.getBalance(publicKey);
        const currentBalanceInSOL = currentBalanceInLamports / LAMPORTS_PER_SOL;
        setCurrentBalance(currentBalanceInSOL);

        // Generate dates for the past 30 days
        const dates = Array.from({ length: 30 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return formatDate(date);
        }).reverse();

        // Fetch balances for each day
        const balanceHistory = await Promise.all(
          dates.map(async (date) => {
            const unixTimestamp = Math.floor(new Date(date).getTime() / 1000);
            const balanceInLamports = await solana.getBalanceAndContext(
              publicKey,
              {
                minContextSlot: 0,
                maxContextSlot: await solana.getSlot(unixTimestamp),
              },
            );
            return {
              time: date,
              value: balanceInLamports.value / LAMPORTS_PER_SOL,
            };
          }),
        );

        setBalanceData(balanceHistory);

        // Create and update chart
        if (chartContainerRef.current && !chartRef.current) {
          const chart = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 300,
          });
          chartRef.current = chart;

          const lineSeries = chart.addLineSeries({
            color: '#1e90ff',
            lineWidth: 2,
          });

          lineSeries.setData(balanceHistory);

          chart.timeScale().fitContent();
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch data. Please try again later.');
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []); // Empty dependency array ensures this effect runs only once

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div ref={chartContainerRef} style={{ width: '100%', height: '300px' }} />
      {currentBalance !== null && slot !== null ? (
        <>
          <p style={{ fontSize: '1em', textAlign: 'center' }}>
            Current Balance: {currentBalance.toLocaleString()} SOL
          </p>
          <p style={{ fontSize: '1em', textAlign: 'center' }}>
            Current Slot: {slot.toLocaleString()}
          </p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <p style={{ fontSize: '0.8em', textAlign: 'center' }}>
        Note: This app uses a QuickNode RPC endpoint.
      </p>
    </>
  );
}

export default PerformanceChart;
