import {
  useState,
  useRef,
  useCallback,
  useEffect,
  MouseEventHandler,
  FormEventHandler,
} from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { getForumArticleData } from 'lib/main/forum/getForumDatas';
import { ArticleContent, Comments } from 'containers/main/forum/article';
import { Modal } from 'components/global';
import styles from 'styles/styleLib';

export default function Article({
  forumPost,
  category,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  useEffect(() => {
    if (forumPost === null)
      alert('Something went wrong!\r\nPlease reload the page.');
  }, []);

  const [showModal, setShowModal] = useState<Forum.ReportType>({
    type: 'article',
    info: {
      category: 'Best',
      articleID: -1,
    },
  });
  const ModalRef = useRef<HTMLDivElement>(null);

  const onSubmitComment: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      const { dataset, value } = e.currentTarget.elements.namedItem(
        'textarea'
      ) as HTMLTextAreaElement;
      const { articleId, commentId } = dataset;
      if (commentId) {
        alert(
          `Add comment to article ${articleId}'s comment ${commentId}: ${value}`
        );
      } else {
        alert(`Add comment to article ${articleId}: ${value}`);
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
          category: dataset.category as string,
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
      alert('Delete the article');
    }, []);

  if (forumPost === null) return <div>: (</div>;
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
          comments={forumPost.comments || []}
          onClickReport={onClickReport}
          onSubmitComment={onSubmitComment}
        />
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
