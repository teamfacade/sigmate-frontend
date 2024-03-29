import { memo, MouseEventHandler, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
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
}: PropsType) {
  const dispatch = useAppDispatch();
  const [curVoteCount, setCurVoteCount] = useState<number>(voteCount);
  const [userLikes, setUserLikes] = useState<boolean | null>(like);

  const onVote: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;

      if (name === 'Up') {
        if (!userLikes) {
          dispatch(
            AuthRequiredAxios({
              method: 'POST',
              url: `/forum/cm/${replyID || commentID}/vote`,
              data: {
                like: true,
              },
            })
          ).then((action: any) => {
            if (action.payload.status === 200) {
              setCurVoteCount(action.payload.data.forumPostComment.voteCount);
              setUserLikes(true);
            } else {
              alert(
                `Error while voting UP to the comment.\r\nPlease try again. ERR: ${action.payload.status}`
              );
            }
          });
        } else {
          dispatch(
            AuthRequiredAxios({
              method: 'DELETE',
              url: `/forum/cm/${replyID || commentID}/vote`,
            })
          ).then((action: any) => {
            if (action.payload.status === 200) {
              setCurVoteCount((cur) => cur - 1);
              setUserLikes(null);
            } else {
              alert(
                `Error while canceling vote to the comment.\r\nPlease try again. ERR: ${action.payload.status}`
              );
            }
          });
        }
      } else if (name === 'Down') {
        if (userLikes || userLikes === null) {
          dispatch(
            AuthRequiredAxios({
              method: 'POST',
              url: `/forum/cm/${replyID || commentID}/vote`,
              data: {
                like: false,
              },
            })
          ).then((action: any) => {
            if (action.payload.status === 200) {
              setCurVoteCount(action.payload.data.forumPostComment.voteCount);
              setUserLikes(false);
            } else {
              alert(
                `Error while voting DOWN to the comment.\r\nPlease try again. ERR: ${action.payload.status}`
              );
            }
          });
        } else {
          dispatch(
            AuthRequiredAxios({
              method: 'DELETE',
              url: `/forum/cm/${replyID || commentID}/vote`,
            })
          ).then((action: any) => {
            if (action.payload.status === 200) {
              setCurVoteCount((cur) => cur + 1);
              setUserLikes(null);
            } else {
              alert(
                `Error while canceling vote to the comment.\r\nPlease try again. ERR: ${action.payload.status}`
              );
            }
          });
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
        return '#CDCDCD';
      }};
    }
  }
`;
