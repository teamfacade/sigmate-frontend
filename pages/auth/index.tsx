import { useState } from 'react';
import styled from 'styled-components';
import { AuthComponents, AccSetup, LogoWithLinks } from 'containers/auth';

export default function AuthPage() {
  const [MoreInfo, setMoreInfo] = useState(false);

  const onClickShow = () => setMoreInfo(true);
  const onClickNotShow = () => setMoreInfo(false);

  return (
    <div style={{ height: '100vh' }}>
      <Wrapper>
        <LeftWrapper>
          {MoreInfo ? <AccSetup /> : <AuthComponents />}
        </LeftWrapper>
        <RightWrapper>
          <LogoWithLinks />
        </RightWrapper>
      </Wrapper>
      <Btn onClick={onClickShow}>Signed in with google</Btn>
      <Btn onClick={onClickNotShow}>Go Back</Btn>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap-reverse;
  position: relative;
  height: 100%;

  @media (max-width: 640px) {
    display: inline-block;
    overflow: hidden;
  }
`;

const LeftWrapper = styled.div`
  flex: 2 2 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
`;

const RightWrapper = styled.div`
  min-width: 250px;
  width: 30vw;
  height: 100%;
  background-color: #ffffff;
  border-left: 2px solid #f0f0f0;
`;

const Btn = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;

  & + & {
    margin-left: 20px;
  }
`;
