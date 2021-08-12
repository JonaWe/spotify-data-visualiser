import styled from 'styled-components';

const SideNavbarWrapper = styled.div`
  z-index: 1000;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  margin-right: 30px;

  display: grid;
  align-items: center;
  justify-content: center;
`;

const SideNavbarMain = styled.nav`
  background-color: ${(props) => props.theme.bgDark};
  border-radius: 7px;
  padding: 1em 1em 1em 1em;
  padding: 3em 2em;
`;

const SideNavbarLinkWrapper = styled.ul`
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const SideNavbarLink = styled.a`
  display: inline-block;
  padding: 0.5em 0.5em;
  font-size: 1.25em;
  text-decoration: none;
  border-left: 3px solid
    ${(props) =>
      props.active ? props.theme.accentColor : props.theme.fcULight};
  color: ${(props) =>
    props.active ? props.theme.accentColor : props.theme.fcLight};
  transition: color 0.25s ease, border-left-color 0.25s ease;

  &:hover {
    color: ${(props) =>
      props.active ? props.theme.accentColor : props.theme.fcPrimary};
    border-left: 3px solid
      ${(props) =>
        props.active ? props.theme.accentColor : props.theme.fcPrimary};
  }
`;

const sections = [
  { name: 'Overview', id: 'overview' },
  { name: 'Activity Past Year', id: 'activityPastYear' },
  { name: 'Top Artists', id: 'topArtists' },
  { name: 'Top Tracks', id: 'topTracks' },
  { name: 'Daily Activity', id: 'daytimeRadar' },
  { name: 'Weekday Activity', id: 'weekdayRadar' },
  { name: 'Song Playtime', id: 'songPlaytime' },
  { name: 'Top Skipped Tracks', id: 'topSkippedTracks' },
];

export default function SideNavbar({ activeElement, updateActiveElement }) {
  return (
    <SideNavbarWrapper>
      <SideNavbarMain>
        <SideNavbarLinkWrapper>
          {sections.map(({ name, id }) => {
            return (
              <ListItem>
                <SideNavbarLink
                  key={id}
                  href={`#${id}`}
                  active={activeElement === id}
                  onClick={() => updateActiveElement(id)} // not necessary due to smooth scroll
                >
                  {name}
                </SideNavbarLink>
              </ListItem>
            );
          })}
        </SideNavbarLinkWrapper>
      </SideNavbarMain>
    </SideNavbarWrapper>
  );
}
