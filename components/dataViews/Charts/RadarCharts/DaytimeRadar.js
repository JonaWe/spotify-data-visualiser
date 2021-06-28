import { format } from 'date-fns';
import { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

import { CustomToolTipWrapper } from '../../Util/Util.elements';

const DaytimeActivityTT = ({ active, payload, label, totalDays }) => {
  if (active && payload && payload.length) {
    const msPlayed = payload[0].value;
    const playtime = format(msPlayed / totalDays, "m.s' minutes'");
    const totalPlaytime = Math.round(msPlayed / 1000 / 60 / 60) + ' hours';
    const startTime = format(new Date().setHours(label), "h aaaaa'm'");
    const endTime = format(new Date().setHours(label + 1), "h aaaaa'm'");
    return (
      <CustomToolTipWrapper>
        <h3>
          {startTime} - {endTime}
        </h3>
        <p>
          Average daily listening time: <b>{playtime}</b>
        </p>
        <p>
          Total listening time past year: <b>{totalPlaytime}</b>
        </p>
      </CustomToolTipWrapper>
    );
  } else return null;
};

export default function DaytimeRadar({ data, totalDays, angleOffset = 90 }) {
  const theme = useContext(ThemeContext);
  return (
    <div style={{ width: '100vw', height: '80vh' }}>
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          startAngle={90 + angleOffset}
          endAngle={-270 + angleOffset}
          data={data}
        >
          <PolarGrid stroke={theme.bgMDark} />
          <PolarAngleAxis
            dataKey="hour"
            stroke={theme.bgMDark}
            tick={{ fill: theme.fcLight }}
            tickFormatter={(value) =>
              value % 3 === 0
                ? format(new Date().setHours(value), "h aaaaa'm'")
                : ''
            }
            type="category"
          />
          <Radar
            dataKey="msPlayed"
            stroke={theme.accentColor}
            strokeWidth={1.5}
            fill={theme.accentColor}
            fillOpacity={0.25}
          />
          <Tooltip
            isAnimationActive={true}
            animationEasing="ease-out"
            animationDuration={200}
            content={<DaytimeActivityTT totalDays={totalDays} />}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
