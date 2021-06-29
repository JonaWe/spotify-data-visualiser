import { useState, useRef } from 'react';

import DataProcessor from '../../lib/DataProcessor';
import ActivityPastYear from './Charts/AreaCharts/ActivityPastYear';
import NumberWithUnit from '../NumberWithUnit';
import DaytimeRadar from './Charts/RadarCharts/DaytimeRadar';
import WeekdayRadar from './Charts/RadarCharts/WeekdayRadar';
import PlaytimeBaCategory from './Charts/BarCharts/PlaytimeByCategory';

export default function dataViews({ streamingHistory, userIdentity }) {
  const [maxArtists, setMaxArtists] = useState(10);
  const [artistFilter, setArtistFilter] = useState([]);
  const [songFilter, setSongFilter] = useState([]);
  const artistFilterRef = useRef(null);
  const songFilterRef = useRef(null);
  const dataProcessor = new DataProcessor(streamingHistory);
  return (
    <>
      <img
        src={userIdentity.largeImageUrl}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          width: '200px',
          height: '200px',
        }}
      />
      <h1>{userIdentity.displayName}</h1>
      <h1>Stats for the past year</h1>
      <NumberWithUnit
        prefix="Total playtime: "
        value={dataProcessor.getTotalPlaytime()}
        unit="days"
      />
      <NumberWithUnit
        prefix="Total tracks played: "
        value={dataProcessor.getTotalTracksPlayed()}
      />
      <NumberWithUnit
        prefix="Average playtime per song: "
        value={dataProcessor.getAverageSongPlaytime()}
        unit="minutes"
      />
      <NumberWithUnit
        prefix="Songs skipped: "
        value={dataProcessor.getTotalSkippedSongs()}
      />
      <NumberWithUnit
        prefix={`Top Artist is '${
          dataProcessor.getTopArtist().artistName
        }' with a playtime of `}
        value={dataProcessor.getTopArtist().msPlayed}
        unit="days"
      />
      <NumberWithUnit
        prefix="Average playtime per day: "
        value={dataProcessor.getAveragePlaytimePerDay()}
        unit="hours"
      />
      <h2>Activity past year</h2>
      <h3>Artist Filter</h3>
      <input ref={artistFilterRef} />
      <button
        onClick={() => {
          const value = artistFilterRef.current.value;
          const newFilter = [];
          if (value !== '') newFilter.push(value);

          setArtistFilter(newFilter);
        }}
      >
        Update
      </button>
      <h3>Song Filter</h3>
      <input ref={songFilterRef} />
      <button
        onClick={() => {
          const value = songFilterRef.current.value;
          const newFilter = [];
          if (value !== '') newFilter.push(value);

          setSongFilter(newFilter);
        }}
      >
        Update
      </button>
      <ActivityPastYear
        data={dataProcessor.getPlaytimeOverYear(artistFilter, songFilter)}
      />
      <h2>Top 10 Artists by Playtime</h2>
      <input
        type="number"
        defaultValue={10}
        onInput={(e) => setMaxArtists(e.target.value)}
        // onChange={(e) => setMaxArtists(e.target.value)}
      />
      <PlaytimeBaCategory
        data={dataProcessor.getTopArtists(maxArtists)}
        category="artistName"
      />
      <h2>Top 10 Tracks by Playtime</h2>
      <PlaytimeBaCategory
        data={dataProcessor.getTopTracks()}
        category="trackName"
      />
      <h2>Listening Activity related to Daytime</h2>
      <DaytimeRadar
        data={dataProcessor.getTimeslots()}
        totalDays={dataProcessor.getTotalDays()}
      />
      <h2>Listening Activity related to Weekday</h2>
      <WeekdayRadar
        data={dataProcessor.getWeekdays()}
        totalDays={dataProcessor.getTotalDays()}
      />
    </>
  );
}
