import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function Top10BarChart({ data, dataKey }) {
  return (
    <div style={{ width: '80vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            name="Hours spent listening"
            dataKey="hoursPlayed"
            fill="#8884d8"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
