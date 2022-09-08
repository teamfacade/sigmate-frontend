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
  MoreOptions,
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
  authorUserName: string;
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
  authorUserName,
  text,
  replies,
  isReply,
  onSubmitComment,
  onClickReport,
}: PropsType) {
  const [showOptions, setShowOptions] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowReplies((curShow) => !curShow),
    []
  );

  const onClickSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowCommentEdit(false),
    []
  );

  const onClickOption: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'More':
          setShowOptions((cur) => !cur);
          break;
        case 'Edit':
          setShowOptions(false);
          setShowCommentEdit(true);
          break;
        case 'Delete':
          setShowOptions(false);
          alert('DELETE COMMENT');
          break;
        default:
          break;
      }
    },
    []
  );

  return (
    <Wrapper>
      <FlexWrapper>
        <CommentPFP PFPUrl={PFPUrl} author={author} />
        <SubWrapper>
          <CommentContent
            author={author}
            text={text}
            showCommentEdit={showCommentEdit}
            articleID={articleID}
            commentID={commentID}
            onClickSubmit={onClickSubmit}
            onSubmitComment={onSubmitComment}
          />
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
          />
        </SubWrapper>
        <MoreOptions
          authorUserName={authorUserName}
          articleID={articleID}
          commentID={commentID}
          onClick={onClickOption}
          onClickReport={onClickReport}
          showOptions={showOptions}
        />
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
  flex: 1 1 auto;
  margin-left: 10px;
`;

const FlexWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
