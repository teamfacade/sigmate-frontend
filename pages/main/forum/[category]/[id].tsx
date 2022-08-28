import { useState, useRef, useCallback, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { ArticleContent, Comments } from 'containers/main/forum/article';
import { Modal } from 'components/global';
import styles from 'styles/styleLib';

const ExArticle: ForumArticleType = {
  id: 1,
  category: 'Game',
  recommend: 322,
  author: 'WK SEO',
  tags: ['NFT', 'Bellybear'],
  timestamp: new Date(Date.now()).toISOString(),
  title:
    'An ‘NFT’ digital image just sold for US$69 million \n' +
    '— but what is it?',
  content:
    'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000\n\n Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making  over 2000 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literatur',
  imageURL: '',
};

export default function Article() {
  const [showModal, setShowModal] = useState<ForumCommentReportType>({
    type: 'comment',
    id: -1,
  });
  const ModalRef = useRef<HTMLDivElement>(null);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowModal({ type: 'comment', id: -1 }),
    []
  );

  return (
    <>
      <Wrapper>
        <ArticleContent article={ExArticle} />
      </Wrapper>
      <Wrapper>
        <Comments setShowModal={setShowModal} />
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

const Wrapper = styled.div`
  width: 100%;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;
