import { memo } from 'react';
import styled from 'styled-components';
import { CatchPhrase, Members } from 'containers/main/landing';

export default memo(function MainPage() {
  return (
    <Wrapper>
      <CatchPhrase />
      <Members />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  > div + div {
    margin-top: 20px;
  }
`;
