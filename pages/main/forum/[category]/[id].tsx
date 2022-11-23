import {
  useState,
  useRef,
  useCallback,
  MouseEventHandler,
  FormEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import useSWR, { Fetcher } from 'swr';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import Axios from 'lib/global/axiosInstance';
import { getForumArticleData } from 'lib/main/forum/getForumDatas';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import { ArticleContent, Comments } from 'containers/main/forum/article';
import {
  BasicWrapper,
  Modal,
  PageMoveBtns,
  initialSWRData,
} from 'components/global';
import styles from 'styles/styleLib';

const limit = 10;

const fetcher: Fetcher<PagedSWRDataType<Forum.CommentType[]>, string> = async (
  url: string
) => {
  try {
    const { data, status } = await Axios.get(url);

    if (status === 200) {
      return {
        data: data.data.comments,
        total: data.page.total,
      };
    }
    alert(`Error while fetching comments: ERR ${status}`);
    return initialSWRData;
  } catch (e) {
    alert(`Error while fetching comments: ERR ${e}`);
    return initialSWRData;
  }
};

export default function Article({
  forumPost,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState<Forum.ReportType>({
    type: 'article',
    info: {
      category: 'Best',
      articleID: -1,
    },
  });
  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: comments = initialSWRData } = useSWR(
    forumPost
      ? `/forum/p/${forumPost?.id}/cm?limit=${limit}&page=${curPage}`
      : null,
    forumPost ? fetcher : null
  );

  const onSubmitComment: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const { dataset, value } = e.currentTarget.elements.namedItem(
        'textarea'
      ) as HTMLTextAreaElement;
      const { articleId, commentId, isEditMode } = dataset;
      if (isEditMode === 'true') {
        dispatch(
          AuthRequiredAxios({
            method: 'PATCH',
            url: `/forum/cm/${commentId}`,
            data: { content: value },
          })
        ).then((action: any) => {
          if (action.payload.status !== 200) {
            alert(
              `Comment Edit failed. Please try again.\r\nERR: ${action.payload.status}`
            );
          }
        });
      } else {
        dispatch(
          AuthRequiredAxios({
            method: 'POST',
            url: `/forum/p/${articleId}/cm`,
            data: commentId
              ? { content: value, parentId: commentId }
              : { content: value },
          })
        ).then(async (action: any) => {
          if (action.payload.status !== 201 && action.payload.status !== 200) {
            alert(
              `Error while posting new comment. ERR: ${action.payload.status}`
            );
          } else {
            await router.reload();
          }
        });
      }
    },
    [comments]
  );

  const onClickReport: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const { name, dataset } = e.currentTarget;
      setShowModal({
        type: name as 'comment' | 'reply' | 'article',
        info: {
          category: (dataset.category as string) || '',
          articleID: Number.parseInt(dataset.articleId as string, 10),
          commentID: dataset.commentId
            ? Number.parseInt(dataset.commentId, 10)
            : undefined,
          replyID: dataset.replyId
            ? Number.parseInt(dataset.replyId, 10)
            : undefined,
        },
      });
    },
    []
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () =>
      setShowModal((cur) => ({ ...cur, info: { ...cur.info, articleID: -1 } })),
    []
  );

  const onClickDelete: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      dispatch(
        AuthRequiredAxios({
          method: 'DELETE',
          url: `/forum/p/${forumPost?.id}`,
        })
      ).then((action: any) => {
        if (action.payload.status === 204) {
          alert('Deleted Successfully');
          router.push(`/main/forum/${router.query.category}`);
        } else
          alert(
            `Error while deleting the post.\r\nErr code: ${action.payload.status}`
          );
      });
    }, [forumPost, category]);

  if (forumPost === null)
    return (
      <BasicWrapper>
        <LargeText>There's no article : (</LargeText>
      </BasicWrapper>
    );
  return (
    <>
      <Wrapper>
        <ArticleContent
          category={category}
          post={forumPost as Forum.PostType}
          commentCount={comments.data.length || 0}
          onClickDelete={onClickDelete}
          onSubmitComment={onSubmitComment}
          onClickReport={onClickReport}
        />
      </Wrapper>
      <Wrapper id="comments">
        <Comments
          category={category}
          articleID={forumPost.id}
          comments={comments.data}
          onClickReport={onClickReport}
          onSubmitComment={onSubmitComment}
        >
          {comments.total > 0 ? (
            <PageMoveBtns
              totalPage={comments.total}
              curPage={curPage}
              setCurPage={setCurPage}
            />
          ) : (
            <BasicWrapper>
              <LargeText>No comments yet :(</LargeText>
            </BasicWrapper>
          )}
        </Comments>
      </Wrapper>
      <CSSTransition
        in={showModal.info.articleID >= 0}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          <p>{`Report about article ${showModal.info.articleID}${
            showModal.info.commentID
              ? `'s comment ${showModal.info.commentID}`
              : ''
          }${
            showModal.info.replyID ? `'s reply ${showModal.info.replyID}` : ''
          }`}</p>
        </Modal>
      </CSSTransition>
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const forumPost = await getForumArticleData(params?.id as string);
  return {
    props: {
      forumPost,
      category: params?.category as string,
    },
  };
}

const Wrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

const LargeText = styled.p`
  margin: auto;
  text-align: center;
  color: #96b8d7;
  font-family: 'Claris Sans', sans-serif;
  font-size: 50px;
  font-weight: 200;
  line-height: 150%;
`;
