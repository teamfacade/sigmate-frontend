import { memo } from 'react';
import styled from 'styled-components';

export default memo(function Adsense() {
  return <Wrapper>Google Adsense</Wrapper>;
});

const Wrapper = styled.div`
  height: 250px;
  margin-top: 20px;
  background-color: #ebedf1;
  border-radius: 8px;
`;
