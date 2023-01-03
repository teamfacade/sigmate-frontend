import {
  useCallback,
  SetStateAction,
  Dispatch,
  memo,
  MutableRefObject,
} from 'react';
import styled from 'styled-components';
import { createNewBlock } from 'lib/main/wiki/utils';
import { EditBlock } from 'containers/main/wiki/edit';
import { SectionWrapper } from 'components/global';
import { EditableTitle, EditKeyInfo } from 'components/main/wiki/edit';
import { SelectTypes } from 'components/main/wiki/new';
import styles from 'styles/styleLib';

import dynamic from 'next/dynamic';

const NewEditor = dynamic(() => import('containers/main/wiki/edit/NewEditor'), {
  ssr: false,
});

type PropsType = {
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  types?: ReactSelect.OptionType[];
  onChangeTypes?: ReactSelect.MultiSelectChangeEventHandler;
  blocks: Wiki.DocumentBlockType[];
  setBlocks: Dispatch<SetStateAction<Wiki.DocumentBlockType[]>>;
  keyInfo?: Wiki.KeyInfoType;
  editorCoreRef: MutableRefObject<null>;
};

export default memo(function WikiEdit({
  title,
  types = [],
  onChangeTypes,
  setTitle,
  blocks,
  setBlocks,
  keyInfo,
  editorCoreRef,
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
          if (block.id === id) return { ...block, textContent: content };
          return block;
        })
      );
    },
    []
  );

  return (
    <SectionWrapper header="Edit document">
      <ContentWrapper id="content-wrapper">
        <EditableTitle
          title={title}
          setTitle={setTitle}
          onClickSelect={onClickSelect}
        />
        <SelectTypes
          value={types}
          onChange={onChangeTypes as ReactSelect.MultiSelectChangeEventHandler}
        />
        {keyInfo && <EditKeyInfo keyInfos={keyInfo} />}
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
        <NewEditor editorCoreRef={editorCoreRef} />
      </ContentWrapper>
    </SectionWrapper>
  );
});

const ContentWrapper = styled.div`
  padding: 39px 49px 220px 60px;
  border: 1px solid ${styles.colors.darkBorderColor};
  border-radius: 8px;
  background-color: ${styles.colors.tableRowColor};
  overflow-y: auto;
`;
