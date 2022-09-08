import { memo, FormEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Comment, CommentInput } from 'components/main/forum/article';

type PropsType = {
  category: string;
  articleID: number;
  commentID: number;
  replies: Forum.CommentType[];
  show: boolean;
  onSubmitComment?: FormEventHandler<HTMLFormElement>;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function CommentReplies({
  category,
  articleID,
  commentID,
  replies,
  show,
  onSubmitComment,
  onClickReport,
}: PropsType) {
  return (
    <RepliesWrapper>
      <ReplyWrapper show={show}>
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            category={category}
            articleID={articleID}
            commentID={commentID}
            replyID={reply.id}
            voteCount={reply.voteCount}
            PFPUrl={reply.createdBy.primaryProfile.profileImageUrl || ''}
            author={
              reply.createdBy.primaryProfile.displayName ||
              reply.createdBy.userName ||
              ''
            }
            authorUserName={reply.createdBy.userName || ''}
            text={reply.content}
            replies={[]}
            isReply
            onClickReport={onClickReport}
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
