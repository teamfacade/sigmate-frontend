import { memo } from 'react';
import styled from 'styled-components';
import { DrawImage } from 'public/Icons';

export default memo(function Introduction() {
  return (
    <Wrapper>
      <DrawImage />
      <PhraseWrapper>
        <Heading>Event & Draw</Heading>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text.It has roots in a piece of clasBC, making  over 2000 years old. Richard McClintock, a Latin professor at Hking  over 2000king  over 2000
        </p>
        <button type="button">visit</button>
      </PhraseWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;

  p {
    margin: 20px 0;
    max-width: 300px;
    font-size: 14px;
  }
`;

const PhraseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h3`
  margin: 0;
  color: #323c4d;
`;
