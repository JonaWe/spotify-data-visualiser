import TimeslotsRadarChart from './TimeslotsRadarChart';
import WeekdaysRadarChart from './WeekdaysRadarChart';

export default function dataViews({ rawData }) {
  return (
    <>
      <p>Total tracks played: {rawData.length}</p>
      <p>
        Total playtime:{' '}
        {(
          rawData
            .map((data) => {
              return data.msPlayed;
            })
            .reduce((acc, cur) => cur + acc, 0) /
          1000 /
          60 /
          60
        ).toFixed(1)}
      </p>
      <TimeslotsRadarChart rawData={rawData} />
      <WeekdaysRadarChart rawData={rawData} />
    </>
  );
}
