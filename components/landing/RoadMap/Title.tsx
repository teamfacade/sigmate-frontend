import styled from 'styled-components';
import { TextHighlight } from 'components/global';
import { Rocket } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <Rocket />
      <Text>
        <TextHighlight color="#fffbc9">Road Map</TextHighlight>
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 31px;

  svg {
    flex: 0 0 auto;
    margin-right: 12px;
  }
`;

const Text = styled.p`
  margin: 0;
  transform: translateY(-24px);
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 700;
  line-height: 150%;
  z-index: 0;
`;
