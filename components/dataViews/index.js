import Image from 'next/image';
import DataProcessor from '../../lib/DataProcessor';
import TimeslotsRadarChart from './TimeslotsRadarChart';
import WeekdaysRadarChart from './WeekdaysRadarChart';
import Top10BarChart from './Top10BarChart';
import ActivityPastYear from './ActivityPastYear';
import NumberWithUnit from '../NumberWithUnit';

export default function dataViews({ streamingHistory, userIdentity }) {
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
      <ActivityPastYear data={dataProcessor.getPlaytimeOverYear()} />
      <h2>Top 10 Artists by Playtime</h2>
      <Top10BarChart
        data={dataProcessor.getTopArtists()}
        dataKey="artistName"
      />
      <h2>Top 10 Tracks by Playtime</h2>
      <Top10BarChart data={dataProcessor.getTopTracks()} dataKey="trackName" />
      <h2>Listening Activity related to Daytime</h2>
      <TimeslotsRadarChart
        data={dataProcessor.getTimeslots()}
        totalDays={dataProcessor.getTotalDays()}
      />
      <h2>Listening Activity related to Weekday</h2>
      <WeekdaysRadarChart data={dataProcessor.getWeekdays()} />
    </>
  );
}
