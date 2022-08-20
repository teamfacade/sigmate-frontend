import { memo, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  summary: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default memo(function Summary({ summary, onChange }: PropsType) {
  return (
    <Wrapper>
      <p>Summary</p>
      <textarea
        placeholder="Type the reason why you edited this article like this."
        value={summary}
        onChange={onChange}
      />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  margin-top: 29px;

  p {
    display: block;
    margin: 0 0 6px 0;
    color: ${styles.colors.headerColor};
    font-size: 16px;
    font-weight: bold;
    line-height: 140%;
    text-align: left;
  }

  textarea {
    display: block;
    width: 100%;
    height: 46px;
    padding: 4px 8px;
    margin: 0;
    border: 1px solid ${styles.colors.darkBorderColor};
    border-radius: 8px;
    background-color: ${styles.colors.tableRowColor};
    color: ${styles.colors.logColor};
    font-size: 14px;
    line-height: 140%;
    font-family: 'Inter', sans-serif;
    resize: none;

    :focus-visible {
      outline: none;
    }
  }
`;
