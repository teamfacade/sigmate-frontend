import styled from 'styled-components';
import styles from 'styles/styleLib';

export default function Phrase() {
  return (
    <Wrapper>
      <LeftBorder />
      <Text>{'All you need to know\r\nabout your NFT'}</Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 32px 0;
`;

const LeftBorder = styled.div`
  flex: 0 0 auto;
  width: 10px;
  height: 64px;
  border-radius: 10px;
  background: #098fda;
`;

const Text = styled.p`
  margin: 0 0 0 24px;
  color: ${styles.colors.darkTextColor};
  font-size: 22px;
  font-weight: 500;
  line-height: 127%;
  white-space: pre;
`;
