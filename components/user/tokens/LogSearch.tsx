import { memo } from 'react';
import styled from 'styled-components';
import { SearchForm, SearchBar } from 'components/global/Search';
import { searchIcon as SearchIcon } from 'public/Icons';

export default memo(function LogSearch() {
  return (
    <Form>
      <SearchIcon />
      <Bar placeholder="Search content..." />
    </Form>
  );
});

const Form = styled(SearchForm)`
  margin-bottom: 0;
  background-color: transparent;
  border-radius: 0;

  svg {
    position: relative;
    top: -3px;
  }
`;

const Bar = styled(SearchBar)`
  position: relative;
  top: -2px;
  border-bottom: 1px solid transparent;

  :focus-visible {
    border-bottom: 1px solid #8894a7;
  }
`;
