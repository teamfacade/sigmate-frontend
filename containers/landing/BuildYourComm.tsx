import styled from 'styled-components';
import { Title, InfoTable } from 'components/landing/BuildYourComm';

export default function BuildYourComm() {
  return (
    <Wrapper>
      <Title />
      <InfoTable
        title="Threads"
        description={
          'Threads is where you can create and write your own personal post about any kind of subject.\r\nSigmate has divided several categories of NFT, and each category acts as a community.'
        }
      />
      <InfoTable
        title="Opinion"
        description="Users can exchange opinions about the article in this section. Discussion and debate concerning crypto projects are allowed. Experts can share their view. If you don’t feel like editing, just simply share your opinion!"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 42px 72px 112px;
  background-color: #ffffff;
`;
