import { memo } from 'react';
import styled from 'styled-components';

type PropsType = {
  content: string;
};

export default memo(function Paragraph({ content }: PropsType) {
  return <P>{content}</P>;
});

const P = styled.p`
  margin: 0;
`;
