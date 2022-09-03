import { memo, Dispatch, SetStateAction, FormEventHandler } from 'react';
import styled from 'styled-components';
import { Comment, CommentInput } from 'components/main/forum/article';

type PropsType = {
  articleID: number;
  commentID: number;
  replies: Forum.CommentType[];
  show: boolean;
  setShowModal: Dispatch<SetStateAction<Forum.ReportType>>;
  onSubmitComment?: FormEventHandler<HTMLFormElement>;
};

export default memo(function CommentReplies({
  articleID,
  commentID,
  replies,
  show,
  setShowModal,
  onSubmitComment,
}: PropsType) {
  return (
    <RepliesWrapper>
      <ReplyWrapper show={show}>
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            articleID={articleID}
            id={reply.id}
            PFPUrl={reply.createdBy.primaryProfile.profileImageUrl || ''}
            author={
              reply.createdBy.primaryProfile.displayName ||
              reply.createdBy.userName ||
              ''
            }
            text={reply.content}
            replies={[]}
            recommend={reply.votes.voteCount}
            isReply
            setShowModal={setShowModal}
          />
        ))}
        <CommentInput
          articleID={articleID}
          commentID={commentID}
          onSubmitComment={onSubmitComment}
        />
      </ReplyWrapper>
    </RepliesWrapper>
  );
});

const RepliesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const ReplyWrapper = styled.div<{ show: boolean }>`
  padding: 20px 0 0 58px;
  margin-top: ${({ show }) => (show ? '0' : '-1000%')};
  transition: all 300ms ease-in-out;
`;
