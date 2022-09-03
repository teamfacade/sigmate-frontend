import {
  useState,
  useRef,
  useCallback,
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
  const [showModal, setShowModal] = useState<Forum.ReportType>({
    type: 'comment',
    id: -1,
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

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowModal({ type: 'comment', id: -1 }),
    []
  );

  const onClickDelete: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      alert('Delete the article');
    }, []);

  return (
    <>
      <Wrapper>
        <ArticleContent
          category={category}
          post={forumPost}
          onClickDelete={onClickDelete}
          onSubmitComment={onSubmitComment}
          setShowModal={setShowModal}
        />
      </Wrapper>
      <Wrapper id="comments">
        <Comments
          articleID={forumPost.id}
          comments={forumPost.comments || []}
          setShowModal={setShowModal}
          onSubmitComment={onSubmitComment}
        />
      </Wrapper>
      <CSSTransition
        in={showModal.id >= 0}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          <p>{`Report about ${showModal.type}'s comment ${showModal.id}`}</p>
        </Modal>
      </CSSTransition>
    </>
  );
}

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const forumPost = getForumArticleData(
    params?.category as string,
    params?.id as string
  );
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
