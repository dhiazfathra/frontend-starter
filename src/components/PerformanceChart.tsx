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

export function PerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis domain={['dataMin', 'dataMax']} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
