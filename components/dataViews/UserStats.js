import { useEffect, useState } from 'react';
import NumberWithUnit from '../util/NumberWithUnit';
import CustomLoader from './Util/CustomLoader';
import { ChartAndTitleWrapper, StatWrapper } from './Util/Util.elements';

export default function UserStats({ dataProcessor, innerRef }) {
  const [tracksSkipped, setTracksSkipped] = useState(null);
  const [tracksPlayed, setTracksPlayed] = useState(null);
  const [totalPlaytime, setTotalPlaytime] = useState(null);
  const [averagePlaytimePerDay, setAveragePlaytimePerDay] = useState(null);
  const [averageSongPlaytime, setAverageSongPlaytime] = useState(null);

  useEffect(() => {
    setTracksSkipped(dataProcessor.getTotalSkippedSongs());
    setTracksPlayed(dataProcessor.getTotalTracksPlayed());
    setTotalPlaytime(dataProcessor.getTotalPlaytime());
    setAveragePlaytimePerDay(dataProcessor.getAveragePlaytimePerDay());
    setAverageSongPlaytime(dataProcessor.getAverageSongPlaytime());
  }, []);

  if (
    !tracksSkipped ||
    !tracksPlayed ||
    !totalPlaytime ||
    !averagePlaytimePerDay ||
    !averageSongPlaytime
  ) {
    return <CustomLoader />;
  }
  return (
    <ChartAndTitleWrapper ref={innerRef} id="overview">
      <h2>Overall Stats</h2>
      <StatWrapper>
        <NumberWithUnit
          label="Listening Time"
          value={totalPlaytime}
          unit="days"
        />
        <NumberWithUnit
          label="Listening Time per Day"
          value={averagePlaytimePerDay}
          unit="hours"
        />
        <NumberWithUnit
          label="Average Song Playtime"
          value={averageSongPlaytime}
          unit="minutes"
        />
        <NumberWithUnit label="Tracks Played" value={tracksPlayed} />
        <NumberWithUnit label="Tracks Skipped" value={tracksSkipped} />
        <NumberWithUnit
          label="Tracks Skipped"
          value={tracksSkipped / tracksPlayed}
          unit="ratio"
        />
      </StatWrapper>
    </ChartAndTitleWrapper>
  );
}
