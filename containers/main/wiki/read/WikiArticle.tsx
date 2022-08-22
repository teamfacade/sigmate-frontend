import { useState, useCallback, MouseEventHandler, memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { ArticleType } from 'containers/main/wiki/edit/WikiEdit';
import { ReadBlock } from 'containers/main/wiki/read';
import { Title } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  article: ArticleType;
};

export default function WikiArticle({ article }: PropsType) {
  const [showVerdictModal, setShowVerdictModal] = useState(false);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowVerdictModal(false),
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
            showVerdictModal={showVerdictModal}
            setShowVerdictModal={setShowVerdictModal}
            verdict={block.verdict}
            onMouseDown={onMouseDown}
          />
        );
      })}
      <EditBtn>
        <Link href={`/main/wiki-edit/${article.title}`}>
          <a>Edit</a>
        </Link>
      </EditBtn>
    </Wrapper>
  );
}

const Wrapper = memo(styled.div`
  position: relative;
  padding-left: 80px;
`);

const EditBtn = memo(styled.button`
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
`);
