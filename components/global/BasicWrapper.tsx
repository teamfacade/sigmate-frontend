import styled, { CSSProperties } from 'styled-components';
import colors from '../../styles/colorLib';

const BasicWrapper = styled.div<CSSProperties>`
  max-width: ${({ maxWidth }) => maxWidth};
  margin-right: 20px;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 ${colors.containerShadow};
  overflow: hidden;
`;

export default BasicWrapper;
