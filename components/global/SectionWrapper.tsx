import { memo, ReactNode } from 'react';
import styled from 'styled-components';

type PropsType = {
  header: string;
  children: ReactNode;
};

export default memo(function SectionWrapper({ header, children }: PropsType) {
  return (
    <Wrapper>
      <Heading>{header}</Heading>
      <hr />
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;

  hr {
    margin: 16px 0 30px 0;
    border: none;
    border-bottom: 1px solid #dedede;
  }

  & + & {
    margin-top: 50px;
  }
`;

const Heading = styled.h3`
  margin: 0;
  color: #323c4d;
`;
