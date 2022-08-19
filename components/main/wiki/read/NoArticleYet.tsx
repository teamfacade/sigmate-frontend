import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  title: string;
};

export default function NoArticleYet({ title }: PropsType) {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <FlexWrapper>
        <p>Can&apos;t find what you are looking for?</p>
        <button type="button">Create new article</button>
      </FlexWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  h1 {
    margin: 0 0 18px 0;
    color: ${styles.colors.logoColor};
    font-size: 40px;
    font-weight: bold;
    line-height: 110%;
    text-align: left;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    margin: 0 290px 0 0;
    color: ${styles.colors.logColor};
    font-size: 18px;
  }

  button {
    width: 255px;
    height: 41px;
    border: none;
    border-radius: 8px;
    background-color: ${styles.colors.emphColor};
    color: #ffffff;
    font-size: 18px;
    cursor: pointer;
  }
`;
