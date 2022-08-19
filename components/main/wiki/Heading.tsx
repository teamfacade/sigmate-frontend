import { memo } from 'react';
import styled from 'styled-components';

type PropsType = {
  content: string;
};

export default memo(function Heading({ content }: PropsType) {
  return (
    <>
      <H2>{content}</H2>
      <Hr />
    </>
  );
});

const H2 = memo(styled.h2`
  margin: 0;
  margin-bottom: 10px;
`);

const Hr = memo(styled.hr`
  margin: 0;
`);
