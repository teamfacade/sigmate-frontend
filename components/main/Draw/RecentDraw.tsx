import { memo } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from 'components/global';

export default memo(function RecentDraw() {
  return (
    <SectionWrapper header="Recent Draw">
      <DrawsWrapper>
        {/* @todo 서버에서 draw들 배열 가져와서 map 함수로 렌더링 */}
        <Draw />
        <Draw />
        <Draw />
        <Draw />
        <Draw />
        <Draw />
      </DrawsWrapper>
    </SectionWrapper>
  );
});

const DrawsWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  overflow-x: auto;
`;

const Draw = styled.div`
  flex: 0 0 auto;
  width: 200px;
  height: 93px;
  background-color: #f7f8fa;
  border-radius: 8px;

  & + & {
    margin-left: 10px;
  }
`;
