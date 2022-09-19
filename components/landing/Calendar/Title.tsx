import styled from 'styled-components';
import { CalendarIcon } from 'public/Icons/landingPage';
import styles from 'styles/styleLib';

export default function Title() {
  return (
    <Wrapper>
      <CalendarIcon />
      <div style={{ zIndex: '0', position: 'relative' }}>
        <Text>{'  Calendar'}</Text>
        <Bold>{'   Keep you updated with upcoming drops'}</Bold>
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
  white-space: pre;

  ::before {
    display: block;
    position: absolute;
    top: 24px;
    left: 4px;
    content: '';
    width: 164px;
    height: 20px;
    border-radius: 20px;
    background-color: #fffbc9;
    z-index: -1;
  }
`;

const Bold = styled.p`
  margin: 0;
  color: ${styles.colors.darkTextColor};
  font-size: 20px;
  font-weight: 700;
  line-height: 180%;
  white-space: pre;
`;
