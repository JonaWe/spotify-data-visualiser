import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

export default function Top10BarChart({ data, dataKey }) {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ width: '50vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid
            vertical={false}
            stroke={theme.bgMDark}
            strokeDasharray="3 3"
          />
          <XAxis
            tick={{ fill: theme.fcLight }}
            stroke={theme.bgMDark}
            dataKey={dataKey}
          />
          <YAxis tick={{ fill: theme.fcLight }} stroke={theme.bgMDark} />
          <Tooltip cursor={{ fill: theme.accentColor, fillOpacity: 0.1 }} />
          <Legend />
          <Bar
            name="Hours spent listening"
            dataKey="hoursPlayed"
            fill={theme.accentColor}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
