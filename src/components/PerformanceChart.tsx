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

interface PerformanceChartProps {
  isDarkMode: boolean;
}

export function PerformanceChart({ isDarkMode }: PerformanceChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // or a loading placeholder
  }

  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const lineColor = isDarkMode ? '#8884d8' : '#82ca9d';
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
        <XAxis dataKey="name" stroke={textColor} />
        <YAxis domain={['dataMin', 'dataMax']} stroke={textColor} />
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
