import { useState, useCallback } from 'react';
import { EditBlock } from 'containers/main/wiki';
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

const ExBlocks: BlockType[] = [
  {
    id: 1,
    tag: 'p',
    content:
      'the cites of the word in classical literature, discovere\n' +
      'of "de Finibus Bonorum et Malorum" (The Extremes of G\n' +
      'ethics, very popular during the Renaissance. The first \n' +
      'line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
  },
];

const ExArticle: ArticleType = {
  title: 'Example',
  blocks: ExBlocks,
};

const createNewBlock = (tag: string) => ({
  id: Date.now(),
  tag,
  content: '',
});

export default function WikiEdit() {
  const [title, setTitle] = useState(ExArticle.title);
  const [blocks, setBlocks] = useState<BlockType[]>(ExArticle.blocks);

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
