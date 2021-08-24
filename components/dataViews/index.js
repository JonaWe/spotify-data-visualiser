import { useState } from 'react';
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
import { Waypoint } from 'react-waypoint';

const ChartsWrapper = styled.div`
  display: grid;
  width: inherit;
  align-items: center;
  justify-items: center;
  row-gap: 4em;
  margin: 1em 0 5em 0;
`;

const Status = styled.p`
  position: fixed;
  font-size: 3em;
  color: red;
  top: 0;
  left: 0;
  width: 100px;
  height: 100px;
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

  const [currentPos, setCurrentPos] = useState('overview');

  const bottomOffset = '50%';
  const topOffset = '49%';

  return (
    <>
      <UserProfile
        userImageUrl={userImageUrl}
        userDisplayName={userDisplayName}
      />
      {/* <h2>
        Account created on{' '}
        {format(new Date(userData.creationTime), 'do MMMM yyyy')}
      </h2> */}
      <ChartsWrapper>
        <Waypoint
          onEnter={() => setCurrentPos('overview')}
          // onLeave={() => setCurrentPos('none')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <UserStats dataProcessor={dataProcessor} />
        </Waypoint>

        <Waypoint
          onEnter={() => setCurrentPos('activityPastYear')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <ActivityPastYear dataProcessor={dataProcessor} />
        </Waypoint>
        <Waypoint
          onEnter={() => setCurrentPos('topArtists')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <TopArtists dataProcessor={dataProcessor} />
        </Waypoint>
        <Waypoint
          onEnter={() => setCurrentPos('topTracks')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <TopTracks dataProcessor={dataProcessor} />
        </Waypoint>
        <Waypoint
          onEnter={() => setCurrentPos('daytimeRadar')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <DaytimeRadar dataProcessor={dataProcessor} />
        </Waypoint>
        <Waypoint />
        <Waypoint
          onEnter={() => setCurrentPos('weekdayRadar')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <WeekdayRadar dataProcessor={dataProcessor} />
        </Waypoint>
        <Waypoint
          onEnter={() => setCurrentPos('songPlaytime')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <SongPlaytime dataProcessor={dataProcessor} />
        </Waypoint>
        <Waypoint
          onEnter={() => setCurrentPos('topSkippedTracks')}
          // onLeave={() => setCurrentPos('none')}
          bottomOffset={bottomOffset}
          topOffset={topOffset}
        >
          <TopSkippedTracks dataProcessor={dataProcessor} />
        </Waypoint>
      </ChartsWrapper>
    </>
  );
}
