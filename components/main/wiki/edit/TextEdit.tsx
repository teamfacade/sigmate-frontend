import styled from 'styled-components';
import styles from 'styles/styleLib';
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
} from 'react';

type PropsType = {
  isTitle?: boolean;
  placeholder?: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: FocusEventHandler<HTMLTextAreaElement>;
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>;
};

function Textarea({
  isTitle = false,
  placeholder = '',
  value,
  onChange,
  onBlur,
  onKeyDown,
}: PropsType) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /** Textarea의 높이가 value에 맞게 늘어나게끔 해줌 */
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [textareaRef]);

  if (isTitle) {
    return (
      <TitleTextarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        ref={textareaRef}
      />
    );
  }
  return (
    <StyledTextarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      ref={textareaRef}
    />
  );
}

const StyledTextarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  color: ${styles.colors.logColor};
  font-size: 14px;
  line-height: 160%;
  font-family: 'Inter', sans-serif;
  overflow-y: hidden;
  resize: none;

  :focus-visible {
    outline: none;
  }
`;

const TitleTextarea = styled(StyledTextarea)`
  padding: 0;
  vertical-align: top;
  font-size: 40px;
  font-weight: 700;
  line-height: 110%;
`;

const Input = styled.input`
  width: 100%;
  margin: 0;
  border: none;
  background-color: transparent;
  color: ${styles.colors.logColor};
  font-size: 14px;
  line-height: 160%;
  font-family: 'Inter', sans-serif;
  resize: none;

  :focus-visible {
    outline: none;
  }
`;

export { Textarea, Input };
