import { useEffect, useState, MutableRefObject } from 'react';
import DataProcessor from '../../lib/DataProcessor';
import NumberWithUnit, { Unit } from '../util/NumberWithUnit';
import CustomLoader from './Util/CustomLoader';
import { ChartAndTitleWrapper, StatWrapper } from './Util/Util.elements';

interface UserStatProps {
  dataProcessor: DataProcessor;
}

export default function UserStats({ dataProcessor }: UserStatProps) {
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
    <ChartAndTitleWrapper id="overview">
      <h2>Overall Stats</h2>
      <StatWrapper>
        <NumberWithUnit
          label="Listening Time"
          value={totalPlaytime}
          unit={Unit.DAYS}
          decimalPlaces={1}
        />
        <NumberWithUnit
          label="Listening Time per Day"
          value={averagePlaytimePerDay}
          unit={Unit.HOURS}
          decimalPlaces={1}
        />
        <NumberWithUnit
          label="Average Song Playtime"
          value={averageSongPlaytime}
          unit={Unit.MINUTES}
          decimalPlaces={1}
        />
        <NumberWithUnit
          label="Tracks Played"
          value={tracksPlayed}
          decimalPlaces={0}
        />
        <NumberWithUnit
          label="Tracks Skipped"
          value={tracksSkipped}
          decimalPlaces={0}
        />
        <NumberWithUnit
          label="Tracks Skipped"
          value={tracksSkipped / tracksPlayed}
          unit={Unit.RATIO}
          decimalPlaces={1}
        />
      </StatWrapper>
    </ChartAndTitleWrapper>
  );
}
