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
  onFinishFix: (id: number, content: string | File, isImage?: boolean) => void;
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
  const [imgBlob, setImgBlob] = useState<File | undefined>(undefined);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (showInput && textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      setValue(textareaRef.current.value);
    }
  }, [textareaRef, showInput]);

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

  /** Used in img block, when no file was chosen. */
  const removeThisBlock: () => void = useCallback(() => removeBlock(id), [id]);

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

  const onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> =
    useCallback(
      (e) => {
        if (e.target instanceof HTMLTextAreaElement) {
          e.target.style.height = `${e.target.scrollHeight}px`;
          setValue(e.currentTarget.value);
        } else if (
          e.target instanceof HTMLInputElement &&
          e.target.type === 'file'
        ) {
          e.preventDefault();
          if (e.target.files) {
            onFinishFix(id, e.target.files[0], true);
            setImgBlob(e.target.files[0]);
          }
        }
      },
      [onFinishFix, id]
    );

  return (
    <Block id={id} onClickSelect={onClickSelect} removeBlock={removeBlock}>
      <Button onClick={onClick} onFocus={onFocus}>
        <EditComponent
          element={element}
          content={content}
          showInput={showInput}
          value={value}
          imgBlob={imgBlob}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          onChange={onChange}
          removeThisBlock={removeThisBlock}
          ref={textareaRef}
        />
      </Button>
    </Block>
  );
});
