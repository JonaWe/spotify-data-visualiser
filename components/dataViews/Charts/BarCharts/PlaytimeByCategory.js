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

import { CustomToolTipWrapper } from '../../Util/Util.elements';

const PlayTimeByCategoryTT = ({ active, payload, label, category }) => {
  if (active && payload && payload.length) {
    const totalPlaytime = `${Math.round(payload[0].value)} hours`;
    return (
      <CustomToolTipWrapper>
        <h3>{label}</h3>
        {category === 'trackName' && (
          <p>
            Artist: <b>{payload[0].payload.artistName}</b>
          </p>
        )}
        <p>
          Total playtime: <b>{totalPlaytime}</b>
        </p>
      </CustomToolTipWrapper>
    );
  } else return null;
};
export default function PlaytimeByCategory({ data, category }) {
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
            dataKey={category}
          />
          <YAxis tick={{ fill: theme.fcLight }} stroke={theme.bgMDark} />
          <Tooltip
            cursor={{ fill: theme.accentColor, fillOpacity: 0.1 }}
            isAnimationActive={true}
            animationEasing="ease-out"
            animationDuration={200}
            content={<PlayTimeByCategoryTT category={category} />}
          />
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
