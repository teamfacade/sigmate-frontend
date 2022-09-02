import {
  memo,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useRef,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import styled from 'styled-components';
import BlueBtn from 'components/main/wiki/BlueBtn';
import styles from 'styles/styleLib';

type PropsType = {
  opinion: string;
  showOpinion: boolean;
  setOpinion: Dispatch<SetStateAction<string>>;
};

export default memo(function OpinionInput({
  opinion,
  showOpinion,
  setOpinion,
}: PropsType) {
  const [value, setValue] = useState(opinion);
  const [edit, setEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    []
  );
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (edit && textareaRef.current) {
      setEdit(false);
      setOpinion(textareaRef.current.value);
    } else setEdit(true);
  }, [edit, textareaRef]);

  return (
    <Wrapper show={showOpinion}>
      <Header>
        <span>Opinion</span>
        <span>{' (optional)'}</span>
      </Header>
      <p>
        Your opinion will be visible to the community along with your verdict.
      </p>
      <TextArea
        placeholder="Tell the community why you made this verdict"
        name="input"
        value={value}
        onChange={onChange}
        ref={textareaRef}
      />
      <BlueBtn
        margin="16px 0 0 0"
        width="100%"
        disabled={value === ''}
        onClick={onClick}
      >
        {!edit && opinion === '' ? 'Post' : 'Edit'}
      </BlueBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div<{ show: boolean }>`
  height: 150px;
  padding: 19px 0 34px;
  margin-top: ${({ show }) => (show ? '0' : '-100%')};
  transition: all 300ms ease-in-out;

  p {
    margin: 0 0 13px 0;
    color: ${styles.colors.verdictModalTextColor};
    font-size: 14px;
    line-height: 140%;
    font-weight: 300;
  }

  span {
    margin: 0;
    color: ${styles.colors.verdictModalTextColor};
  }
`;

const Header = styled.div`
  span {
    font-size: 16px;
    line-height: 160%;
  }

  span:first-child {
    font-weight: 500;
  }

  span:last-child {
    font-weight: 100;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 114px;
  padding: 14px 20px;
  border-radius: 8px;
  border: 1px solid ${styles.colors.lightBorderColor};
  background-color: ${styles.colors.tableRowColor};
  color: ${styles.colors.headerColor};
  font-size: 16px;
  font-weight: 300;
  line-height: 160%;
  font-family: 'Inter', sans-serif;
  resize: none;

  ::placeholder {
    color: ${styles.colors.verdictModalTextColor};
    font-weight: 100;
  }

  :focus-visible {
    outline: none;
  }
`;
