import styled from 'styled-components';
import styles from 'styles/styleLib';
import { GreenClick, YellowTriangle } from 'public/Icons/landingPage';

export default function Phrases() {
  return (
    <Wrapper>
      <Logo>sigmate</Logo>
      <Divider />
      <Phrase>
        {'Maximize your\r\n'}
        <strong>NFT experience</strong>
        {' with\r\nsigmate.'}
      </Phrase>
      <GreenIcon />
      <YellowIcon />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding-right: 80px;
`;

const Logo = styled.p`
  margin: 0 0 20px 0;
  color: ${styles.colors.logoColor};
  font-size: 60px;
  font-weight: 100;
  font-family: 'Claris Sans', sans-serif;
`;

const Divider = styled.div`
  width: 43px;
  height: 6px;
  margin: 0 0 5px 0;
  border-radius: 6px;
  background-color: #3adad9;
`;

const Phrase = styled.p`
  margin: 0;
  color: #556172;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 30px;
  font-weight: 300;
  line-height: 127%;
  white-space: pre;

  strong {
    font-weight: 900;
  }
`;

const GreenIcon = styled(GreenClick)`
  position: absolute;
  bottom: 35px;
  right: 0;
`;

const YellowIcon = styled(YellowTriangle)`
  position: absolute;
  bottom: 0;
  right: 60px;
`;
