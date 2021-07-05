import styled from 'styled-components';
import NumberWithUnit from '../NumberWithUnit';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.75em 5em;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export default function UserStats({ dataProcessor }) {
  const tracksPlayed = dataProcessor.getTotalTracksPlayed();
  const tracksSkipped = dataProcessor.getTotalSkippedSongs();
  return (
    <Wrapper>
      <NumberWithUnit
        label="Listening Time"
        value={dataProcessor.getTotalPlaytime()}
        unit="days"
      />
      <NumberWithUnit
        label="Listening Time per Day"
        value={dataProcessor.getAveragePlaytimePerDay()}
        unit="hours"
      />
      <NumberWithUnit
        label="Average Song Duration"
        value={dataProcessor.getAverageSongPlaytime()}
        unit="minutes"
      />
      <NumberWithUnit label="Tracks Played" value={tracksPlayed} />
      <NumberWithUnit label="Tracks Skipped" value={tracksSkipped} />
      <NumberWithUnit
        label="Tracks Skipped"
        value={tracksSkipped / tracksPlayed}
        unit="ratio"
      />
    </Wrapper>
  );
}
