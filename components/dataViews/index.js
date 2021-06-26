import DataProcessor from '../../lib/DataProcessor';
import TimeslotsRadarChart from './TimeslotsRadarChart';
import WeekdaysRadarChart from './WeekdaysRadarChart';
import TopArtistsChart from './TopArtistsChart';
import NumberWithUnit from '../NumberWithUnit';

export default function dataViews({ streamingHistory }) {
  const dataProcessor = new DataProcessor(streamingHistory);
  const topArtist = dataProcessor.getTopArtist();
  return (
    <>
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
        prefix={`Top Artist is '${topArtist.artistName}' with `}
        value={topArtist.msPlayed}
        unit="days"
      />
      <TopArtistsChart data={dataProcessor.getTopArtists()} />
      <TimeslotsRadarChart data={dataProcessor.getTimeslots()} />
      <WeekdaysRadarChart data={dataProcessor.getWeekdays()} />
    </>
  );
}
