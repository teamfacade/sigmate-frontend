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
import { Block, Button } from './index';

type PropsType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  onClickSelect: (id: number, tag: string) => void;
};

export default memo(function Heading({
  title,
  onClickSelect,
  setTitle,
}: PropsType) {
  const [value, setValue] = useState(title);
  const [showTextarea, setShowTextarea] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowTextarea(true),
    []
  );
  const onFocus: FocusEventHandler<HTMLButtonElement> = useCallback(
    () => setShowTextarea(true),
    []
  );
  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    []
  );

  const onBlur: FocusEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setTitle(e.target.value);
    setShowTextarea(false);
  }, []);

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      if (e.code === 'Escape') {
        setTitle(e.target.value);
        setShowTextarea(false);
      }
    },
    []
  );
  return (
    <Block id={0} onClickSelect={onClickSelect} isTitle>
      <Button onClick={onClick} onFocus={onFocus}>
        {showTextarea ? (
          <textarea
            autoFocus
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
  margin: 0 0 40px 0;
`);
