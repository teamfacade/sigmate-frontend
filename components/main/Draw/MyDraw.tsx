import { memo } from 'react';
import styled from 'styled-components';
import { SectionWrapper } from 'components/global';
import MyDrawItem from './MyDrawItem';

export default memo(function MyDraw() {
  return (
    <SectionWrapper header="My Draw">
      <DrawWrapper>
        {/* @todo 서버에서 my draw 배열 받아와서 map 함수로 렌더링 */}
        <MyDrawItem
          name="#56382"
          issuer="Neon District"
          mintPrice="10.01"
          mintDate="8.05"
        />
        <MyDrawItem
          name="#56382"
          issuer="Neon District"
          mintPrice="10.01"
          mintDate="8.05"
        />
        <MyDrawItem
          name="#56382"
          issuer="Neon District"
          mintPrice="10.01"
          mintDate="8.05"
        />
        <MyDrawItem
          name="#56382"
          issuer="Neon District"
          mintPrice="10.01"
          mintDate="8.05"
        />
        <MyDrawItem
          name="#56382"
          issuer="Neon District"
          mintPrice="10.01"
          mintDate="8.05"
        />
        <MyDrawItem
          name="#56382"
          issuer="Neon District"
          mintPrice="10.01"
          mintDate="8.05"
        />
      </DrawWrapper>
    </SectionWrapper>
  );
});

const DrawWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1000px;
  flex-wrap: wrap;
`;
