import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  title: string;
};

export default memo(function Heading({ title }: PropsType) {
  return <H1>{title}</H1>;
});

const H1 = memo(styled.h1`
  margin: 0 0 40px 0;
  color: ${styles.colors.logoColor};
  font-size: 40px;
  font-weight: bold;
  line-height: 110%;
`);
