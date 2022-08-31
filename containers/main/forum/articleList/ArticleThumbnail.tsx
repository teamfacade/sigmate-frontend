import { memo } from 'react';
import styled from 'styled-components';
import { Recommend, Infos, Content } from 'components/main/forum/articleList';
import styles from 'styles/styleLib';

type PropsType = {
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

export default memo(function ArticleThumbnail({
  id,
  category,
  recommend,
  author,
  tags,
  timestamp,
  title,
  content,
  imageURL,
}: PropsType) {
  return (
    <Wrapper>
      <Recommend recommend={recommend} />
      <ContentWrapper>
        <Infos author={author} tags={tags} timestamp={timestamp} />
        <Content
          id={id}
          category={category}
          title={title}
          content={content}
          imageURL={imageURL}
        />
      </ContentWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 340px;
  margin-top: 18px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
`;

const ContentWrapper = styled.div`
  width: 100%;
  border-left: 1px solid ${styles.colors.dividerColor};
`;
