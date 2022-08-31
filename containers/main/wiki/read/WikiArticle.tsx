import {
  useState,
  useCallback,
  useMemo,
  useRef,
  MouseEventHandler,
  memo,
} from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { ArticleType } from 'containers/main/wiki/edit/WikiEdit';
import { ReadBlock } from 'containers/main/wiki/read';
import { VerdictModal } from 'containers/main/wiki/read/verdictModal';
import { ReadKeyInfo, Title, Types } from 'components/main/wiki/read';
import styles from 'styles/styleLib';

type PropsType = {
  article: ArticleType;
};

const types = ['Game', 'Utility'];

export default function WikiArticle({ article }: PropsType) {
  const [showModal, setShowModal] = useState(-1);
  const ModalRef = useRef<HTMLDivElement>(null);

  const modalVerdict = useMemo(
    () => article.blocks.find((block) => block.id === showModal)?.verdict,
    [showModal]
  );

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowModal(-1),
    []
  );

  return (
    <Wrapper>
      <Title title={article.title} />
      <Types types={types} />
      <ReadKeyInfo
        setShowModal={setShowModal}
        name="Sigmate"
        thumbnailUrl=""
        team="sigmate"
        rugpool=""
        utility="Game"
        WLPrice="0.25 ETH"
        publicPrice="0.3 ETH"
        currentPrice="1.5 ETH"
        discordUrl="https://www.naver.com"
        twitterUrl="https://www.twitter.com/bellygom"
        officialSiteUrl="localhost:3000/main"
        chain="ETH"
        marketplace="Opensea"
      />
      {article.blocks.map((block) => {
        return (
          <ReadBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            content={block.content}
            setShowModal={setShowModal}
            verdict={block.verdict}
          />
        );
      })}

      <Link href={`/main/wiki-edit/${article.title}`} passHref>
        <a>
          <EditBtn>Edit</EditBtn>
        </a>
      </Link>
      <CSSTransition
        in={showModal !== -1}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <VerdictModal
          verdict={modalVerdict}
          onMouseDown={onMouseDown}
          ref={ModalRef}
        />
      </CSSTransition>
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
  color: #ffffff;
  background-color: ${styles.colors.emphColor};
  font-size: 18px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
`);
