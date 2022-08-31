import { memo, MouseEventHandler } from 'react';
import { Recommend, Infos } from 'components/main/forum/articleList';
import { Content, ArticleManageBtns } from 'components/main/forum/article';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  article: ForumArticleType;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function ArticleContent({
  article,
  onClickDelete,
}: PropsType) {
  return (
    <Wrapper>
      <Recommend recommend={article.recommend} />
      <ContentWrapper>
        <Infos
          author={article.author}
          tags={article.tags}
          timestamp={article.timestamp}
        >
          <ArticleManageBtns
            category={article.category}
            articleID={article.id.toString()}
            onClickDelete={onClickDelete}
          />
        </Infos>
        <Content
          id={article.id}
          category={article.category}
          title={article.title}
          content={article.content}
          imageURL={article.imageURL}
        />
      </ContentWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
`;

const ContentWrapper = styled.div`
  border-left: 1px solid ${styles.colors.dividerColor};
`;
