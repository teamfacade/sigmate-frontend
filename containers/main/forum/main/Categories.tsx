import { memo } from 'react';
import styled from 'styled-components';
import { Category } from 'components/main/forum/main';

type PropsType = {
  categories: Forum.CategoryType[];
};

export default memo(function Categories({ categories }: PropsType) {
  return (
    <GriddyWrapper>
      {categories.map((category) => {
        if (category.thumbnail)
          return (
            <Category
              key={category.id}
              id={category.id}
              name={category.name}
              description={category.description}
              imageURL={category.thumbnail || ''}
            />
          );
        return <div key={category.id} />;
      })}
    </GriddyWrapper>
  );
});

const GriddyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > a {
    margin: 20px 10px 0 10px;
  }
`;
