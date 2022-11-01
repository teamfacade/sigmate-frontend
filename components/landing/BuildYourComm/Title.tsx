import styled from 'styled-components';
import { TextHighlight } from 'components/global';
import { HandShake } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <HandShake />
      <Text>
        <TextHighlight color="#d4fbfb">
          Build your NFT community and share your insights
        </TextHighlight>
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 36px;

  svg {
    flex: 0 0 auto;
    margin-right: 10px;
  }
`;

const Text = styled.p`
  margin: 0;
  transform: translateY(-20px);
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  z-index: 0;
`;
