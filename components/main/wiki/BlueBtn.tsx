import styled from 'styled-components';
import styles from 'styles/styleLib';

const BlueBtn = styled.button<{
  absoluteRight?: boolean;
  width?: string;
  margin?: string;
}>`
  position: ${({ absoluteRight }) => (absoluteRight ? 'absolute' : 'initial')};
  right: 0;
  bottom: 0;
  width: ${({ width }) => width || '125px'};
  height: 40px;
  padding: 0 6px 1px;
  margin: ${({ margin }) => margin || '0'};
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  float: right;
  cursor: pointer;
  flex: 0 0 auto;
  transition: background-color ease-in-out 300ms;

  :disabled {
    background-color: ${styles.colors.hrColor};
  }
`;

export default BlueBtn;
