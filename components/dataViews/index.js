import { CountUp } from 'use-count-up';
import DataProcessor from '../../lib/DataProcessor';
import TimeslotsRadarChart from './TimeslotsRadarChart';
import WeekdaysRadarChart from './WeekdaysRadarChart';

export default function dataViews({ streamingHistory }) {
  const totalTracksPlayed = streamingHistory.length;
  const totalPlaytime =
    streamingHistory
      .map((data) => {
        return data.msPlayed;
      })
      .reduce((acc, cur) => cur + acc, 0) /
    1000 /
    60 /
    60;
  const averagePlaytimePerSong = (
    (totalPlaytime * 60) /
    totalTracksPlayed
  ).toFixed(2);
  const skippedSongs = streamingHistory.filter(
    ({ msPlayed }) => msPlayed < 5_000
  ).length;
  const dataProcessor = new DataProcessor(streamingHistory);
  return (
    <>
      <h1>Files have been processed</h1>
      <h2>Average playtime per song: {averagePlaytimePerSong} minutes</h2>
      <h2>Songs skipped: {skippedSongs}</h2>
      <h2>
        <CountUp
          prefix="Total tracks played: "
          isCounting
          end={totalTracksPlayed}
          duration={2}
        />
      </h2>
      <h2>
        <CountUp
          prefix="Total playtime: "
          suffix=" hours"
          isCounting
          end={totalPlaytime}
          duration={2}
          decimalPlaces={1}
        />
      </h2>
      <TimeslotsRadarChart data={dataProcessor.getTimeslots()} />
      <WeekdaysRadarChart data={dataProcessor.getTimeslots()} />
    </>
  );
}
