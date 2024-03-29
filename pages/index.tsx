import styled from 'styled-components';
import {
  Introduction,
  CorrelationAlg,
  Wikis,
  Calendar,
  Forum,
  GoUpBtn,
} from 'containers/landing';
import styles from 'styles/styleLib';

export default function MyApp() {
  return (
    <Wrapper>
      <Introduction />
      <Wikis />
      <Calendar />
      <Forum />
      <CorrelationAlg />
      <GoUpBtn />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  background-color: ${styles.colors.landingBlue};
`;
