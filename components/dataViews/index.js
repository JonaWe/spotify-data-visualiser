import styled from 'styled-components';
import { format } from 'date-fns';

import ActivityPastYear from './Charts/AreaCharts/ActivityPastYear';
import DataProcessor from '../../lib/DataProcessor';
import UserStats from './UserStats';
import DaytimeRadar from './Charts/RadarCharts/DaytimeRadar';
import WeekdayRadar from './Charts/RadarCharts/WeekdayRadar';
import TopArtists from './Charts/BarCharts/TopArtists';
import TopTracks from './Charts/BarCharts/TopTracks';
import UserProfile from './UserProfile';

const ChartsWrapper = styled.div`
  display: grid;
  width: inherit;
  align-items: center;
  justify-items: center;
  row-gap: 4em;
  margin-top: 4em;
`;

export default function dataViews({
  streamingHistory,
  userIdentity,
  userData,
}) {
  const dataProcessor = new DataProcessor(streamingHistory);
  const userImageUrl =
    userIdentity && userIdentity.largeImageUrl
      ? userIdentity.largeImageUrl
      : '/images/default_user.png';
  const userDisplayName =
    userIdentity && userIdentity.displayName
      ? userIdentity.displayName
      : userData.username;

  return (
    <>
      <UserProfile
        userImageUrl={userImageUrl}
        userDisplayName={userDisplayName}
      />
      <UserStats dataProcessor={dataProcessor} />
      {/* <h2>
        Account created on{' '}
        {format(new Date(userData.creationTime), 'do MMMM yyyy')}
      </h2> */}
      <ChartsWrapper>
        <ActivityPastYear dataProcessor={dataProcessor} />
        <TopArtists dataProcessor={dataProcessor} />
        <TopTracks dataProcessor={dataProcessor} />
        <DaytimeRadar dataProcessor={dataProcessor} />
        <WeekdayRadar dataProcessor={dataProcessor} />
      </ChartsWrapper>
    </>
  );
}
