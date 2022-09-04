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
import Textarea from './TextEdit';

type PropsType = {
  title: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  onClickSelect: (id: number, tag: string) => void;
};

export default memo(function Heading({
  title,
  onClickSelect,
  setTitle,
}: PropsType) {
  const [value, setValue] = useState(title);
  const [showTextarea, setShowTextarea] = useState(false);

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
      <Button onClick={onClick} onFocus={onFocus}>
        {showTextarea ? (
          <TitleTextarea
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
  height: 45px;
  margin: 0;
  color: ${styles.colors.headerColor};
  font-size: 40px;
  font-weight: 700;
  line-height: 110%;
  font-family: 'Inter', sans-serif;
`);

const TitleTextarea = styled(Textarea)`
  height: 45px;
  vertical-align: top;
  font-size: 40px;
  font-weight: 700;
  line-height: 110%;
`;
