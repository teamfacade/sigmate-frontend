import { memo, useState, useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { UpVote, DownVote } from 'public/Icons/main/forum';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  category: string;
  voteCount: number;
  like?: boolean;
};

export default memo(function Recommend({
  id,
  category,
  voteCount,
  like,
}: PropsType) {
  const [curVoteCount, setCurVoteCount] = useState<number>(voteCount);
  const [userLikes, setUserLikes] = useState<boolean | undefined>(like);

  const onVote: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name } = e.currentTarget;

      if (name === 'Up') {
        if (!userLikes) {
          setCurVoteCount((cur) => {
            return cur + (userLikes === undefined ? 1 : 2);
          });
          setUserLikes(true);
          alert(`Vote as like for ${category}'s article ${id}`);
        } else {
          setCurVoteCount((cur) => cur - 1);
          setUserLikes(undefined);
          alert(`Cancel like for ${category}'s article ${id}`);
        }
      } else if (name === 'Down') {
        if (userLikes || userLikes === undefined) {
          setCurVoteCount((cur) => {
            return cur - (userLikes === undefined ? 1 : 2);
          });
          setUserLikes(false);
          alert(`Vote as dislike for ${category}'s article ${id}`);
        } else {
          setCurVoteCount((cur) => cur + 1);
          setUserLikes(undefined);
          alert(`Cancel dislike for ${category}'s article ${id}`);
        }
      }
    },
    [userLikes, category, id]
  );
  return (
    <Wrapper>
      <Btn name="Up" userLikes={userLikes} onClick={onVote}>
        <UpVote />
      </Btn>
      <RecommendTotal>{curVoteCount}</RecommendTotal>
      <Btn name="Down" userLikes={userLikes} onClick={onVote}>
        <DownVote />
      </Btn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 55px;
  height: 100%;
  padding-top: 15px;
`;

const Btn = styled.button<{ name: string; userLikes: boolean | undefined }>`
  border: none;
  background-color: transparent;

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

const RecommendTotal = styled.p`
  margin: 5px 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 900;
  line-height: 160%;
`;
