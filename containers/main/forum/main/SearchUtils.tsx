import {
  memo,
  useState,
  Dispatch,
  SetStateAction,
  FormEventHandler,
} from 'react';
import styled from 'styled-components';
import { Search } from 'components/global';
import { SearchFilter } from 'components/main/forum/main';

type PropsType = {
  setFilter: Dispatch<SetStateAction<ForumSearchFilter>>;
  onSearch: FormEventHandler<HTMLFormElement>;
};

export default memo(function SearchUtils({ setFilter, onSearch }: PropsType) {
  return (
    <Wrapper>
      <SearchFilter setFilter={setFilter} />
      <Search white onSubmit={onSearch} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  margin-bottom: 18px;
`;
