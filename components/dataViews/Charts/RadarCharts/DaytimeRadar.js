import { format } from 'date-fns';
import { useContext, useState, useEffect } from 'react';
import Select from 'react-select';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
} from 'recharts';
import { ThemeContext } from 'styled-components';
import CustomLoader from '../../Util/CustomLoader';
import {
  ChartAndTitleWrapper,
  ChartWrapper,
  CustomToolTipWrapper,
  getSelectStyles,
  getSelectTheme,
  SelectWrapper,
  timeAmountConverter,
} from '../../Util/Util.elements';

const DaytimeActivityTT = ({
  active,
  payload,
  label,
  totalDays,
  filterLength,
}) => {
  if (active && payload && payload.length) {
    const msPlayed = payload[0].value;
    totalDays = (totalDays / 7) * (filterLength === 0 ? 7 : filterLength);
    const playtime = timeAmountConverter(msPlayed / 1000 / 60 / 60 / totalDays);
    const totalPlaytime = timeAmountConverter(msPlayed / 1000 / 60 / 60);
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

export default function DaytimeRadar({
  dataProcessor,
  angleOffset = 90,
  innerRef,
}) {
  const theme = useContext(ThemeContext);
  const [weekdayFilter, setWeekdayFilter] = useState([]);
  const [data, setData] = useState(null);
  const [totalDays, setTotalDays] = useState(null);

  useEffect(() => {
    setTotalDays(dataProcessor.getTotalDays());
  }, [dataProcessor]);

  useEffect(() => {
    setData(dataProcessor.getTimeslots(weekdayFilter));
  }, [weekdayFilter]);

  if (!data) {
    return <CustomLoader />;
  }

  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme);

  return (
    <ChartAndTitleWrapper ref={innerRef} id="daytimeRadar">
      <h2>Listening Activity related to Daytime</h2>
      <ChartWrapper>
        <RadarChart
          startAngle={90 + angleOffset}
          endAngle={-270 + angleOffset}
          data={data}
        >
          <PolarGrid
            stroke={theme.bgMDark}
            strokeDasharray="3 3"
            gridType="circle"
            // radialLines={false}
          />
          <PolarAngleAxis
            dataKey="hour"
            stroke={theme.bgMDark}
            tick={{ fill: theme.fcLight }}
            tickFormatter={(value) =>
              value % 3 === 0
                ? format(new Date().setHours(value), "h aaaaa'm'")
                : ''
            }
            strokeWidth={2}
            tickLine={false}
            axisLineType="circle"
            type="category"
          />
          <Radar
            dataKey="msPlayed"
            stroke={theme.accentColor}
            strokeWidth={1.5}
            fill={theme.accentColor}
            fillOpacity={0.1}
          />
          <Tooltip
            isAnimationActive={true}
            animationEasing="ease-out"
            animationDuration={200}
            content={
              <DaytimeActivityTT
                totalDays={totalDays}
                filterLength={weekdayFilter.length}
              />
            }
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
