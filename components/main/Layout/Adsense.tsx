import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

export default memo(function Adsense() {
  return <Wrapper>Google Adsense</Wrapper>;
});

const Wrapper = styled.div`
  height: 250px;
  padding: 20px;
  margin-top: 20px;
  background-color: ${styles.colors.emptyColor};
  border-radius: 8px;
`;
