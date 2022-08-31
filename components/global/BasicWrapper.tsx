import styled, { CSSProperties } from 'styled-components';
import styles from 'styles/styleLib';

const BasicWrapper = styled.div<CSSProperties>`
  max-width: ${({ maxWidth }) => maxWidth};
  padding: 40px;
  margin: ${({ margin }) => margin};
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: hidden;
`;

export default BasicWrapper;
