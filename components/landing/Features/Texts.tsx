import Link from 'next/link';
import styled from 'styled-components';
import styles, { BlueBtnStyle } from 'styles/styleLib';
import { BookIcon } from 'public/Icons/landingPage';

export default function Texts() {
  return (
    <Wrapper>
      <BookIcon />
      <Title>{'NFT &\r\nBlockchain Wiki'}</Title>
      <Explanation>User-based NFT information platform</Explanation>
      <Link href="/main/wiki/recent-edits" passHref>
        <ExploreBtn>Explore Collections</ExploreBtn>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 60px;
`;

const Title = styled.p`
  margin: 14px 0 6px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 50px;
  font-weight: 700;
  line-height: 130%;
  white-space: pre;
`;

const Explanation = styled.p`
  margin: 0 0 30px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 500;
  line-height: 180%;
  white-space: nowrap;
`;

const ExploreBtn = styled.button`
  ${BlueBtnStyle};
  height: auto;
  padding: 15px 66px 17px 66px;
  font-size: 21px;
  line-height: 110%;
`;
