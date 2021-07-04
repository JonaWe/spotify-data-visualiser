import { format } from 'date-fns';
import { ThemeContext } from 'styled-components';
import { useContext } from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts';

import { ChartWrapper, CustomToolTipWrapper } from '../../Util/Util.elements';

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

export default function DaytimeRadar({ dataProcessor, angleOffset = 90 }) {
  const data = dataProcessor.getTimeslots();
  const totalDays = dataProcessor.getTotalDays();
  const theme = useContext(ThemeContext);
  return (
    <>
      <h2>Listening Activity related to Daytime</h2>
      <ChartWrapper>
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
      </ChartWrapper>
    </>
  );
}
