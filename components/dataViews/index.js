import { useState } from 'react';
import Image from 'next/image';

import DataProcessor from '../../lib/DataProcessor';
import ActivityPastYear from './Charts/AreaCharts/ActivityPastYear';
import NumberWithUnit from '../NumberWithUnit';
import DaytimeRadar from './Charts/RadarCharts/DaytimeRadar';
import WeekdayRadar from './Charts/RadarCharts/WeekdayRadar';
import PlaytimeBaCategory from './Charts/BarCharts/PlaytimeByCategory';

import defaultPic from '../../public/images/default_user.png';

export default function dataViews({ streamingHistory, userIdentity }) {
  const [maxArtists, setMaxArtists] = useState(10);
  const [maxSongs, setMaxSongs] = useState(10);
  const dataProcessor = new DataProcessor(streamingHistory);
  return (
    <>
      {userIdentity.largeImageUrl ? (
        <img
          src={userIdentity.largeImageUrl}
          style={{
            borderRadius: '50%',
            objectFit: 'cover',
            width: '200px',
            height: '200px',
          }}
        />
      ) : (
        <Image
          className="rounded-image" // todo use something else the a class name for styling
          src={defaultPic}
          width={200}
          height={200}
        />
      )}

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
      <ActivityPastYear dataProcessor={dataProcessor} />
      <h2>Top 10 Artists by Playtime</h2>
      <select onChange={(e) => setMaxArtists(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <PlaytimeBaCategory
        data={dataProcessor.getTopArtists(maxArtists)}
        category="artistName"
      />
      <h2>Top 10 Tracks by Playtime</h2>
      <select onChange={(e) => setMaxSongs(e.target.value)}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <PlaytimeBaCategory
        data={dataProcessor.getTopTracks(maxSongs)}
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
