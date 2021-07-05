import { format } from 'date-fns';
import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';
import Select from 'react-select';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from 'recharts';

import {
  ChartAndTitleWrapper,
  ChartWrapper,
  CustomToolTipWrapper,
  getSelectStyles,
  getSelectTheme,
  SelectWrapper,
} from '../../Util/Util.elements';

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

const options = [
  {
    value: 1,
    label: 'Monday',
  },
  {
    value: 2,
    label: 'Tuesday',
  },
  {
    value: 3,
    label: 'Wednesday',
  },
  {
    value: 4,
    label: 'Thursday',
  },
  {
    value: 5,
    label: 'Friday',
  },
  {
    value: 6,
    label: 'Saturday',
  },
  {
    value: 0,
    label: 'Sunday',
  },
];

export default function DaytimeRadar({ dataProcessor, angleOffset = 90 }) {
  const [weekdayFilter, setWeekdayFilter] = useState([]);
  const data = dataProcessor.getTimeslots(weekdayFilter);
  const totalDays = dataProcessor.getTotalDays();
  const theme = useContext(ThemeContext);
  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme);
  return (
    <ChartAndTitleWrapper>
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
      <SelectWrapper>
        <Select
          isMulti
          isSearchable={false}
          options={options}
          onChange={(newFilter) => {
            setWeekdayFilter(newFilter.map(({ value }) => value));
          }}
          placeholder="Filter by Weekday..."
          styles={selectStyles}
          theme={selectTheme}
        />
      </SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
