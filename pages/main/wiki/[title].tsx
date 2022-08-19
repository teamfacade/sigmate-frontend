import { useState, useCallback } from 'react';
import { BlockComponent } from 'containers/main/wiki';
import styled from 'styled-components';

type BlockType = {
  id: number;
  tag: string;
  content: string;
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

const createNewBlock = (tag: string) => ({
  id: Date.now(),
  tag,
  content: 'Input Contents...',
});

export default function WikiEdit() {
  const [blocks, setBlocks] = useState<BlockType[]>(ExBlocks);

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
      <span>Title: </span>
      <input type="text" />
      <hr />
      {blocks.map((block) => {
        return (
          <BlockComponent
            key={block.id}
            edit
            id={block.id}
            tag={block.tag}
            content={block.content}
            onClickSelect={onClickSelect}
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
