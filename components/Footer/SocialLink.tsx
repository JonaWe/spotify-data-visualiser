import styled from 'styled-components';

const Link = styled.a`
  font-size: 2.5em;
  transition: all 0.15s ease-in-out;
  color: ${({ theme }) => theme.fcPrimary};
  &:hover {
    transition: all 0.15s ease-in-out;
    color: ${({ theme }) => theme.accentColor};
    transform: scale(1.2);
  }
`;

export default function SocialLink({ href, children }) {
  return (
    <Link href={href} target="_blank">
      {children}
    </Link>
  );
}
