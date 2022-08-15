import { KeyboardEventHandler, memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  placeholder?: string;
  onChange: KeyboardEventHandler<HTMLTextAreaElement>;
};

export default memo(function InputTemplate({
  name,
  placeholder,
  onChange,
}: PropsType) {
  return (
    <div style={{ width: '470px' }}>
      <Name>{name}</Name>
      <Textarea
        name={name}
        rows={1}
        cols={30}
        maxLength={30}
        placeholder={placeholder}
        autoFocus
        onChange={onChange}
      />
    </div>
  );
});

const Name = styled.p`
  margin: 0 0 20px 0;
  color: ${styles.colors.logoColor};
  font-size: 20px;
  font-weight: bold;
`;

const Textarea = styled.textarea`
  display: block;
  margin: 0 0 30px 0;
  width: 470px;
  height: 40px;
  padding: 9px 10px 7px 10px;
  border: none;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 17px;
  font-family: 'Inter', sans-serif;
  box-shadow: ${styles.shadows.containerShadow};
  resize: none;

  &:focus-visible {
    outline: none;
  }
`;
