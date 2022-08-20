import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  content: string;
};

export default memo(function Paragraph({ content }: PropsType) {
  return <P>{content}</P>;
});

const P = styled.p`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  line-height: 160%;
`;
