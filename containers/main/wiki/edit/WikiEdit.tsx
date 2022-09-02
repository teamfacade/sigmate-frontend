import { useCallback, SetStateAction, Dispatch, memo } from 'react';
import styled from 'styled-components';
import { EditBlock } from 'containers/main/wiki/edit';
import { Title, EditableTitle, EditKeyInfo } from 'components/main/wiki/edit';
import { Types } from 'components/main/wiki/read';
import { SelectTypes } from 'components/main/wiki/new';
import styles from 'styles/styleLib';

export type ArticleType = {
  title: string;
  blocks: BlockType[];
};

type PropsType = {
  newArticle: boolean;
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  types?: string[];
  onChangeTypes?: MultiSelectChangeEventHandler;
  blocks: BlockType[];
  setBlocks: Dispatch<SetStateAction<BlockType[]>>;
};

const createNewBlock = (tag: string) => ({
  id: Date.now(),
  tag,
  content: '',
});

export default memo(function WikiEdit({
  newArticle,
  title,
  types = [],
  onChangeTypes,
  setTitle,
  blocks,
  setBlocks,
}: PropsType) {
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
      {!newArticle && (
        <>
          <Title title={title} onClickSelect={onClickSelect} />
          <SelectTypes
            onChange={onChangeTypes as MultiSelectChangeEventHandler}
          />
        </>
      )}
      <ContentWrapper>
        {newArticle && (
          <EditableTitle
            title={title}
            setTitle={setTitle}
            onClickSelect={onClickSelect}
          />
        )}
        <Types types={types} />
        <EditKeyInfo
          name="Sigmate"
          thumbnailUrl=""
          team="sigmate"
          rugpool=""
          type=""
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
  overflow-y: auto;
`;
