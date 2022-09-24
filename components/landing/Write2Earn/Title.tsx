import styled from 'styled-components';
import { WritingHand } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <WritingHand />
      <Text>{'  Write 2 Earn System'}</Text>
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

const Text = styled.p`
  margin: 0;
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  white-space: pre;
  z-index: 0;

  ::before {
    display: block;
    position: absolute;
    bottom: 0;
    content: '';
    width: 332px;
    height: 20px;
    border-radius: 20px;
    background-color: #f7e7ff;
    z-index: -1;
  }
`;