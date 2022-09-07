import { memo, MouseEventHandler, useCallback, useState, useMemo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { CommentDownVote, CommentUpVote } from 'public/Icons/main/forum';

type PropsType = {
  voteCount: number;
  like: boolean | null;
  category: string;
  articleID: number;
  commentID: number;
  replyID?: number;
  length: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isReply?: boolean;
  showReportBtn: boolean;
  onClickReport: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function CommentBtns({
  voteCount,
  like,
  category,
  articleID,
  commentID,
  length,
  onClick,
  isReply,
  replyID,
  showReportBtn,
  onClickReport,
}: PropsType) {
  const [curVoteCount, setCurVoteCount] = useState<number>(voteCount);
  const [userLikes, setUserLikes] = useState<boolean | null>(like);

  const btnName = useMemo(() => {
    if (replyID) return 'reply';
    if (commentID) return 'comment';
    return 'article';
  }, [commentID, replyID]);

  const onVote: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;

      if (name === 'Up') {
        if (!userLikes) {
          setCurVoteCount((cur) => {
            return cur + (userLikes === null ? 1 : 2);
          });
          setUserLikes(true);
          alert(
            `Vote as like for ${category}'s article ${articleID}'s comment ${commentID}${
              isReply ? `'s reply ${replyID}` : ''
            }`
          );
        } else {
          setCurVoteCount((cur) => cur - 1);
          setUserLikes(null);
          alert(
            `Cancel like for ${category}'s article ${articleID}'s comment ${commentID}${
              isReply ? `'s reply ${replyID}` : ''
            }`
          );
        }
      } else if (name === 'Down') {
        if (userLikes || userLikes === null) {
          setCurVoteCount((cur) => {
            return cur - (userLikes === null ? 1 : 2);
          });
          setUserLikes(false);
          alert(
            `Vote as dislike for ${category}'s article ${articleID}'s comment ${commentID}${
              isReply ? `'s reply ${replyID}` : ''
            }`
          );
        } else {
          setCurVoteCount((cur) => cur + 1);
          setUserLikes(null);
          alert(
            `Cancel dislike for ${category}'s article ${articleID}'s comment ${commentID}${
              isReply ? `'s reply ${replyID}` : ''
            }`
          );
        }
      }
    },
    [userLikes, category, articleID, commentID, replyID]
  );

  return (
    <BtnWrapper>
      {!isReply && <ReplyBtn onClick={onClick}>{`reply ${length}`}</ReplyBtn>}
      <VoteBtn>
        <Btn type="button" name="Up" userLikes={userLikes} onClick={onVote}>
          <CommentUpVote />
        </Btn>
        <p>{curVoteCount}</p>
        <Btn type="button" name="Down" userLikes={userLikes} onClick={onVote}>
          <CommentDownVote />
        </Btn>
      </VoteBtn>
      <ReportBtn
        show={showReportBtn}
        name={btnName}
        data-category={category}
        data-article-id={articleID}
        data-comment-id={commentID}
        data-reply-id={replyID}
        onClick={onClickReport}
      >
        Report
      </ReportBtn>
    </BtnWrapper>
  );
});

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 10px;

  > button {
    width: 88px;
    height: 28px;
    border-radius: 8px;
    line-height: 160%;
    font-family: 'Inter', sans-serif;
  }
`;

const ReplyBtn = styled.button`
  padding: 2px 14px;
  margin-right: 5px;
  color: #ffffff;
  border: none;
  background-color: ${styles.colors.emphColor};
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
`;

const WhiteBtnStyle = `
  padding: 2px 15px;
  color: ${styles.colors.logColor};
  border: 1px solid ${styles.colors.lightGrayBorderColor};
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 14px;
  font-weight: 700;
`;

const VoteBtn = styled.div`
  ${WhiteBtnStyle};
  display: inline-flex;
  align-items: center;

  p {
    margin: 0 3px;
  }
`;

const Btn = styled.button<{ name: string; userLikes: boolean | null }>`
  position: relative;
  top: 1px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    path {
      fill: ${({ name, userLikes }) => {
        if (
          (userLikes && name === 'Up') ||
          (userLikes === false && name === 'Down')
        )
          return styles.colors.emphColor;
        return styles.colors.forumSubTextColor;
      }};
    }
  }
`;

const ReportBtn = styled.button<{ show: boolean }>`
  ${WhiteBtnStyle};
  display: ${({ show }) => (show ? 'inline' : 'none')};
  position: absolute;
  right: 0;
`;
