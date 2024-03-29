import { memo } from 'react';
import styled from 'styled-components';
import { Recommend, Infos, Content } from 'components/main/forum/articleList';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  category: string;
  votes?: Forum.VoteType;
  author: string;
  username: string;
  tags: any[];
  timestamp: string;
  title: string;
  content: string;
  imageURL: string;
};

export default memo(function ArticleThumbnail({
  id,
  category,
  votes,
  author,
  username,
  tags,
  timestamp,
  title,
  content,
  imageURL,
}: PropsType) {
  return (
    <Wrapper>
      <Recommend
        voteCount={votes?.voteCount || 0}
        id={id}
        category={category}
      />
      <ContentWrapper>
        <Infos author={author} username={username} timestamp={timestamp} />
        <Content
          id={id}
          tags={tags}
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
  margin-top: 18px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
`;

const ContentWrapper = styled.div`
  width: 100%;
  border-left: 1px solid ${styles.colors.dividerColor};
`;
