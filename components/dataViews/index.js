import Image from 'next/image';
import styled from 'styled-components';
import { format } from 'date-fns';

import ActivityPastYear from './Charts/AreaCharts/ActivityPastYear';
import DataProcessor from '../../lib/DataProcessor';
import UserStats from './UserStats';
import DaytimeRadar from './Charts/RadarCharts/DaytimeRadar';
import WeekdayRadar from './Charts/RadarCharts/WeekdayRadar';
import TopArtists from './Charts/BarCharts/TopArtists';
import TopTracks from './Charts/BarCharts/TopTracks';

import defaultPic from '../../public/images/default_user.png';

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  background-color: ${(props) => props.theme.bgMDark};
  border-radius: 10vh;
  text-align: center;
`;

const UserName = styled.p`
  font-size: 2em;
`;

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
          width: '150px',
          height: '150px',
        }}
      />
    ) : (
      <Image
        className="rounded-image" // todo use something else the a class name for styling
        src={defaultPic}
        width={150}
        height={150}
      />
    );
  const userInfo = (
    <ImageWrapper>
      {userImage}
      {userIdentity && userIdentity.displayName ? (
        <UserName>{userIdentity.displayName}</UserName>
      ) : (
        <UserName>{userData.username}</UserName>
      )}
    </ImageWrapper>
  );

  return (
    <>
      {userInfo}
      {/* <h2>
        Account created on{' '}
        {format(new Date(userData.creationTime), 'do MMMM yyyy')}
      </h2> */}
      <UserStats dataProcessor={dataProcessor} />
      <ActivityPastYear dataProcessor={dataProcessor} />
      <TopArtists dataProcessor={dataProcessor} />
      <TopTracks dataProcessor={dataProcessor} />
      <DaytimeRadar dataProcessor={dataProcessor} />
      <WeekdayRadar dataProcessor={dataProcessor} />
    </>
  );
}
