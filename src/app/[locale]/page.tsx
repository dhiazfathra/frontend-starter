import { FundDetails } from '@/templates/FundDetails';

export default function GBSPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="breadcrumbs text-sm">
        <ul>
          <li>Screener</li>
          <li>GBS</li>
        </ul>
      </div>
      <FundDetails />
    </div>
  );
}
