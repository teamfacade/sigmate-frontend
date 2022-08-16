import { FormEventHandler, memo } from 'react';
import styled from 'styled-components';
import { SearchIcon } from 'public/Icons/global';

type PropsType = {
  placeholder?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  transparentBg?: boolean;
};

export default memo(function Search({
  placeholder,
  onSubmit,
  transparentBg,
}: PropsType) {
  return (
    <SearchForm transparent={!!transparentBg} onSubmit={onSubmit}>
      <SearchBar
        placeholder={placeholder || 'Search...'}
        underline={!!transparentBg}
      />
      <Btn>
        <SearchIcon />
      </Btn>
    </SearchForm>
  );
});

const SearchForm = memo(styled.form<{ transparent: boolean }>`
  display: flex;
  align-items: center;
  flex: 0 1 300px;
  padding: 7px 15px;
  border-radius: 8px;
  border: none;
  background-color: ${({ transparent }) =>
    transparent ? 'transparent' : '#ebedf1'};
`);

const SearchBar = memo(styled.input<{ underline: boolean }>`
  position: relative;
  top: 2px;
  width: 120px;
  border: none;
  border-bottom: 2px solid transparent;
  background-color: transparent;
  color: #8894a7;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: bold;

  ::placeholder {
    color: #98a2b2;
  }

  :focus-visible {
    outline: none;
    border-bottom-color: ${({ underline }) =>
      underline ? '#CACBD0' : 'transparent'};
  }
`);

const Btn = styled.button`
  position: relative;
  top: 3px;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export { SearchForm, SearchBar };
