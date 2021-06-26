import DataProcessor from '../../lib/DataProcessor';
import TimeslotsRadarChart from './TimeslotsRadarChart';
import WeekdaysRadarChart from './WeekdaysRadarChart';
import NumberWithUnit from '../NumberWithUnit';

export default function dataViews({ streamingHistory }) {
  const dataProcessor = new DataProcessor(streamingHistory);
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
      <TimeslotsRadarChart data={dataProcessor.getTimeslots()} />
      <WeekdaysRadarChart data={dataProcessor.getWeekdays()} />
    </>
  );
}
