import { memo } from 'react';
import styled from 'styled-components';
import { Block } from './index';

type PropsType = {
  title: string;
  onClickSelect: (id: number, tag: string) => void;
};

export default memo(function Heading({ title, onClickSelect }: PropsType) {
  return (
    <Block id={0} onClickSelect={onClickSelect} isTitle>
      <H1>{title}</H1>
    </Block>
  );
});

const H1 = memo(styled.h1`
  margin: 0 0 40px 0;
`);
