import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

export default function ActivityPastYear({ data }) {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ width: '60vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <CartesianGrid
            vertical={false}
            stroke={theme.bgMDark}
            strokeDasharray="3 3"
          />
          <XAxis
            tick={{ fill: theme.fcLight }}
            stroke={theme.bgMDark}
            dataKey="date"
          />
          <YAxis tick={{ fill: theme.fcLight }} stroke={theme.bgMDark} />
          <Tooltip
            isAnimationActive={true}
            animationEasing="ease-out"
            animationDuration={200}
          />
          <defs>
            <linearGradient id="linGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor={theme.accentColor}
                stopOpacity={0.2}
              />
              <stop offset="100%" stopColor={theme.bgPrimary} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="hours"
            stroke={theme.accentColor}
            strokeWidth={2}
            // fill={theme.accentColor}
            // fillOpacity={0.1}
            fill={'url(#linGradient)'}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
