import NumberWithUnit from '../NumberWithUnit';

export default function UserStats({ dataProcessor }) {
  return (
    <>
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
    </>
  );
}
