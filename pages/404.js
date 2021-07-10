import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Button, CenterdGridWrapper, MainWrapper } from '../components/util';

const Heading = styled.h1`
  font-size: 4em;
  text-align: center;
  letter-spacing: 0.03em;
  margin: 0;
`;
const SubHeading = styled.h2`
  color: ${(props) => props.theme.fcULight};
  font-size: 2em;
  font-weight: 100;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  text-align: center;
  margin: 0 0 0.5em 0;
`;

export default function FourOFour() {
  return (
    <MainWrapper>
      <Head>
        <title>404 - Page not Found</title>
      </Head>
      <CenterdGridWrapper style={{ minHeight: 'inherit' }}>
        <CenterdGridWrapper>
          <Heading>404</Heading>
          <SubHeading>Page not Found</SubHeading>
          <Link href="/">
            <Button primary>Home</Button>
          </Link>
        </CenterdGridWrapper>
      </CenterdGridWrapper>
    </MainWrapper>
  );
}
