import { useState, useCallback, MouseEventHandler } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { ArticleType } from 'containers/main/wiki/edit/WikiEdit';
import { ReadBlock, VerdictModal } from 'containers/main/wiki/read';
import { Title } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  article: ArticleType;
};

export default function WikiArticle({ article }: PropsType) {
  const [showVerdictModal, setShowVerdictModal] = useState(-1);
  const [voted, setVoted] = useState('');

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowVerdictModal(-1),
    []
  );
  const onClickVerdict: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => setVoted(e.currentTarget.name),
    []
  );

  return (
    <Wrapper>
      <Title title={article.title} />
      {article.blocks.map((block) => {
        return (
          <ReadBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            content={block.content}
            setShowVerdictModal={setShowVerdictModal}
            voted={voted}
            onClickVerdict={onClickVerdict}
          />
        );
      })}
      <EditBtn>
        <Link href={`/main/wiki-edit/${article.title}`}>
          <a>Edit</a>
        </Link>
      </EditBtn>
      <CSSTransition
        in={showVerdictModal >= 0}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
      >
        <VerdictModal onMouseDown={onMouseDown} onClick={onClickVerdict} />
      </CSSTransition>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding-left: 80px;
`;

const EditBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 133px;
  height: 45px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  a {
    color: #ffffff;
  }
`;
