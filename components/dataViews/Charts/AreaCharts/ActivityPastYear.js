import { format } from 'date-fns';
import { useContext, useState } from 'react';
import Select from 'react-select';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ThemeContext } from 'styled-components';
import {
  ChartAndTitleWrapper,
  ChartWrapper,
  CustomToolTipWrapper,
  getSelectStyles,
  getSelectTheme,
  SelectWrapper,
  timeAmountConverter,
} from '../../Util/Util.elements';

const PastYearActivityTT = ({ active, payload, label, accuracy }) => {
  if (active && payload && payload.length && label) {
    const listeningTime = timeAmountConverter(payload[0].value);
    let displayTime;
    switch (accuracy) {
      case 'days':
        displayTime = format(label, 'd. MMMM yyyy');
        break;

      case 'weeks':
        displayTime = format(label, "Io 'week of' yyyy");
        break;

      case 'months':
        displayTime = format(label, 'MMMM, yyyy');
        break;
    }
    return (
      <CustomToolTipWrapper>
        <h3>{displayTime}</h3>
        <p>
          Listening time: <b>{listeningTime}</b>
        </p>
      </CustomToolTipWrapper>
    );
  } else return null;
};
const accuracyOptions = ['Days', 'Weeks', 'Months'].map((value) => ({
  label: value,
  value: value.toLowerCase(),
}));

export default function ActivityPastYear({ dataProcessor }) {
  const theme = useContext(ThemeContext);

  const [artistFilter, setArtistFilter] = useState([]);
  const [trackFilter, setTrackFilter] = useState([]);
  const [accuracy, setAccuracy] = useState('weeks');

  const allTracks = dataProcessor
    .getAllTrackNames()
    .map((name) => ({ value: name, label: name }));
  const allArtists = dataProcessor
    .getAllArtistNames()
    .map((name) => ({ value: name, label: name }));

  let data = dataProcessor.getPlaytimeOverYear(
    artistFilter,
    trackFilter,
    accuracy
  );
  if (!(data && data.length && data.length !== 0))
    data = [{ date: new Date(), hours: 0 }];

  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme);

  return (
    <ChartAndTitleWrapper>
      <h2>Activity past year</h2>
      <ChartWrapper>
        <AreaChart data={data} margin={{ left: 0, right: 30 }}>
          <CartesianGrid
            vertical={false}
            stroke={theme.bgMDark}
            strokeDasharray="3 3"
          />
          <XAxis
            tick={{ fill: theme.fcLight }}
            stroke={theme.bgMDark}
            dataKey="date"
            tickFormatter={(date) => format(date, 'MMM yy')}
          />
          <YAxis tick={{ fill: theme.fcLight }} stroke={theme.bgMDark} />
          <Tooltip
            isAnimationActive={true}
            animationEasing="ease-out"
            animationDuration={200}
            content={<PastYearActivityTT accuracy={accuracy} />}
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
            dataKey="hoursPlayed"
            stroke={theme.accentColor}
            strokeWidth={2}
            fill={'url(#linGradient)'}
            fillOpacity={1}
          />
        </AreaChart>
      </ChartWrapper>
      <SelectWrapper>
        <Select
          isMulti
          name="artists"
          options={allArtists}
          onChange={(newFilter) => {
            setArtistFilter(newFilter.map(({ value }) => value));
          }}
          placeholder="Filter by Artist..."
          noOptionsMessage={({ inputValue }) => `No result for '${inputValue}'`}
          styles={selectStyles}
          theme={selectTheme}
        />
        <Select
          isMulti
          name="tracks"
          options={allTracks}
          onChange={(newFilter) => {
            setTrackFilter(newFilter.map(({ value }) => value));
          }}
          placeholder="Filter by Tracks..."
          noOptionsMessage={({ inputValue }) => `No result for '${inputValue}'`}
          styles={selectStyles}
          theme={selectTheme}
        />
        <Select
          options={accuracyOptions}
          defaultValue={accuracyOptions[1]}
          isSearchable={false}
          styles={selectStyles}
          theme={selectTheme}
          onChange={({ value }) => {
            setAccuracy(value);
          }}
        />
      </SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
