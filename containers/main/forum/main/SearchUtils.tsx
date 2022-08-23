import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

export default memo(function SearchUtils() {
  return (
    <Wrapper>
      <Input />
    </Wrapper>
  );
});

const Wrapper = styled.form`
  position: relative;
  top: 0;
  right: 0;
  width: 430px;
  height: 40px;
  padding: 0 12px;
  margin: 0 0 18px 0;
  border: 1px solid ${styles.colors.lightBorderColor};
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

const Input = styled.input`
  position: absolute;
  top: 6px;
  width: 100%;
  border: none;
  background-color: transparent;
  color: ${styles.colors.logColor};
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 160%;

  :focus-visible {
    outline: none;
  }
`;
