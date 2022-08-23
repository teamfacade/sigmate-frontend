import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  content: string;
};

export default memo(function Heading({ content }: PropsType) {
  return (
    <>
      <H3>{content}</H3>
      <Hr />
    </>
  );
});

const H3 = memo(styled.h3`
  margin: 0 0 10px 0;
  color: ${styles.colors.headerColor};
  font-size: 20px;
  font-weight: bold;
  line-height: 110%;
`);

const Hr = memo(styled.hr`
  margin: 0 0 20px 0;
  color: ${styles.colors.hrColor};
`);
