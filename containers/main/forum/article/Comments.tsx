import { memo, Dispatch, SetStateAction, FormEventHandler } from 'react';
import styled from 'styled-components';
import { Comment } from 'components/main/forum/article';
import styles from 'styles/styleLib';

type PropsType = {
  articleID: number;
  comments: Forum.CommentType[];
  setShowModal: Dispatch<SetStateAction<Forum.ReportType>>;
  onSubmitComment: FormEventHandler<HTMLFormElement>;
};

export default memo(function Comments({
  articleID,
  comments,
  setShowModal,
  onSubmitComment,
}: PropsType) {
  return (
    <Wrapper>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          articleID={articleID}
          id={comment.id}
          PFPUrl={comment.createdBy.primaryProfile.profileImageUrl || ''}
          author={
            comment.createdBy.primaryProfile.displayName ||
            comment.createdBy.userName ||
            ''
          }
          text={comment.content}
          replies={comment.replies}
          recommend={comment.votes.voteCount}
          isReply={false}
          setShowModal={setShowModal}
          onSubmitComment={onSubmitComment}
        />
      ))}
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
