'use client';

import { Switch } from '@radix-ui/react-switch';
import { Moon, Sun } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { KeyFacts } from '@/components/KeyFacts';
import { Card } from '@/components/ui/card';

const PerformanceChart = dynamic(
  () =>
    import('@/components/PerformanceChart').then((mod) => mod.PerformanceChart),
  {
    ssr: false,
    loading: () => <p>Loading chart...</p>,
  },
);

function FundInfoCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        {title}
      </h3>
      <div className="text-lg font-semibold dark:text-white">{value}</div>
      {subtitle && (
        <div className="text-xs text-gray-400 dark:text-gray-500">
          {subtitle}
        </div>
      )}
    </div>
  );
}

export function FundDetails() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className={`space-y-4 ${isDarkMode ? 'dark' : ''}`}>
      <Card className="p-6">
        <div className="flex items-center space-x-4">
          <div className="size-16 rounded-lg bg-gradient-to-br from-gray-700 to-black" />
          <div>
            <h1 className="text-2xl font-bold">GLAM Investment Fund</h1>
            <p className="text-gray-500">
              The GLAM Investment Fund seeks to reflect generally the
              performance of Bitcoin and Solana.
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <FundInfoCard title="Symbol" value="GBS" subtitle="Cex: JKL" />
          <FundInfoCard
            title="Share Class Asset"
            value="USDC"
            subtitle="EFI: TLM"
          />
          <FundInfoCard
            title="Fees"
            value={
              <div>
                <div>Management: 1.5%</div>
                <div>Performance: 10%</div>
              </div>
            }
          />
          <FundInfoCard
            title="Fees"
            value={
              <div>
                <div>Subscription: 0%</div>
                <div>Redemption: 0%</div>
              </div>
            }
          />
        </div>
      </Card>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-2 text-xl font-semibold">NAV</h2>
          <div className="text-3xl font-bold">100.00</div>
          <div className="text-sm text-gray-500">1 Day NAV Change</div>
          <div className="text-green-500">↑ 1.00 (1.00%)</div>
        </Card>
        <Card className="p-6">
          <h2 className="mb-2 text-xl font-semibold">AUM</h2>
          <div className="text-3xl font-bold">21.0M</div>
          <div className="text-sm text-gray-500">1 Day AUM Change</div>
          <div className="text-red-500">↓ 1M (0.42%)</div>
        </Card>
      </div>
      <Card>
        <div className="p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Performance</h2>
            <div className="flex items-center space-x-2">
              <Sun className="size-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={toggleDarkMode}
                aria-label="Toggle dark mode"
              />
              <Moon className="size-4" />
            </div>
          </div>
          <PerformanceChart isDarkMode={isDarkMode} />
        </div>
      </Card>
      <KeyFacts />
    </div>
  );
}
