import {
  memo,
  useCallback,
  useState,
  MouseEventHandler,
  FormEventHandler,
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
import styles from 'styles/styleLib';

type PropsType = {
  articleID: number;
  id: number;
  PFPUrl: string;
  author: string;
  text: string;
  replies: Forum.CommentType[];
  recommend: number;
  isReply?: boolean;
  setShowModal: Dispatch<SetStateAction<Forum.ReportType>>;
  onSubmitComment?: FormEventHandler<HTMLFormElement>;
};

export default memo(function Comment({
  articleID,
  id,
  PFPUrl,
  author,
  text,
  replies,
  recommend,
  isReply,
  setShowModal,
  onSubmitComment,
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
        <CommentPFP PFPUrl={PFPUrl} author={author} />
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
        articleID={articleID}
        commentID={id}
        replies={replies}
        show={showReplies}
        setShowModal={setShowModal}
        onSubmitComment={onSubmitComment}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 22px;

  :not(:last-child) {
    border-bottom: 1px solid ${styles.colors.lightGrayBorderColor};
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
