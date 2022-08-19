import { memo } from 'react';
import styled from 'styled-components';

type PropsType = {
  content: string;
};

export default memo(function Heading({ content }: PropsType) {
  return (
    <>
      <H1>{content}</H1>
      <Hr />
    </>
  );
});

const H1 = memo(styled.h1`
  margin: 0;
  margin-bottom: 10px;
`);

const Hr = memo(styled.hr`
  margin: 0;
`);
