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
import { Modal, PageMoveBtns } from 'components/global';
import styles from 'styles/styleLib';

const limit = 10;

const fetcher: Fetcher<Forum.CommentType[], string> = (url: string) =>
  Axios.get(url).then((res) => {
    if (res.status === 200) return res.data.forumPost.comments.reverse();

    alert(`Error while fetching comments: ERR ${res.status}`);
    return [];
  });

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

  const { data: comments } = useSWR(
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
      if (isEditMode) {
        alert('EDIT SUCCESS');
      } else if (commentId) {
        alert(
          `Add comment to article ${articleId}'s comment ${commentId}: ${value}`
        );
      } else {
        dispatch(
          AuthRequiredAxios({
            method: 'POST',
            url: `/forum/p/${articleId}/cm`,
            data: { content: value },
          })
        ).then(async (action: any) => {
          if (action.payload.status !== 201) {
            alert(
              `Error while posting new comment. ERR: ${action.payload.status}`
            );
          } else {
            await router.reload();
          }
        });
      }
    },
    []
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

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          setCurPage(1);
          break;
        case 'Prev':
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          setCurPage(
            Math.floor(
              Number.parseInt(((comments?.length || 0) / limit).toFixed(), 10)
            ) + 1
          );
          break;
        default:
          break;
      }
    },
    [comments]
  );

  if (forumPost === null) return <div>There's no article : (</div>;
  return (
    <>
      <Wrapper>
        <ArticleContent
          category={category}
          post={forumPost as Forum.PostType}
          onClickDelete={onClickDelete}
          onSubmitComment={onSubmitComment}
          onClickReport={onClickReport}
        />
      </Wrapper>
      <Wrapper id="comments">
        <Comments
          category={category}
          articleID={forumPost.id}
          comments={comments || []}
          onClickReport={onClickReport}
          onSubmitComment={onSubmitComment}
        >
          {comments && (
            <PageMoveBtns
              totalPage={comments.length / 10}
              curPage={curPage}
              onClickPageMoveBtn={onClickPageMoveBtn}
              onClickPageNumBtn={onClickPageNumBtn}
            />
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
