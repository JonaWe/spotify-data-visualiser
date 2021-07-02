import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';
import { format } from 'date-fns';
import Select from 'react-select';

import { CustomToolTipWrapper } from '../../Util/Util.elements';
import { red } from 'colorette';

const PastYearActivityTT = ({ active, payload, label }) => {
  if (active && payload && payload.length && label) {
    const displayTime = format(label, 'MMMM, yyyy');
    let listeningTime = payload[0].value;
    listeningTime = `${
      listeningTime < 1
        ? Math.round(listeningTime * 60)
        : listeningTime < 15
        ? listeningTime.toFixed(1)
        : Math.round(listeningTime)
    } ${listeningTime < 1 ? 'minutes' : 'hours'}`;
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

export default function ActivityPastYear({ dataProcessor }) {
  const theme = useContext(ThemeContext);

  const [artistFilter, setArtistFilter] = useState([]);
  const [trackFilter, setTrackFilter] = useState([]);

  const allTracks = dataProcessor
    .getAllTrackNames()
    .map((name) => ({ value: name, label: name }));
  const allArtists = dataProcessor
    .getAllArtistNames()
    .map((name) => ({ value: name, label: name }));

  let data = dataProcessor.getPlaytimeOverYear(artistFilter, trackFilter);
  if (!(data && data.length && data.length !== 0))
    data = [{ date: new Date(), hours: 0 }];

  const selectTheme = (t) => ({
    ...t,
    colors: {
      ...t.colors,
      primary: theme.accentColor + 'BF',
      primary75: theme.accentColor + 'BF',
      primary50: theme.accentColor + '80',
      primary25: theme.accentColor + '40',
      danger: theme.dangerColor + 'ff',
      dangerLight: theme.dangerColor + '00',
    },
  });

  const selectStyles = {
    container: (provided, state) => ({
      ...provided,
      color: theme.bgPrimary,
      maxWidth: '400px',
      minWidth: '200px',
    }),
  };

  return (
    <>
      <h2>Activity past year</h2>
      <div style={{ width: '60vw', height: '80vh' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
              content={<PastYearActivityTT />}
            />
            <defs>
              <linearGradient id="linGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={theme.accentColor}
                  stopOpacity={0.2}
                />
                <stop
                  offset="100%"
                  stopColor={theme.bgPrimary}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="hours"
              stroke={theme.accentColor}
              strokeWidth={2}
              fill={'url(#linGradient)'}
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', columnGap: '2em' }}>
        <Select
          isMulti
          name="artists"
          options={allArtists}
          onChange={(newFilter) => {
            setArtistFilter(newFilter.map(({ value }) => value));
          }}
          placeholder="Filter by Artist..."
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
          styles={selectStyles}
          theme={selectTheme}
        />
      </div>
    </>
  );
}
