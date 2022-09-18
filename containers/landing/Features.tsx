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
  padding: 42px;
  background-color: ${styles.colors.lightThumbsUpColor};
`;

const FeaturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    margin: 14px;
  }
`;
