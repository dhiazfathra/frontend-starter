'use client';

import { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

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

    // Generate a random value between 0 and 1000
    const randomValue: number = Math.floor(Math.random() * 1001);

    // Apply the projection formula for the range 25.4 to 26.23
    const value: number = 0.00083 * randomValue + 25.4;

    data.push({
      date: currentDate.toISOString().split('T')[0] ?? '',
      value,
    });
  }

  if (data && data.length > 0) {
    data[0]!.value = 25.4; // Ensure the first value is 25.4
    data[data.length - 1]!.value = 26.23; // Ensure the last value is 26.23
  }

  return data;
}

const startDate: Date = new Date('2024-06-01');
const endDate: Date = new Date('2024-06-30');

const data: GbsData[] = generateGbsData(startDate, endDate);

interface PerformanceChartProps {
  isDarkMode: boolean;
}

export function PerformanceChart({ isDarkMode }: PerformanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
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
        <XAxis dataKey="name" hide />
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
