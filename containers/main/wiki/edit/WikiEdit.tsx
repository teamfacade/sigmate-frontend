import { useCallback, SetStateAction, Dispatch, memo } from 'react';
import styled from 'styled-components';
import type { BlockType } from 'lib/main/wiki/getWikiData';
import { EditBlock } from 'containers/main/wiki/edit';
import { Title } from 'components/main/wiki/edit';
import styles from 'styles/styleLib';

export type ArticleType = {
  title: string;
  blocks: BlockType[];
};

type PropsType = {
  title: string;
  blocks: BlockType[];
  setBlocks: Dispatch<SetStateAction<BlockType[]>>;
};

const createNewBlock = (tag: string) => ({
  id: Date.now(),
  tag,
  content: '',
});

export default memo(function WikiEdit({ title, blocks, setBlocks }: PropsType) {
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
    <div>
      <Title title={title} onClickSelect={onClickSelect} />
      <ContentWrapper>
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
      </ContentWrapper>
    </div>
  );
});

const ContentWrapper = styled.div`
  height: 870px;
  padding: 39px 49px 39px 60px;
  border: 1px solid ${styles.colors.darkBorderColor};
  border-radius: 8px;
  background-color: ${styles.colors.tableRowColor};
  overflow-y: scroll;
`;