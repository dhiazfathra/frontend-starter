'use client';

import { Connection, PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface UsdcData {
  date: string;
  value: number;
}

async function fetchUsdcData(
  startDate: Date,
  endDate: Date,
): Promise<UsdcData[]> {
  const connection = new Connection(
    'https://solana-api.projectserum.com',
    'confirmed',
  );
  const usdcMint = new PublicKey(
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  );

  const days: number = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  const fetchPromises = Array.from({ length: days + 1 }, (_, i) => {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    return connection.getTokenSupply(usdcMint).then((supply) => ({
      date: currentDate.toISOString().split('T')[0] ?? '',
      value: parseFloat(supply.value.uiAmount?.toFixed(2) ?? '0'),
    }));
  });

  try {
    const data = await Promise.all(fetchPromises);
    return data;
  } catch (error) {
    console.error('Error fetching USDC data:', error);
    throw error;
  }
}

const startDate: Date = new Date('2023-06-01'); // Changed to a past date
const endDate: Date = new Date('2023-06-30'); // Changed to a past date

interface PerformanceChartProps {
  isDarkMode: boolean;
}

export function PerformanceChart({ isDarkMode }: PerformanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<UsdcData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
    fetchUsdcData(startDate, endDate)
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching USDC data:', err);
        setError('Failed to fetch USDC data. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  if (!isMounted) {
    return null;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  return (
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
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PerformanceChart;
