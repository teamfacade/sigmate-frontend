import {
  memo,
  useCallback,
  useState,
  MouseEventHandler,
  Dispatch,
  SetStateAction,
} from 'react';
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
  setShowModal: Dispatch<SetStateAction<ForumCommentReportType>>;
};

export default memo(function Comment({
  id,
  PFPUrl,
  author,
  text,
  replies,
  recommend,
  isReply,
  setShowModal,
}: PropsType) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReportBtn, setShowReportBtn] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowReplies((curShow) => !curShow),
    []
  );

  const onClickReport: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowModal({ type: isReply ? 'reply' : 'comment', id }),
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
            onClickReport={onClickReport}
          />
        </SubWrapper>
      </FlexWrapper>
      <CommentReplies
        replies={replies}
        show={showReplies}
        setShowModal={setShowModal}
      />
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
  position: relative;
  display: flex;
  align-items: center;
`;
