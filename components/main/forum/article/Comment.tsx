import { memo, MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  CommentReplies,
  CommentBtns,
  CommentContent,
  CommentPFP,
} from 'components/main/forum/article';
import { CommentType } from 'containers/main/forum/article/Comments';

type PropsType = {
  id: number;
  PFPUrl: string;
  author: string;
  text: string;
  replies: CommentType[];
  recommend: number;
  isReply?: boolean;
};

// eslint-disable-next-line react/no-unused-prop-types
export default memo(function Comment({
  id,
  PFPUrl,
  author,
  text,
  replies,
  recommend,
  isReply,
}: PropsType) {
  const [showReplies, setShowReplies] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowReplies((curShow) => !curShow),
    []
  );

  return (
    <Wrapper>
      <FlexWrapper>
        <CommentPFP PFPUrl={PFPUrl} />
        <SubWrapper>
          <CommentContent author={author} text={text} />
          <CommentBtns
            length={replies.length}
            recommend={recommend}
            onClick={onClick}
            isReply={isReply}
          />
        </SubWrapper>
      </FlexWrapper>
      <CommentReplies replies={replies} show={showReplies} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 22px;

  :not(:last-child) {
    border-bottom: 1px solid #ececec;
    margin-bottom: 15px;
  }
`;

const SubWrapper = styled.div`
  margin-left: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: center;
`;
