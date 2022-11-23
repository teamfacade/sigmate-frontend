import {
  memo,
  useState,
  useCallback,
  MouseEventHandler,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { UpVote, DownVote } from 'public/Icons/main/forum';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  category: string;
  voteCount: number;
};

export default memo(function Recommend({ id, category, voteCount }: PropsType) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { userName } = useAppSelector(({ account }) => account);
  const [curVoteCount, setCurVoteCount] = useState<number>(voteCount);
  const [userLikes, setUserLikes] = useState<boolean | null>(null);

  const getMyVote = useCallback(async () => {
    if (userName) {
      const { payload } = await dispatch(
        AuthRequiredAxios({ method: 'GET', url: `/forum/p/${id}/vote` })
      );
      if (payload.status === 200) {
        setUserLikes(
          payload.data.myVote === null ? null : payload.data.myVote.like
        );
      } else if (payload.status === 500) alert(payload.data.msg);
    }
  }, [id, userName]);

  useEffect(() => {
    getMyVote();
  }, [getMyVote]);

  const onVote: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      const { name } = e.currentTarget;

      if (!userName) {
        await router.push('/auth');
        return;
      }

      if (name === 'Up') {
        if (!userLikes) {
          dispatch(
            AuthRequiredAxios({
              method: 'POST',
              url: `/forum/p/${id}/vote`,
              data: { like: true },
            })
          ).then((action: any) => {
            if (action.payload.status !== 200) {
              alert(`Error while voting. ERR: ${action.payload.status}`);
            } else {
              setCurVoteCount((cur) => {
                return cur + (userLikes === null ? 1 : 2);
              });
              setUserLikes(true);
            }
          });
        } else {
          dispatch(
            AuthRequiredAxios({ method: 'DELETE', url: `/forum/p/${id}/vote` })
          ).then((action: any) => {
            if (action.payload.status !== 200) {
              alert(
                `Error while deleting your up vote. ERR: ${action.payload.status}`
              );
            } else {
              setCurVoteCount((cur) => cur - 1);
              setUserLikes(null);
            }
          });
        }
      } else if (name === 'Down') {
        if (userLikes || userLikes === null) {
          dispatch(
            AuthRequiredAxios({
              method: 'POST',
              url: `/forum/p/${id}/vote`,
              data: { like: false },
            })
          ).then((action: any) => {
            if (action.payload.status !== 200) {
              alert(`Error while voting down. ERR: ${action.payload.status}`);
            } else {
              setCurVoteCount((cur) => {
                return cur - (userLikes === null ? 1 : 2);
              });
              setUserLikes(false);
            }
          });
        } else {
          dispatch(
            AuthRequiredAxios({ method: 'DELETE', url: `/forum/p/${id}/vote` })
          ).then((action: any) => {
            if (action.payload.status !== 200) {
              alert(
                `Error while deleting your down vote. ERR: ${action.payload.status}`
              );
            } else {
              setCurVoteCount((cur) => cur + 1);
              setUserLikes(null);
            }
          });
        }
      }
    },
    [userLikes, category, id, userName]
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

const Btn = styled.button<{ name: string; userLikes: boolean | null }>`
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
