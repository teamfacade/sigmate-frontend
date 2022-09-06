import { memo } from 'react';
import styled from 'styled-components';
import { Category } from 'components/main/forum/main';

type PropsType = {
  categories: Forum.CategoryType[];
};

export default memo(function Categories({ categories }: PropsType) {
  return (
    <Wrapper>
      {categories.map((category) => (
        <Category
          key={category.id}
          id={category.id}
          name={category.name}
          description={category.description}
          imageURL={category.imageURL}
        />
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: grid;
  gap: 18px;
  /* grid-template-columns: repeat(auto-fill, minmax(340px, auto)); */
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 234px;
`;
