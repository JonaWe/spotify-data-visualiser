import { format, addDays } from 'date-fns';
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

import {
  ChartAndTitleWrapper,
  ChartWrapper,
  CustomToolTipWrapper,
} from '../../Util/Util.elements';

const WeekdayActivityTT = ({ active, payload, label, totalDays }) => {
  if (active && payload && payload.length) {
    const msPlayed = payload[0].value;
    const playtime =
      (msPlayed / 1000 / 60 / 60 / (totalDays / 7)).toFixed(1) + ' hours';
    const totalPlaytime = Math.round(msPlayed / 1000 / 60 / 60) + ' hours';
    const weekday = format(addDays(new Date(0), label + 3), 'EEEE');
    return (
      <CustomToolTipWrapper>
        <h3>{weekday}</h3>
        <p>
          Average listening time on {weekday}: <b>{playtime}</b>
        </p>
        <p>
          Total listening time past year: <b>{totalPlaytime}</b>
        </p>
      </CustomToolTipWrapper>
    );
  } else return null;
};

export default function WeekdayRadar({
  dataProcessor,
  angleOffset = (360 / 7) * 1,
}) {
  const data = dataProcessor.getWeekdays();
  const totalDays = dataProcessor.getTotalDays();
  const theme = useContext(ThemeContext);
  return (
    <ChartAndTitleWrapper>
      <h2>Listening Activity related to Weekday</h2>
      <ChartWrapper>
        <RadarChart
          startAngle={90 + angleOffset}
          endAngle={-270 + angleOffset}
          data={data}
        >
          <PolarGrid stroke={theme.bgMDark} />
          <PolarAngleAxis
            dataKey="weekday"
            stroke={theme.bgMDark}
            tick={{ fill: theme.fcLight }}
            tickFormatter={(weekday) =>
              format(addDays(new Date(0), weekday + 3), 'EEEE')
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
            content={<WeekdayActivityTT totalDays={totalDays} />}
          />
        </RadarChart>
      </ChartWrapper>
    </ChartAndTitleWrapper>
  );
}
