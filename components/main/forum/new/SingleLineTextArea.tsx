import { forwardRef, memo, ChangeEventHandler, FocusEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  name: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
};

export default memo(
  forwardRef<HTMLTextAreaElement, PropsType>(function SingleLineTextArea(
    { name, value, onChange, onBlur },
    ref
  ) {
    return (
      <div>
        <Name>{name}</Name>
        <TextArea
          name={name}
          rows={1}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          ref={ref}
        />
      </div>
    );
  })
);

const Name = styled.p`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 16px;
  font-weight: 500;
  line-height: 140%;
`;

const TextArea = styled.textarea<{ name: string }>`
  width: 100%;
  padding: 10px 24px 12px;
  margin: 6px 0 0 0;
  border-radius: 8px;
  border: 1px solid ${styles.colors.darkBorderColor};
  background-color: ${styles.colors.tableRowColor};
  ${({ name }) =>
    name === 'Title'
      ? `
                    color: ${styles.colors.headerColor};
                    font-size: 18px;
                    font-weight: 700;
                  `
      : `
                    color: ${styles.colors.logColor};
                      font-size: 15px;
                      font-weight: 300;
                      line-height: 160%;
                  `}

  font-family: 'Inter', sans-serif;
  resize: none;

  :focus-visible {
    outline: none;
  }
`;
