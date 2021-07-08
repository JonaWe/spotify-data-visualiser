import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styled from 'styled-components';

const Link = styled.a`
  transition: all 0.15s ease-in-out;
  color: ${({ theme }) => theme.fcPrimary};
  &:hover {
    transition: all 0.15s ease-in-out;
    color: ${({ theme }) => theme.accentColor};
    transform: scale(1.2);
  }
`;

export default function SocialLink({ href, icon }) {
  return (
    <Link href={href} target="_blank">
      <FontAwesomeIcon width={35} height={35} icon={icon} />
    </Link>
  );
}
