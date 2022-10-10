import Link from 'next/link';
import styled from 'styled-components';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  title: string;
  textContent: string;
};

export default function SearchResult({ id, title, textContent }: PropsType) {
  return (
    <Wrapper>
      <h1>{title}</h1>
      <FlexWrapper>
        <p>{textContent}</p>
        <Link href={`/main/wiki/${id}`}>
          <a>
            <button type="button">Go to document</button>
          </a>
        </Link>
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
  justify-content: end;
  align-items: center;

  @media (max-width: 728px) {
    flex-direction: column;
    align-items: flex-start;

    button {
      margin-top: 20px !important;
    }
  }

  p {
    margin: 0;
    color: ${styles.colors.logColor};
    font-size: 18px;
  }

  button {
    width: 255px;
    height: 41px;
    margin: 0;
    border: none;
    border-radius: 8px;
    background-color: ${styles.colors.emphColor};
    font-size: 18px;
    cursor: pointer;
    text-align: center;
    color: #ffffff;
    white-space: nowrap;
  }
`;
