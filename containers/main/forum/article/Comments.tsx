import { memo, FormEventHandler, MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';
import { Comment } from 'components/main/forum/article';
import styles from 'styles/styleLib';

type PropsType = {
  category: string;
  articleID: number;
  comments: Forum.CommentType[];
  onSubmitComment: FormEventHandler<HTMLFormElement>;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
  children?: ReactNode;
};

export default memo(function Comments({
  category,
  articleID,
  comments,
  onSubmitComment,
  onClickReport,
  children,
}: PropsType) {
  return (
    <Wrapper>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          category={category}
          articleID={articleID}
          commentID={comment.id}
          voteCount={comment.voteCount}
          PFPUrl={comment.createdBy.primaryProfile.profileImageUrl || ''}
          author={
            comment.createdBy.primaryProfile.displayName ||
            comment.createdBy.userName ||
            ''
          }
          text={comment.content}
          replies={comment.replies || []}
          isReply={false}
          onSubmitComment={onSubmitComment}
          onClickReport={onClickReport}
        />
      ))}
      {children}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 40px 45px;
  margin: 20px 0 5px 0;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
  overflow: auto;
`;
