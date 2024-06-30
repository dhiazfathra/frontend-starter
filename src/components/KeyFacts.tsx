import { Card } from './ui/card';

function KeyFactItem({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

export function KeyFacts() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Key Facts</h2>
      <div className="space-y-4">
        <KeyFactItem title="Share Class Asset" value="USDC" />
        <KeyFactItem title="Inception Date" value="2024-04-01" />
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">Accounts</h3>
          <div className="space-y-2">
            <KeyFactItem title="Fund" value="AdXk...5Kc2" />
            <KeyFactItem title="Treasury" value="7Eo2...MJrP" />
            <KeyFactItem title="Manager" value="ema1...Ayuo" />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="mb-2 text-sm font-medium text-gray-500">Terms</h3>
          <KeyFactItem title="Lock-up Period" value="24 hours" />
        </div>
      </div>
    </Card>
  );
}
