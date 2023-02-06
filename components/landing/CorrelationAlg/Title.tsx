import styled from 'styled-components';
import { Correlation } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <Text>
        Correlation Algorithm for Easy Valuation
        <Correlation />
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;

const Text = styled.p`
  position: relative;
  margin: 0 0 0 20px;
  color: ${styles.colors.darkTextColor};
  font-size: 46px;
  font-weight: 700;
  line-height: 150%;

  > svg {
    position: absolute;
    left: -14px;
    transform: translateX(-100%);
  }
`;
