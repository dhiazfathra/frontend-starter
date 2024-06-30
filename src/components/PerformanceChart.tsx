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
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const usdcMint = new PublicKey(
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  ); // USDC mint address on Solana

  const data: UsdcData[] = [];
  const days: number = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  for (let i: number = 0; i <= days; i += 1) {
    const currentDate: Date = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    // Fetch USDC supply for the current date
    const supply = await connection.getTokenSupply(usdcMint);
    const value = parseFloat(supply.value.uiAmount?.toFixed(2) ?? '0');

    data.push({
      date: currentDate.toISOString().split('T')[0] ?? '',
      value,
    });
  }

  return data;
}

const startDate: Date = new Date('2024-06-01');
const endDate: Date = new Date('2024-06-30');

interface PerformanceChartProps {
  isDarkMode: boolean;
}

export function PerformanceChart({ isDarkMode }: PerformanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [data, setData] = useState<UsdcData[]>([]);

  useEffect(() => {
    setIsMounted(true);
    fetchUsdcData(startDate, endDate).then(setData);
  }, []);

  if (!isMounted) {
    return null;
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
