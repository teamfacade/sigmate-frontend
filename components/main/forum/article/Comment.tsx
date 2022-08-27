import { memo, MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import {
  CommentReplies,
  CommentBtns,
  CommentContent,
  CommentPFP,
} from 'components/main/forum/article';

type PropsType = {
  id: number;
  PFPUrl: string;
  author: string;
  text: string;
  replies: ForumCommentType[];
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
  const [showReportBtn, setShowReportBtn] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowReplies((curShow) => !curShow),
    []
  );

  const onMouseOver: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowReportBtn(true),
    []
  );
  const onMouseLeave: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowReportBtn(false),
    []
  );

  return (
    <Wrapper onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
      <FlexWrapper>
        <CommentPFP PFPUrl={PFPUrl} />
        <SubWrapper>
          <CommentContent author={author} text={text} />
          <CommentBtns
            length={replies.length}
            recommend={recommend}
            onClick={onClick}
            isReply={isReply}
            showReportBtn={showReportBtn}
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
