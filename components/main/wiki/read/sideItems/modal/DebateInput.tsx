import {
  memo,
  useState,
  useCallback,
  ChangeEventHandler,
  MouseEventHandler,
  forwardRef,
} from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { WriteComment } from 'public/Icons/main/forum';

type PropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(
  forwardRef<HTMLTextAreaElement, PropsType>(function DebateInput(
    { onClick },
    ref
  ) {
    const [value, setValue] = useState('');

    const onChange: ChangeEventHandler<HTMLTextAreaElement> = useCallback(
      (e) => setValue(e.currentTarget.value),
      []
    );

    return (
      <Wrapper>
        <Textarea
          placeholder="Type here"
          rows={1}
          value={value}
          onChange={onChange}
          ref={ref}
        />
        <WriteBtn disabled={value === ''} onClick={onClick}>
          <WriteComment />
        </WriteBtn>
      </Wrapper>
    );
  })
);

const Wrapper = styled.div`
  position: absolute;
  top: 56px;
  left: 1px;
  display: flex;
  align-items: center;
  width: 99%;
  padding: 4px 17px;
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
  z-index: 2;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  padding: 0;
  border: none;
  background-color: transparent;
  color: ${styles.colors.logColor};
  font-size: 13px;
  font-weight: 300;
  line-height: 160%;
  font-family: 'Inter', sans-serif;
  resize: none;

  :focus-visible {
    outline: none;
  }

  ::placeholder {
    color: #c4c4c4;
    font-weight: 700;
  }
`;

const WriteBtn = styled.button`
  position: relative;
  top: 1px;
  padding: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;

  svg {
    path {
      fill: ${styles.colors.emphColor};
      transition: all 300ms;
    }
  }

  :disabled {
    svg {
      path {
        fill: ${styles.colors.emptyColor};
      }
    }
  }
`;
