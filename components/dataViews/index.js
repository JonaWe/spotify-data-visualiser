import styled from 'styled-components';
import DataProcessor from '../../lib/DataProcessor';
import ActivityPastYear from './Charts/AreaCharts/ActivityPastYear';
import SongPlaytime from './Charts/AreaCharts/SongPlaytime';
import TopArtists from './Charts/BarCharts/TopArtists';
import TopSkippedTracks from './Charts/BarCharts/TopSkippedTracks';
import TopTracks from './Charts/BarCharts/TopTracks';
import DaytimeRadar from './Charts/RadarCharts/DaytimeRadar';
import WeekdayRadar from './Charts/RadarCharts/WeekdayRadar';
import UserProfile from './UserProfile';
import UserStats from './UserStats';

const ChartsWrapper = styled.div`
  display: grid;
  width: inherit;
  align-items: center;
  justify-items: center;
  row-gap: 4em;
  margin: 1em 0 5em 0;
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
      <ChartsWrapper>
        <UserStats dataProcessor={dataProcessor} />
        <ActivityPastYear dataProcessor={dataProcessor} />
        <TopArtists dataProcessor={dataProcessor} />
        <TopTracks dataProcessor={dataProcessor} />
        <DaytimeRadar dataProcessor={dataProcessor} />
        <WeekdayRadar dataProcessor={dataProcessor} />
        <SongPlaytime dataProcessor={dataProcessor} />
        <TopSkippedTracks dataProcessor={dataProcessor} />
      </ChartsWrapper>
    </>
  );
}
