import { useContext, useState, useEffect } from 'react';
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
import CustomLoader from '../../Util/CustomLoader';
import {
  ChartAndTitleWrapper,
  ChartWrapper,
  CustomToolTipWrapper,
  getSelectStyles,
  getSelectTheme,
  SelectWrapper,
} from '../../Util/Util.elements';

const SongPlaytimeTT = ({ active, payload, label: seconds }) => {
  if (active && payload && payload.length && seconds !== undefined) {
    const amount = (payload[0].value * 100).toFixed(2);
    const displayTime =
      seconds < 60
        ? `${seconds} seconds`
        : seconds % 60 === 0
        ? `${Math.floor(seconds / 60)} minutes`
        : `${Math.floor(seconds / 60)} minutes ${seconds % 60} seconds`;
    return (
      <CustomToolTipWrapper>
        <h3>{displayTime}</h3>
        <p>
          Playing: <b>{amount}%</b>
        </p>
      </CustomToolTipWrapper>
    );
  } else return null;
};
const accuracyOptions = ['Days', 'Weeks', 'Months'].map((value) => ({
  label: value,
  value: value.toLowerCase(),
}));

export default function SongPlaytime({ dataProcessor, innerRef }) {
  const theme = useContext(ThemeContext);

  const [artistFilter, setArtistFilter] = useState([]);
  const [trackFilter, setTrackFilter] = useState([]);
  const [data, setData] = useState(null);
  const [allTracks, setAllTracks] = useState(null);
  const [allArtists, setAllArtists] = useState(null);

  useEffect(() => {
    setData(dataProcessor.getSongPlaytime(artistFilter, trackFilter));
  }, [artistFilter, trackFilter]);

  useEffect(() => {
    setAllTracks(
      dataProcessor
        .getAllTrackNames()
        .slice(0, 100)
        .map((name) => ({ value: name, label: name }))
    );
    setAllArtists(
      dataProcessor
        .getAllArtistNames()
        .slice(0, 100)
        .map((name) => ({ value: name, label: name }))
    );
  }, [dataProcessor]);

  if (!data || !allArtists || !allTracks) {
    return <CustomLoader />;
  }

  const selectTheme = getSelectTheme(theme);
  const selectStyles = getSelectStyles(theme);

  return (
    <ChartAndTitleWrapper ref={innerRef} id="songPlaytime">
      <h2>Song Playtime</h2>
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
            dataKey="secondsPlayed"
            type="number"
            scale="time"
          />
          <YAxis
            tick={{ fill: theme.fcLight }}
            stroke={theme.bgMDark}
            tickFormatter={(percentage) => `${percentage * 100}%`}
          />
          <Tooltip
            isAnimationActive={true}
            animationEasing="ease-out"
            animationDuration={200}
            content={<SongPlaytimeTT />}
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
            dataKey="percentage"
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
          options={allTracks}
          onChange={(newFilter) => {
            setTrackFilter(newFilter.map(({ value }) => value));
          }}
          placeholder="Filter by Tracks..."
          noOptionsMessage={({ inputValue }) => `No result for '${inputValue}'`}
          styles={selectStyles}
          theme={selectTheme}
        />
      </SelectWrapper>
    </ChartAndTitleWrapper>
  );
}
