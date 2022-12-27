import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  searched: string;
};

export default function SearchTitle({ searched }: PropsType) {
  return (
    <Wrapper>
      <SearchFor>Search for</SearchFor>
      <Searched>{searched}</Searched>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
`;

const SearchFor = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 35px;
  color: ${styles.colors.headerColor};
`;

const Searched = styled.p`
  padding: 3px 12px;
  margin: 0 0 0 12px;
  border-radius: 8px;
  background-color: ${styles.colors.emptyColor};
  font-weight: 700;
  font-size: 35px;
  color: ${styles.colors.headerColor};
`;
