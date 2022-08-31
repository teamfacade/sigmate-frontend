import { memo, ChangeEventHandler, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { DisclaimWrapper, Disclaimer } from 'components/main/wiki/edit';
import BlueBtn from 'components/main/wiki/BlueBtn';
import styles from 'styles/styleLib';

type PropsType = {
  summary: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function Summary({
  summary,
  onChange,
  onClick,
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
        <input type="checkbox" required />
        <span>
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance.
        </span>
        <Disclaimer>
          comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et
          Malorum"
        </Disclaimer>
      </DisclaimWrapper>
      <BlueBtn onClick={onClick}>Save</BlueBtn>
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
