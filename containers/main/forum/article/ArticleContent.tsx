import { memo } from 'react';
import { Recommend, Infos } from 'components/main/forum/articleList';
import { Content } from 'components/main/forum/article';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type ArticleType = {
  id: number;
  category: string;
  recommend: number;
  author: string;
  tags: string[];
  timestamp: string;
  title: string;
  content: string;
  imageURL: string;
};

type PropsType = {
  article: ArticleType;
};

export default memo(function ArticleContent({ article }: PropsType) {
  return (
    <Wrapper>
      <Recommend recommend={article.recommend} />
      <div>
        <Infos
          author={article.author}
          tags={article.tags}
          timestamp={article.timestamp}
        />
        <Content
          id={article.id}
          category={article.category}
          title={article.title}
          content={article.content}
          imageURL={article.imageURL}
        />
      </div>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 720px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
`;
