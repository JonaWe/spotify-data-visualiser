import styled from 'styled-components';

const ImageWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 2em;
  align-items: center;
  text-align: center;
  margin: 4em 0;
  @media screen and (max-width: 768px) {
    grid-auto-flow: row;
  }
`;

const UserName = styled.p`
  font-size: 3em;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin: 0;
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
