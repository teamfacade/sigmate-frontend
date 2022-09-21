import styled from 'styled-components';
import { Title, InfoTable } from 'components/landing/Calendar';
import styles from 'styles/styleLib';

export default function Calendar() {
  return (
    <Wrapper>
      <div>
        <Title />
        <Text>
          Catching up with NFT schedules is difficult. We make it easier for
          you.
        </Text>
        <InfoTable
          title="Minting Calendar"
          description="Provides all the information of upcoming NFT minting schedules"
        />
        <InfoTable
          title="Personal Calendar"
          description="Select watchlist of your interest and keep your alarmed with Personal Calendar"
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 42px 72px 85px;
  background-color: ${styles.colors.emptyColor};

  > div {
    position: relative;
    max-width: 1280px;
    margin: auto;
  }
`;

const Text = styled.p`
  margin: 0 0 60px 0;
  color: ${styles.colors.darkTextColor};
  font-size: 20px;
  font-weight: 400;
  line-height: 180%;
  white-space: pre-wrap;
`;
