import Link from 'next/link';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import multiLineEllipsis from '../../../global/MultiLineEllipsis';

type PropsType = {
  id: number;
  title: string;
  textContent: string;
};

export default function SearchResult({ id, title, textContent }: PropsType) {
  return (
    <Wrapper>
      <FlexWrapper>
        <Title>{title}</Title>
        <Link href={`/main/wiki/${id}`}>
          <div>
            <EllipsisText line={3} lineHeight="160%">
              {textContent}
            </EllipsisText>
            <button type="button">Go to document</button>
          </div>
        </Link>
      </FlexWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-top: 1px solid #d7dce4;
  padding: 13px 0 17px 0;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;

  button {
    margin: 0;
    background: none;
    padding: 0;
    border: none;
    font-size: 14px;
    font-weight: bold;
    color: ${styles.colors.emphColor};
    white-space: nowrap;
    float: right;
  }
`;

const EllipsisText = styled(multiLineEllipsis)`
  margin: 0 0 8px 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
`;

const Title = styled.h1`
  margin: 0 0 10px 0;
  color: ${styles.colors.logoColor};
  font-size: 20px;
  font-weight: bold;
  text-align: left;
`;
