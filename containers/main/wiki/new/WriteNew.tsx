import {
  useCallback,
  SetStateAction,
  Dispatch,
  memo,
  ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
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
  onChangeKeyInfos: ChangeEventHandler<HTMLTextAreaElement>;
};

const createNewBlock: (element: string) => Wiki.DocumentBlockType = (
  element: string
) => ({
  id: Date.now(),
  element,
  textContent: '',
  verificationCounts: {
    verifyCount: 0,
    beAwareCount: 0,
  },
  opinionCount: 0,
});

export default memo(function WriteNew({
  topic,
  title,
  onChangeTypes,
  setTitle,
  blocks,
  setBlocks,
  keyInfo,
  onChangeKeyInfos,
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
            <EditKeyInfo
              keyInfos={keyInfo}
              onChangeKeyInfos={onChangeKeyInfos}
            />
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
