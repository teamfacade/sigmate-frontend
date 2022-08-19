import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { EditBlock } from 'containers/main/wiki/edit';
import { Title } from 'components/main/wiki/edit';
import styled from 'styled-components';

type BlockType = {
  id: number;
  tag: string;
  content: string;
};

type ArticleType = {
  title: string;
  blocks: BlockType[];
};

type PropsType = {
  article: ArticleType;
};

const createNewBlock = (tag: string) => ({
  id: Date.now(),
  tag,
  content: '',
});

export default function WikiEdit({ article }: PropsType) {
  const [title, setTitle] = useState(article.title);
  const [blocks, setBlocks] = useState<BlockType[]>(article.blocks);
  const router = useRouter();

  useEffect(() => {
    setTitle(article.title);
    setBlocks(article.blocks);
  }, [router.query.title]);

  const onClickSelect: (id: number, tag: string) => void = useCallback(
    (id, tag) => {
      setBlocks((curState) => {
        const clickedIdx = curState.findIndex((block) => block.id === id);
        return curState
          .slice(0, clickedIdx + 1)
          .concat(createNewBlock(tag), curState.slice(clickedIdx + 1));
      });
    },
    []
  );

  const removeBlock: (id: number) => void = useCallback((id) => {
    setBlocks((curState) => curState.filter((block) => block.id !== id));
  }, []);

  const onFinishFix: (id: number, content: string) => void = useCallback(
    (id, content) => {
      setBlocks((curState) =>
        curState.map((block) => {
          if (block.id === id) return { ...block, content };
          return block;
        })
      );
    },
    []
  );

  return (
    <Wrapper>
      <Title title={title} setTitle={setTitle} onClickSelect={onClickSelect} />
      {blocks.map((block) => {
        return (
          <EditBlock
            key={block.id}
            id={block.id}
            tag={block.tag}
            content={block.content}
            onClickSelect={onClickSelect}
            removeBlock={removeBlock}
            onFinishFix={onFinishFix}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding-left: 80px;
`;
