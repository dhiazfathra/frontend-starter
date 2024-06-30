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

// Implement a simple rate limiter
const rateLimiter = {
  lastCallTime: 0,
  callsInLastTenSeconds: 0,
  async throttle() {
    const now = Date.now();
    if (now - this.lastCallTime > 10000) {
      this.callsInLastTenSeconds = 0;
      this.lastCallTime = now;
    }
    if (this.callsInLastTenSeconds >= 40) {
      const waitTime = 10000 - (now - this.lastCallTime);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return this.throttle();
    }
    this.callsInLastTenSeconds++;
  },
};

async function fetchUsdcData(): Promise<UsdcData[]> {
  const connection = new Connection(
    'https://rpc-mainnet.helius.xyz/?api-key=37f7d681-7048-4af9-b03e-12b3aef66968',
    'confirmed',
  );
  const usdcMint = new PublicKey(
    'B5yxyzu1DpTRLDLffn3ycoytp17dMFAnyiUWypsqrqB1',
  );

  try {
    await rateLimiter.throttle();

    const response = await connection.getTokenAccountsByOwner(
      usdcMint,
      { mint: usdcMint },
      { encoding: 'jsonParsed' },
    );

    if (response.value.length === 0) {
      throw new Error('No USDC account found');
    }

    const accountInfo = response.value[0].account.data.parsed.info;
    const usdcAmount = parseFloat(accountInfo.tokenAmount.uiAmountString);

    // Since we only have current data, we'll create a single data point
    const currentDate = new Date();
    const data: UsdcData[] = [
      {
        date: currentDate.toISOString().split('T')[0],
        value: usdcAmount,
      },
    ];

    return data;
  } catch (error) {
    console.error('Error fetching USDC data:', error);
    if (error instanceof Error) {
      if (error.message.includes('403')) {
        throw new Error('Access denied. Consider using a private RPC server.');
      } else if (error.message.includes('429')) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }
    }
    throw error;
  }
}

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
    fetchUsdcData()
      .then((fetchedData) => {
        setData(fetchedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching USDC data:', err);
        setError(
          err.message || 'Failed to fetch USDC data. Please try again later.',
        );
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
    <>
      {data.length > 0 ? (
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
            Current USDC Supply: {data[0].value.toLocaleString()} USDC
          </p>
        </>
      ) : (
        <p>No data available</p>
      )}
      <p style={{ color: textColor, fontSize: '0.8em', textAlign: 'center' }}>
        Note: This app uses a public RPC endpoint. For production use, please
        consider using a dedicated/private RPC server.
      </p>
    </>
  );
}

export default PerformanceChart;
