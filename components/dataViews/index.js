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
  return (
    <>
      <h2>
        <CountUp
          prefix="Total tracks played: "
          isCounting
          end={totalTracksPlayed}
          duration={2}
        />
        <br />
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
