import { memo } from 'react';
import styled from 'styled-components';
import { Search } from 'components/global';
import styles from 'styles/styleLib';

export default memo(function SearchUtils() {
  return (
    <Wrapper>
      <Search white />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 18px;
`;
