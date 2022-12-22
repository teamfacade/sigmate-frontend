import {
  memo,
  useCallback,
  useState,
  MouseEventHandler,
  FormEventHandler,
} from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import {
  CommentReplies,
  CommentBtns,
  CommentContent,
  CommentPFP,
  MoreOptions,
} from 'components/main/forum/article';
import styles from 'styles/styleLib';
import { Fetcher } from 'swr';
import useSWRImmutable from 'swr/immutable';
import { initialSWRData } from '../../../global';
import Axios from '../../../../lib/global/axiosInstance';

const fetcher: Fetcher<PagedSWRDataType<Forum.CommentType[]>, string> = async (
  url: string
) => {
  try {
    const { data, status } = await Axios.get(url);

    if (status === 200) {
      return {
        data: data.data,
        total: data.count,
      };
    }
    alert(`Error while fetching replies: ERR ${status}`);
    return initialSWRData;
  } catch (e) {
    alert(`Error while fetching replies: ERR ${e}`);
    return initialSWRData;
  }
};

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
  isReply,
  onSubmitComment,
  onClickReport,
}: PropsType) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState(false);
  const [showReplies, setShowReplies] = useState(true);
  const [commentText, setCommentText] = useState(text);

  const { data: fetchedReplies = initialSWRData } = useSWRImmutable(
    !isReply ? `/forum/cm/${commentID}/replies` : null,
    !isReply ? fetcher : null
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowReplies((curShow) => !curShow),
    []
  );

  // @todo reply 추가
  const onClickSubmit: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { value } = e.currentTarget.dataset;
      setShowCommentEdit(false);
      setCommentText((cur) => value || cur);
    },
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
          setShowCommentEdit((cur) => !cur);
          break;
        case 'Delete':
          setShowOptions(false);
          dispatch(
            AuthRequiredAxios({
              method: 'DELETE',
              url: `/forum/cm/${commentID}`,
            })
          ).then(async (action: any) => {
            if (action.payload.status !== 200) {
              alert(
                `Comment Deletion Failed. Please try again.\r\nERR: ${action.payload.status}`
              );
            } else {
              await router.reload();
            }
          });
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
        <CommentPFP PFPUrl={PFPUrl} author={authorUserName} />
        <SubWrapper>
          <CommentContent
            author={author}
            authorUserName={authorUserName}
            text={commentText}
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
            length={fetchedReplies.total}
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
          showCommentEdit={showCommentEdit}
        />
      </FlexWrapper>
      {isReply === false && (
        <CommentReplies
          category={category}
          articleID={articleID}
          commentID={commentID}
          replies={fetchedReplies.data}
          show={showReplies}
          onClickReport={onClickReport}
          onSubmitComment={onSubmitComment}
        />
      )}
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
