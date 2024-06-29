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

const data = [
  { name: 'Jan', value: 25.4 },
  { name: 'Feb', value: 25.6 },
  { name: 'Mar', value: 25.8 },
  { name: 'Apr', value: 26.0 },
  { name: 'May', value: 26.2 },
  { name: 'Jun', value: 26.4 },
];

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
