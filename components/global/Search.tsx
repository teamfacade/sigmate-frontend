import { FormEventHandler, memo } from 'react';
import styled from 'styled-components';
import { SearchIcon } from 'public/Icons/global';
import styles from 'styles/styleLib';

type PropsType = {
  width?: string;
  placeholder?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  white?: boolean;
};

export default memo(function Search({
  width,
  placeholder,
  onSubmit,
  white,
}: PropsType) {
  return (
    <SearchForm width={width} white={!!white} onSubmit={onSubmit}>
      <SearchBar name="bar" placeholder={placeholder || 'Search...'} />
      <Btn>
        <SearchIcon />
      </Btn>
    </SearchForm>
  );
});

const SearchForm = memo(styled.form<{ width: string; white: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 0 1 300px;
  width: ${({ width }) => width || 'initial'};
  padding: 0 0 0 15px;
  border-radius: 8px;
  border: 1px solid
    ${({ white }) => (white ? styles.colors.lightBorderColor : 'transparent')};
  background-color: ${({ white }) =>
    white ? '#FFFFFF' : styles.colors.emptyColor};
`);

const SearchBar = memo(styled.input`
  position: relative;
  top: 2px;
  width: 100%;
  padding: 7px 0;
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
  }
`);

const Btn = styled.button`
  padding: 7px 14px 7px 11px;
  background-color: ${styles.colors.emphColor};
  border: none;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  cursor: pointer;

  svg {
    path {
      fill: #ffffff;
    }
  }
`;

export { SearchForm, SearchBar };
