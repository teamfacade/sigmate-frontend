import { memo } from 'react';
import styled from 'styled-components';

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
  margin: 0;
  margin-bottom: 10px;
`);

const Hr = memo(styled.hr`
  margin: 0;
`);
