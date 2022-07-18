import { memo } from 'react';
import styled from 'styled-components';
import { BackerIcons } from 'public/Icons';

export default memo(function Backers() {
  return (
    <Wrapper>
      <Heading>Backer / Partners</Heading>
      <hr />
      <BackerIcons />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;

  hr {
    margin: 16px 0;
    border: none;
    border-bottom: 1px solid #dedede;
  }
`;

const Heading = styled.h3`
  margin: 0;
  color: #323c4d;
`;
