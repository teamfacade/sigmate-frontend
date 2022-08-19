import {
  memo,
  useState,
  useCallback,
  MouseEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEventHandler,
} from 'react';
import styled from 'styled-components';
import { EditBlock, Paragraph, Heading } from 'components/main/wiki';

interface StringKeyObj<T> {
  [index: string]: T;
  p: T;
  h: T;
}

type PropsType = {
  edit: boolean;
  id: number;
  tag: string;
  content: string;
  onClickSelect: (id: number, tag: string) => void;
  onFinishFix: (id: number, content: string) => void;
};

const Components: StringKeyObj<typeof Paragraph> = {
  p: Paragraph,
  h: Heading,
};

export default memo(function BlockComponent({
  edit,
  id,
  tag,
  content,
  onClickSelect,
  onFinishFix,
}: PropsType) {
  const [showInput, setShowInput] = useState(edit);
  const [value, setValue] = useState(content);
  const Component = Components[tag];

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowInput(true);
  }, []);

  const onFocus: FocusEventHandler<HTMLButtonElement> = useCallback(
    () => setShowInput(true),
    []
  );

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      onFinishFix(id, e.target.value);
      setShowInput(false);
    },
    [id, onFinishFix]
  );

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        onFinishFix(id, e.target.value);
        setShowInput(false);
      }
    },
    [id, onFinishFix]
  );

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    []
  );

  return (
    <EditBlock id={id} onClickSelect={onClickSelect}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <Button onClick={onClick} onFocus={onFocus}>
        {showInput ? (
          <textarea
            autoFocus
            value={value}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onChange={onChange}
          />
        ) : (
          <Component content={content} />
        )}
      </Button>
    </EditBlock>
  );
});

const Button = styled.button`
  display: block;
  border: none;
  background-color: transparent;
  text-align: left;
`;
