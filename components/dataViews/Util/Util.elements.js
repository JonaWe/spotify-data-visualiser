import styled from 'styled-components';

export const CustomToolTipWrapper = styled.div`
  padding: 0.15em 1em;
  border-radius: 0.35em;
  background-color: ${({ theme }) => theme.fcPrimary}C0;
  color: ${({ theme }) => theme.bgDark};
  /* backdrop-filter: blur(3px); */
  @media screen and (max-width: 768px) {
    h3 {
      font-size: 1rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`;
