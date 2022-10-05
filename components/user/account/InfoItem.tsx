import { memo, forwardRef } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  edit: boolean;
  header: string;
  content: string;
  inputHeight?: string;
  description: string;
  isValid?: boolean;
};

export default forwardRef<HTMLTextAreaElement, PropsType>(function InfoItem(
  {
    edit,
    header,
    content,
    inputHeight = '40px',
    description,
    isValid = true,
  }: PropsType,
  ref
) {
  return (
    <Wrapper>
      <Header>{header}</Header>
      {edit ? (
        <Textarea
          placeholder={
            header === 'Bio' ? 'Tell us a little bit about yourself' : content
          }
          inputHeight={inputHeight}
          ref={ref}
        />
      ) : (
        <Content inputHeight={inputHeight}>{content}</Content>
      )}
      {description && (
        <Description isValid={isValid}>{description}</Description>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const Header = memo(styled.h2`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: bold;
  white-space: pre;
`);

const Textarea = styled.textarea<{ inputHeight: string }>`
  display: block;
  width: 100%;
  height: ${({ inputHeight }) => inputHeight};
  padding: 5px 10px;
  margin: 0 0 5px 0;
  border: 1px solid ${styles.colors.lightBorderColor};
  border-radius: 8px;
  background-color: #fafbfc;
  color: ${styles.colors.textColor};
  line-height: 27px;
  font-size: 18px;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  resize: none;

  :focus {
    outline: none;
  }

  ::placeholder {
    color: #c4c4c4;
  }
`;

const Content = styled.span<{ inputHeight: string }>`
  display: block;
  height: ${({ inputHeight }) => inputHeight};
  padding: 5px 10px;
  margin: 0 0 5px 0;
  border: 1px solid #dfe0e8;
  border-radius: 8px;
  color: ${styles.colors.textColor};
  line-height: 27px;
  font-size: 18px;
  font-weight: 300;
`;

const Description = memo(styled.p<{ isValid?: boolean }>`
  margin: 12px 0 0 0;
  padding-left: 10px;
  color: ${({ isValid }) => (isValid ? styles.colors.logColor : `#E54646`)};
  font-size: 14px;
  white-space: pre-wrap;
`);
