import { CountUp } from 'use-count-up';
import TimeslotsRadarChart from './TimeslotsRadarChart';
import WeekdaysRadarChart from './WeekdaysRadarChart';

export default function dataViews({ rawData }) {
  const totalTracksPlayed = rawData.length;
  const totalPlaytime =
    rawData
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
  const skippedSongs = rawData.filter(
    ({ msPlayed }) => msPlayed < 5_000
  ).length;
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
      <TimeslotsRadarChart rawData={rawData} />
      <WeekdaysRadarChart rawData={rawData} />
    </>
  );
}
