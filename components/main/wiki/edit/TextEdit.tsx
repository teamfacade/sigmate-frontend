import styled from 'styled-components';
import styles from 'styles/styleLib';

const Textarea = styled.textarea`
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
