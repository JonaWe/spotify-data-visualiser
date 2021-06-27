import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Label,
} from 'recharts';

import { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import styled from 'styled-components';

const CTT = styled.div`
  padding: 0.15em 1em;
  background-color: ${({ theme }) => theme.fcPrimary}99;
  color: ${({ theme }) => theme.bgDark};
`;

const CustomToolTip = ({ active, payload, label, totalDays }) => {
  return (
    active && (
      <CTT>
        <p>
          At {label} you listen{' '}
          {((payload[0].value * 60) / totalDays).toFixed(1)} minutes on average.
        </p>
      </CTT>
    )
  );
};

export default function TimeslotsRadarChart({ data, totalDays }) {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke={theme.bgMDark} />
          <PolarAngleAxis
            dataKey="timeslot"
            stroke={theme.bgMDark}
            tick={{ fill: theme.fcLight }}
          />
          <Radar
            name="Hours spent listening"
            dataKey="totalTimeSpent"
            stroke={theme.accentColor}
            strokeWidth={1.5}
            fill={theme.accentColor}
            fillOpacity={0.25}
          />
          <Tooltip content={<CustomToolTip totalDays={totalDays} />} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
