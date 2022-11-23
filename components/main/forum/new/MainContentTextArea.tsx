import {
  ChangeEventHandler,
  memo,
  MouseEventHandler,
  useCallback,
  useRef,
  useState,
} from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default memo(function MainContentTextArea({
  name,
  value,
  onChange,
}: PropsType) {
  const [imgName, setImgName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    if (inputRef && inputRef.current) inputRef.current.click();
  }, [inputRef]);

  const onChangeImgs: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      e.preventDefault();

      if (e.target.files) {
        const file = e.target.files[0];
        if (file) setImgName(file.name);
      }
    },
    []
  );

  return (
    <Wrapper>
      <TextArea name={name} rows={22} value={value} onChange={onChange} />
      {/*
        <div>
        <EditBtn onClick={onClick}>Upload Images</EditBtn>
        <span>{imgName}</span>
      </div>
      <Input
        type="file"
        onChange={onChangeImgs}
        ref={inputRef}
        accept="image/*"
      />
      */}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 24px;
  margin: 25px 0 17px 0;
  border-radius: 8px;
  border: 1px solid ${styles.colors.darkBorderColor};
  background-color: ${styles.colors.tableRowColor};
`;

const TextArea = styled.textarea`
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  font-family: 'Inter', sans-serif;
  resize: none;

  :focus-visible {
    outline: none;
  }
`;

const EditBtn = styled.button`
  margin: 20px 5px 0 0;
  background-color: #ffffff;
  border: 1px solid ${styles.colors.lightBorderColor};
  border-radius: 8px;
  color: ${styles.colors.logColor};
  font-size: 15px;
  font-weight: 500;
  line-height: 140%;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
`;

const Input = styled.input`
  display: none;
`;
