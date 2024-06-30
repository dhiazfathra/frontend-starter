'use client';

import { useEffect, useState } from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, YAxis } from 'recharts';

interface GbsData {
  date: string;
  value: number;
}

function generateGbsData(startDate: Date, endDate: Date): GbsData[] {
  const data: GbsData[] = [];
  const days: number = Math.floor(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  for (let i: number = 0; i <= days; i += 1) {
    const currentDate: Date = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);

    const value: number = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    data.push({
      date: currentDate.toISOString().split('T')[0] ?? '',
      value,
    });
  }

  if (data && data.length > 0) {
    data[0]!.value = 100;
    data[data.length - 1]!.value = 1000;
  }

  return data;
}

const startDate: Date = new Date('2024-06-01');
const endDate: Date = new Date('2024-06-30');

const data: GbsData[] = generateGbsData(startDate, endDate);

export function PerformanceChart() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  const textColor = '#ffffff';
  const lineColor = '#1E90FF'; // Dodger Blue
  const tooltipStyle = {
    backgroundColor: '#333',
    border: 'none',
    borderRadius: '5px',
    padding: '10px',
    color: textColor,
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} style={{ backgroundColor: '#1a1a1a' }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={lineColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={lineColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <YAxis
          domain={['dataMin', 'dataMax']}
          stroke={textColor}
          orientation="right"
        />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="linear"
          dataKey="value"
          stroke={lineColor}
          strokeWidth={2}
          dot={false}
          fill="url(#colorValue)"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default PerformanceChart;
