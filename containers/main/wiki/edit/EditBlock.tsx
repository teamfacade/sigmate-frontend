import {
  memo,
  useState,
  useCallback,
  useEffect,
  useRef,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import { Block, Button, EditComponent } from 'components/main/wiki/edit';

type PropsType = {
  id: number;
  element: string;
  content: string;
  onClickSelect: (id: number, tag: string) => void;
  onFinishFix: (id: number, content: string) => void;
  removeBlock: (id: number) => void;
};

export default memo(function EditBlock({
  id,
  element,
  content,
  onClickSelect,
  onFinishFix,
  removeBlock,
}: PropsType) {
  const [showInput, setShowInput] = useState(false);
  const [value, setValue] = useState(content);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
    setShowInput(true);
  }, []);

  const onFocus: FocusEventHandler<HTMLButtonElement> = useCallback(
    () => setShowInput(true),
    []
  );

  const updateBlockContent: (blockId: number, blockValue: string) => void =
    useCallback(
      (blockId, blockValue) => {
        if (blockValue !== '') {
          onFinishFix(blockId, blockValue);
          setShowInput(false);
        } else removeBlock(blockId);
      },
      [onFinishFix, removeBlock]
    );

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => updateBlockContent(id, e.target.value),
    [id, updateBlockContent]
  );

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.code === 'Escape') updateBlockContent(id, e.target.value);
    },
    [id, updateBlockContent]
  );

  /** Textarea의 높이가 줄이 늘어나면 똑같이 늘어나도록 해줌 */
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    e.target.style.height = `${e.target.scrollHeight}px`;
    setValue(e.currentTarget.value);
  }, []);

  return (
    <Block id={id} onClickSelect={onClickSelect} removeBlock={removeBlock}>
      <Button onClick={onClick} onFocus={onFocus}>
        <EditComponent
          element={element}
          content={content}
          showInput={showInput}
          value={value}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
        />
      </Button>
    </Block>
  );
});
