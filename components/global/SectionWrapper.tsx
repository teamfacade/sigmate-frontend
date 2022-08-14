import { memo, ReactNode } from 'react';
import styled from 'styled-components';

type PropsType = {
  header: string;
  marginBottom?: string;
  children: ReactNode;
};

export default memo(function SectionWrapper({
  header,
  marginBottom,
  children,
}: PropsType) {
  return (
    <Wrapper marginBottom={marginBottom}>
      <Heading>{header}</Heading>
      <hr />
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div<{ marginBottom: string | undefined }>`
  width: 100%;

  hr {
    margin: ${({ marginBottom }) =>
      `16px 0 ${marginBottom || '30px'} 0`};
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
