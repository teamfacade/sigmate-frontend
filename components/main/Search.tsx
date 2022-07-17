import { memo } from 'react';
import styled from 'styled-components';
import { searchIcon as SearchIcon } from 'public/Icons';

export default memo(function Search() {
  return (
    <Form>
      <SearchIcon />
      <SearchBar placeholder="Search content..." />
    </Form>
  );
});

const Form = styled.form`
  display: flex;
  align-items: center;
  flex: 0 1 300px;
  padding: 7px 15px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: none;
  color: #8894a7;
  background-color: #ebedf1;
`;

const SearchBar = styled.input`
  padding-left: 5px;
  border: none;
  background-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: bold;
`;
