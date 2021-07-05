import styled from 'styled-components';

const ImageWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: 2em;
  align-items: center;
  text-align: center;
  margin: 4em 0;
`;

const UserName = styled.p`
  font-size: 3em;
  font-weight: 600;
  letter-spacing: 0.04em;
`;

const UserImage = styled.img`
  border-radius: 50%;
  object-fit: cover;
  width: 200px;
  height: 200px;
`;

export default function UserProfile({ userImageUrl, userDisplayName }) {
  return (
    <ImageWrapper>
      <UserImage src={userImageUrl} alt="Profile Picture" />
      <UserName>{userDisplayName}</UserName>
    </ImageWrapper>
  );
}
