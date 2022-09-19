import styled from 'styled-components';
import { Feature } from 'components/landing/Features';
import styles from 'styles/styleLib';

const features: string[] = [
  'Wiki',
  'Offchain',
  'Calendar',
  'Membership',
  'CrossValidation',
  'Raffle',
  'Community',
  'Correlation',
  'Write2Earn',
];

export default function Features() {
  return (
    <Wrapper>
      <FeaturesWrapper>
        {features.map((feature) => {
          return <Feature key={feature} feature={feature} />;
        })}
      </FeaturesWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  padding: 52px;
  background-color: ${styles.colors.lightThumbsUpColor};
`;

const FeaturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  > div {
    position: relative;
    width: calc(33% - 28px);
    min-width: 300px;
    aspect-ratio: 1.56;
    margin: 14px;
  }
`;