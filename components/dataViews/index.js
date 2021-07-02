import Image from 'next/image';
import { format } from 'date-fns';

import ActivityPastYear from './Charts/AreaCharts/ActivityPastYear';
import DataProcessor from '../../lib/DataProcessor';
import NumberWithUnit from '../NumberWithUnit';
import DaytimeRadar from './Charts/RadarCharts/DaytimeRadar';
import WeekdayRadar from './Charts/RadarCharts/WeekdayRadar';
import TopArtists from './Charts/BarCharts/TopArtists';
import TopTracks from './Charts/BarCharts/TopTracks';

import defaultPic from '../../public/images/default_user.png';

export default function dataViews({
  streamingHistory,
  userIdentity,
  userData,
}) {
  const dataProcessor = new DataProcessor(streamingHistory);
  const userImage =
    userIdentity && userIdentity.largeImageUrl ? (
      <img
        src={userIdentity.largeImageUrl}
        style={{
          borderRadius: '50%',
          objectFit: 'cover',
          width: '200px',
          height: '200px',
        }}
      />
    ) : (
      <Image
        className="rounded-image" // todo use something else the a class name for styling
        src={defaultPic}
        width={200}
        height={200}
      />
    );
  const userInfo = (
    <>
      {userImage}
      {userIdentity && userIdentity.displayName ? (
        <h1>{userIdentity.displayName}</h1>
      ) : (
        <h1>{userData.username}</h1>
      )}
      <h1></h1>
    </>
  );

  return (
    <>
      {userInfo}
      <h1>Stats for the past year</h1>
      <h2>
        Account created on{' '}
        {format(new Date(userData.creationTime), 'do MMMM yyyy')}
      </h2>
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
      <ActivityPastYear dataProcessor={dataProcessor} />
      <TopArtists dataProcessor={dataProcessor} />
      <TopTracks dataProcessor={dataProcessor} />
      <DaytimeRadar dataProcessor={dataProcessor} />
      <WeekdayRadar dataProcessor={dataProcessor} />
    </>
  );
}
