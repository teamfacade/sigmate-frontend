import styled from 'styled-components';
import { TextHighlight } from 'components/global';
import { WritingHand } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <WritingHand />
      <Text>
        <TextHighlight color="#F7E7FF">
          {'  Write 2 Earn System'}
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
    margin-right: 12px;
  }
`;

const Text = styled.span`
  margin: 0;
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  z-index: 0;
`;
