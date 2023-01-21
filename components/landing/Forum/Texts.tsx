import styled from 'styled-components';
import styles from 'styles/styleLib';
import { ForumIcon } from 'public/Icons/landingPage';

export default function Texts() {
  return (
    <Wrapper>
      <InnerWrapper>
        <ForumIcon />
        <Title>Forum</Title>
      </InnerWrapper>
      <Explanation>User-based NFT information platform</Explanation>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InnerWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const Title = styled.p`
  margin: 0 0 0 18px;
  color: ${styles.colors.darkTextColor};
  font-size: 57px;
  font-weight: 700;
  line-height: 150%;
`;

const Explanation = styled.p`
  margin: 0 0 40px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 30px;
  font-weight: 500;
  line-height: 150%;
  white-space: nowrap;
`;
