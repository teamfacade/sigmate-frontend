import { useCallback, SetStateAction, Dispatch, memo } from 'react';
import styled from 'styled-components';
import { createNewBlock } from 'lib/main/wiki/utils';
import { EditBlock } from 'containers/main/wiki/edit';
import { EditableTitle, EditKeyInfo } from 'components/main/wiki/edit';
import { SelectTypes } from 'components/main/wiki/new';
import styles from 'styles/styleLib';

type PropsType = {
  topic: string;
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  onChangeTypes?: ReactSelect.MultiSelectChangeEventHandler;
  blocks: Wiki.DocumentBlockType[];
  setBlocks: Dispatch<SetStateAction<Wiki.DocumentBlockType[]>>;
  keyInfo: Wiki.KeyInfoType;
};

export default memo(function WriteNew({
  topic,
  title,
  onChangeTypes,
  setTitle,
  blocks,
  setBlocks,
  keyInfo,
}: PropsType) {
  // @todo 언젠가 children 구조가 생기면 setBlocks 로직을 parent id 존재 유무에 따라 바꾸기
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

  const onFinishFix: (id: number, textContent: string) => void = useCallback(
    (id, textContent) => {
      setBlocks((curState) =>
        curState.map((block) => {
          if (block.id === id) return { ...block, textContent };
          return block;
        })
      );
    },
    []
  );

  return (
    <div>
      <ContentWrapper>
        <EditableTitle
          title={title}
          setTitle={setTitle}
          onClickSelect={onClickSelect}
        />
        {topic !== 'Others' && (
          <>
            <SelectTypes
              onChange={
                onChangeTypes as ReactSelect.MultiSelectChangeEventHandler
              }
            />
            <EditKeyInfo keyInfos={keyInfo} />
          </>
        )}
        {blocks.map((block) => {
          return (
            <EditBlock
              key={block.id}
              id={block.id}
              element={block.element}
              content={block.textContent}
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
  height: 1280px;
  padding: 39px 49px 39px 60px;
  border: 1px solid ${styles.colors.darkBorderColor};
  border-radius: 8px;
  background-color: ${styles.colors.tableRowColor};
  overflow-y: auto;
`;
