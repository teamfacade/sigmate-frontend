import {
  memo,
  SetStateAction,
  useState,
  useCallback,
  MouseEventHandler,
  FocusEventHandler,
  Dispatch,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react';
import styled from 'styled-components';
import { Block, Button } from 'components/main/wiki/edit';
import styles from 'styles/styleLib';
import { Textarea } from './TextEdit';

type PropsType = {
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  onClickSelect: (id: number, tag: string) => void;
};

export default memo(function EditableTitle({
  title,
  onClickSelect,
  setTitle,
}: PropsType) {
  const [value, setValue] = useState(title);
  const [showTextarea, setShowTextarea] = useState(true);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    e.preventDefault();
    setShowTextarea(true);
  }, []);
  const onFocus: FocusEventHandler<HTMLButtonElement> = useCallback(
    () => setShowTextarea(true),
    []
  );
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    []
  );

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    if (setTitle) setTitle(e.target.value);
    setShowTextarea(false);
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        if (setTitle) setTitle(e.target.value);
        setShowTextarea(false);
      }
    },
    []
  );
  return (
    <Block id={0} onClickSelect={onClickSelect} isTitle>
      <Button name="Title" onClick={onClick} onFocus={onFocus}>
        {showTextarea ? (
          <Textarea
            isTitle
            placeholder={title || `Input the title...`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
          />
        ) : (
          <H1>{title}</H1>
        )}
      </Button>
    </Block>
  );
});

const H1 = memo(styled.h1`
  display: block;
  width: 100%;
  padding-right: 13px;
  margin: 0;
  color: ${styles.colors.headerColor};
  font-size: 40px;
  font-weight: 700;
  line-height: 110%;
  font-family: 'Inter', sans-serif;
  overflow-wrap: anywhere;
`);
