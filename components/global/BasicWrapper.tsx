import styled, { CSSProperties } from 'styled-components';
import styles from 'styles/styleLib';

const BasicWrapper = styled.div<CSSProperties>`
  max-width: ${({ maxWidth }) => maxWidth};
  margin-right: 20px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: hidden;
`;

export default BasicWrapper;
