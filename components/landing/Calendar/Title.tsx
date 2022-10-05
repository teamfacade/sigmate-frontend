import styled from 'styled-components';
import { TextHighlight } from 'components/global';
import { CalendarIcon } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <CalendarIcon />
      <div style={{ zIndex: '0', position: 'relative' }}>
        <Text>
          <TextHighlight color="#fffbc9">Calendar</TextHighlight>
        </Text>
        <Bold>Keep you updated with upcoming drops</Bold>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  flex-wrap: wrap;
  margin-bottom: 16px;

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
`;

const Bold = styled.p`
  margin: 0;
  color: ${styles.colors.darkTextColor};
  font-size: 20px;
  font-weight: 700;
  line-height: 180%;
`;
