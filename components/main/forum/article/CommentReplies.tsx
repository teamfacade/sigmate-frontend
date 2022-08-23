import { memo } from 'react';
import styled from 'styled-components';
import { Comment } from 'components/main/forum/article';
import { CommentType } from 'containers/main/forum/article/Comments';

type PropsType = {
  replies: CommentType[];
  show: boolean;
};

export default memo(function CommentReplies({ replies, show }: PropsType) {
  return (
    <RepliesWrapper>
      <ReplyWrapper show={show}>
        {replies.map((reply) => (
          <Comment
            key={reply.id}
            id={reply.id}
            PFPUrl={reply.PFPUrl}
            author={reply.author}
            text={reply.text}
            replies={[]}
            recommend={reply.recommend}
            isReply
          />
        ))}
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
  margin-top: ${({ show }) => (show ? '0' : '-100%')};
  transition: all 300ms ease-in-out;
`;
