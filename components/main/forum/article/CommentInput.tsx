import {
  memo,
  useState,
  useCallback,
  useRef,
  ChangeEventHandler,
  MouseEventHandler,
} from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { WriteComment } from 'public/Icons/main/forum';
import styles from 'styles/styleLib';

export default memo(function CommentInput() {
  const [value, setValue] = useState('');
  const TextareaRef = useRef<HTMLTextAreaElement>(null);

  const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => setValue(e.currentTarget.value),
    []
  );
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (TextareaRef.current)
      // eslint-disable-next-line no-alert
      alert(`Add following comment: ${TextareaRef.current.value}`);
  }, [TextareaRef]);

  return (
    <Wrapper>
      <Textarea
        value={value}
        placeholder="What are your thoughts?"
        onChange={onChange}
        ref={TextareaRef}
      />
      <Btn disabled={value === ''} onClick={onClick}>
        <WriteComment />
      </Btn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 145px;
  padding: 15px 18px;
  margin-top: 10px;
  border-radius: 8px;
  border: 1px solid ${styles.colors.dividerColor};
  background-color: ${styles.colors.tableRowColor};
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  font-family: 'Inter', sans-serif;
  resize: none;

  ::placeholder {
    color: #a4adbb;
    font-weight: 500;
  }

  :focus-visible {
    outline: none;
  }
`;

const Btn = styled.button`
  position: absolute;
  right: 8px;
  bottom: 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  svg {
    path {
      transition: all 300ms;
      fill: ${styles.colors.emphColor};
    }
  }

  :hover,
  :active {
    svg {
      path {
        fill: ${darken(0.3, styles.colors.emphColor)};
      }
    }
  }

  :disabled {
    svg {
      path {
        fill: ${styles.colors.logColor};
      }
    }
  }
`;
