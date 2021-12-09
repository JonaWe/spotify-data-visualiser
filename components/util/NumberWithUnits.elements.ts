import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
`;

export const Value = styled.p`
  font-weight: 600;
  font-size: 1.75em;
  letter-spacing: 0.05em;
  color: ${(props) => props.theme.fcPrimary};
  margin: 0 0 0.15em 0;
`;

export const Label = styled.p`
  font-weight: 100;
  letter-spacing: 0.03em;
  color: ${(props) => props.theme.fcLight};
  margin: 0;
  text-transform: uppercase;
`;
