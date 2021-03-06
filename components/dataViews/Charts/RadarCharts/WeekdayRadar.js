import { useState, useEffect } from 'react';
import { addDays, format } from 'date-fns';
import { useContext } from 'react';
import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  Tooltip,
} from 'recharts';
import { ThemeContext } from 'styled-components';
import {
  ChartAndTitleWrapper,
  ChartWrapper,
  CustomToolTipWrapper,
  timeAmountConverter,
} from '../../Util/Util.elements';
import CustomLoader from '../../Util/CustomLoader';

const WeekdayActivityTT = ({ active, payload, label, totalDays }) => {
  if (active && payload && payload.length) {
    const msPlayed = payload[0].value;
    const playtime = timeAmountConverter(
      msPlayed / 1000 / 60 / 60 / (totalDays / 7)
    );
    const totalPlaytime = timeAmountConverter(msPlayed / 1000 / 60 / 60);
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
  innerRef,
}) {
  const theme = useContext(ThemeContext);
  const [data, setData] = useState(null);
  const [totalDays, setTotalDays] = useState(null);

  useEffect(() => {
    setData(dataProcessor.getWeekdays());
    setTotalDays(dataProcessor.getTotalDays());
  }, [dataProcessor]);

  if (!data) {
    return <CustomLoader />;
  }

  return (
    <ChartAndTitleWrapper ref={innerRef} id="weekdayRadar">
      <h2>Listening Activity related to Weekday</h2>
      <ChartWrapper>
        <RadarChart
          startAngle={90 + angleOffset}
          endAngle={-270 + angleOffset}
          data={data}
        >
          <PolarGrid stroke={theme.bgMDark} strokeDasharray="3 3" />
          <PolarAngleAxis
            dataKey="weekday"
            stroke={theme.bgMDark}
            tick={{ fill: theme.fcLight }}
            tickFormatter={(weekday) =>
              format(addDays(new Date(0), weekday + 3), 'EEEE')
            }
            strokeWidth={1.5}
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
            content={<WeekdayActivityTT totalDays={totalDays} />}
          />
        </RadarChart>
      </ChartWrapper>
    </ChartAndTitleWrapper>
  );
}
