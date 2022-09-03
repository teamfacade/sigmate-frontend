import {
  memo,
  MouseEventHandler,
  FormEventHandler,
  Dispatch,
  SetStateAction,
} from 'react';
import { useAppSelector } from 'hooks/reduxStoreHooks';
import { Recommend, Infos } from 'components/main/forum/articleList';
import { Content, ArticleManageBtns } from 'components/main/forum/article';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  category: string;
  post: Forum.PostType;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
  setShowModal: Dispatch<SetStateAction<Forum.ReportType>>;
  onSubmitComment: FormEventHandler<HTMLFormElement>;
};

export default memo(function ArticleContent({
  category,
  post,
  onClickDelete,
  setShowModal,
  onSubmitComment,
}: PropsType) {
  const { userName } = useAppSelector(({ account }) => account);

  return (
    <Wrapper>
      <Recommend recommend={post.votes?.voteCount || 0} />
      <ContentWrapper>
        <Infos
          author={
            post.createdBy.primaryProfile.displayName ||
            post.createdBy.userName ||
            ''
          }
          tags={post.tags || []}
          timestamp={
            post.contentUpdatedAt || new Date(Date.now()).toISOString()
          }
        >
          {userName === post.createdBy.userName && (
            <ArticleManageBtns
              category={category}
              articleID={post.id.toString()}
              onClickDelete={onClickDelete}
            />
          )}
        </Infos>
        <Content
          id={post.id}
          category={category}
          title={post.title}
          content={post.content}
          imageUrls={post.imageUrls || []}
          setShowModal={setShowModal}
          onSubmitComment={onSubmitComment}
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
