import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

const Header = memo(styled.h2`
  margin: 50px 0 15px 0;
  color: ${styles.colors.logoColor};
  font-size: 18px;
  font-weight: bold;
  white-space: pre;
`);

export { Header };
