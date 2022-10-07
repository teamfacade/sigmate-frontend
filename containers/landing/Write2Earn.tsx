import styled from 'styled-components';
import { Title } from 'components/landing/Write2Earn';
import styles from 'styles/styleLib';

export default function Write2Earn() {
  return (
    <Wrapper>
      <div>
        <Title />
        <Bold>User based NFT information platform</Bold>
        <Text>
          {'Editing articles will reward users with Sigma Points based on the word count and the effort. \n' +
            'Once users are given credibility with reliable edits, higher rewards will be compensated.'}
        </Text>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 42px min(72px, calc((100% - 300px) / 2)) 112px;
  background-color: #ffffff;

  > div {
    position: relative;
    max-width: 1280px;
    margin: auto;
  }
`;

const Bold = styled.p`
  margin: 0 0 4px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 20px;
  font-weight: 700;
  line-height: 180%;
`;

const Text = styled.p`
  margin: 0;
  color: ${styles.colors.darkTextColor};
  font-size: 20px;
  font-weight: 400;
  line-height: 180%;
  white-space: pre-wrap;
`;
