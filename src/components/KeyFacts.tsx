import { Card } from './ui/card';

function KeyFactItem({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-base font-semibold">{value}</p>
    </div>
  );
}

export function KeyFacts() {
  return (
    <Card className="p-6">
      <h2 className="mb-4 text-xl font-semibold">Key Facts</h2>
      <div className="grid grid-cols-2 gap-4">
        <KeyFactItem title="Share Class Asset" value="USDC" />
        <KeyFactItem title="Inception Date" value="2024-04-01" />
        <KeyFactItem title="Fund" value="AdXk...5Kc2" />
        <KeyFactItem title="Treasury" value="7Eo2...MJrP" />
        <KeyFactItem title="Manager" value="ema1...Ayuo" />
        <KeyFactItem title="Lock-up Period" value="24 hours" />
      </div>
    </Card>
  );
}
