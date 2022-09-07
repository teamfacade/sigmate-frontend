import {
  memo,
  useCallback,
  useState,
  MouseEventHandler,
  FormEventHandler,
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
  category: string;
  articleID: number;
  commentID: number;
  replyID?: number;
  voteCount: number;
  PFPUrl: string;
  author: string;
  text: string;
  replies: Forum.CommentType[];
  isReply?: boolean;
  onSubmitComment?: FormEventHandler<HTMLFormElement>;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function Comment({
  category,
  articleID,
  commentID,
  replyID,
  voteCount,
  PFPUrl,
  author,
  text,
  replies,
  isReply,
  onSubmitComment,
  onClickReport,
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
        <CommentPFP PFPUrl={PFPUrl} author={author} />
        <SubWrapper>
          <CommentContent author={author} text={text} />
          <CommentBtns
            articleID={articleID}
            commentID={commentID}
            replyID={replyID}
            category={category}
            voteCount={voteCount}
            like={null}
            length={replies.length}
            onClick={onClick}
            isReply={isReply}
            showReportBtn={showReportBtn}
            onClickReport={onClickReport}
          />
        </SubWrapper>
      </FlexWrapper>
      <CommentReplies
        category={category}
        articleID={articleID}
        commentID={commentID}
        replies={replies}
        show={showReplies}
        onClickReport={onClickReport}
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
