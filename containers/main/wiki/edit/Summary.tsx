import { memo, ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { DisclaimWrapper } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';
import styles from 'styles/styleLib';

type PropsType = {
  summary: string;
  pending: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

export default memo(function Summary({
  summary,
  pending,
  onChange,
}: PropsType) {
  return (
    <Wrapper>
      <Heading>Summary</Heading>
      <textarea
        placeholder="Input the reason why you edited this article like this."
        value={summary}
        onChange={onChange}
      />

      <DisclaimWrapper>
        <input id="TOS" type="checkbox" required />
        <label htmlFor="TOS">
          {'By publishing new article, you agree to the '}
          <a
            href="https://sigmate.gitbook.io/sigmate/support/disclaimer"
            target="_blank"
            rel="noreferrer"
          >
            Terms of Use
          </a>
          , and you irrevocably agree to release your contribution under the CC
          BY-SA 3.0 License. You agree that a hyperlink or URL is sufficient
          attribution under the Creative Commons license.
        </label>
      </DisclaimWrapper>
      <BlueBtn type="submit" disabled={pending}>
        {pending ? '...' : 'Save'}
      </BlueBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  margin-top: 29px;

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

const Heading = styled.p`
  display: block;
  margin: 0 0 6px 0;
  color: ${styles.colors.headerColor};
  font-size: 16px;
  font-weight: bold;
  line-height: 140%;
  text-align: left;
`;
