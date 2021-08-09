import { useContext } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ThemeContext } from 'styled-components';
import {
  ChartWrapper,
  CustomToolTipWrapper,
  timeAmountConverter,
} from '../../Util/Util.elements';

const PlayTimeByCategoryTT = ({
  active,
  payload,
  label,
  category,
  dataKey,
}) => {
  if (active && payload && payload.length) {
    let value = payload[0].value;
    if (dataKey === 'hoursPlayed') value = timeAmountConverter(value);
    const valueDescription =
      dataKey === 'hoursPlayed' ? 'Total playtime: ' : 'Total times skipped: ';
    return (
      <CustomToolTipWrapper>
        <h3>{label}</h3>
        {category === 'trackName' && (
          <p>
            Artist: <b>{payload[0].payload.artistName}</b>
          </p>
        )}
        <p>
          {valueDescription}
          <b>{value}</b>
        </p>
      </CustomToolTipWrapper>
    );
  } else return null;
};

export default function PlaytimeByCategory({ data, category, dataKey }) {
  const theme = useContext(ThemeContext);
  return (
    <ChartWrapper>
      <BarChart data={data} margin={{ left: 0, right: 30 }}>
        <CartesianGrid
          vertical={false}
          stroke={theme.bgMDark}
          strokeDasharray="3 3"
        />
        <XAxis
          tick={{ fill: theme.fcLight }}
          stroke={theme.bgMDark}
          dataKey={category}
          type="category"
        />
        <YAxis
          type="number"
          tick={{ fill: theme.fcLight }}
          stroke={theme.bgMDark}
        />
        <Tooltip
          cursor={{ fill: theme.accentColor, fillOpacity: 0.1 }}
          isAnimationActive={true}
          animationEasing="ease-out"
          animationDuration={200}
          content={
            <PlayTimeByCategoryTT category={category} dataKey={dataKey} />
          }
        />
        <Legend
          formatter={(value) => (
            <span style={{ color: theme.accentColor }}>{value}</span>
          )}
        />
        <defs>
          <linearGradient id="linGradient2" x1="0" y1="0" x2="1" y2="1">
            <stop
              offset="10%"
              stopColor={theme.accentColor}
              stopOpacity={0.9}
            />
            <stop
              offset="90%"
              stopColor={theme.accentColor}
              stopOpacity={0.65}
            />
          </linearGradient>
        </defs>
        <Bar
          name="Hours spent listening"
          dataKey={dataKey}
          fill="url(#linGradient2)"
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ChartWrapper>
  );
}
