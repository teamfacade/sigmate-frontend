import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import {
  Wiki,
  Offchain,
  Calendar,
  Membership,
  CrossValidation,
  Raffle,
  Community,
  Correlation,
  Write2Earn,
} from 'public/Icons/landingPage';

type FeatureContentType = {
  img: typeof Wiki;
  textContent: string;
  color: string;
};

type PropsType = {
  feature: string;
};

const featureContents: StringKeyObj<FeatureContentType> = {
  Wiki: {
    img: Wiki,
    textContent: 'Wiki for NFT investors',
    color: '#6166D1',
  },
  Offchain: {
    img: Offchain,
    textContent: 'Offchain Data Tracking',
    color: '#1676CE',
  },
  Calendar: {
    img: Calendar,
    textContent: 'Calendar\r\nKeep you updated with upcoming drops',
    color: '#C53744',
  },
  Membership: {
    img: Membership,
    textContent: 'Benefits with Membership NFT',
    color: '#6166D1',
  },
  CrossValidation: {
    img: CrossValidation,
    textContent: 'Enhance Reliability with\r\nCross-validation System',
    color: '#FC5F6C',
  },
  Raffle: {
    img: Raffle,
    textContent: 'Participate in Raffles with Sigma',
    color: '#1676CE',
  },
  Community: {
    img: Community,
    textContent: 'Build your NFT community\r\nand share your insights',
    color: '#0D9488',
  },
  Correlation: {
    img: Correlation,
    textContent: 'Correlation Algorithm\r\nfor easy evaluation',
    color: '#6166D1',
  },
  Write2Earn: {
    img: Write2Earn,
    textContent: 'Write 2 Earn System',
    color: '#6166D1',
  },
};

export default memo(function Feature({ feature }: PropsType) {
  return (
    <div>
      <ImageWrapper width="100%" height="100%">
        <Image src={featureContents[feature].img} layout="fill" priority />
        <TextContent color={featureContents[feature].color}>
          {featureContents[feature].textContent}
        </TextContent>
      </ImageWrapper>
      <TextContent color={featureContents[feature].color}>
        {featureContents[feature].textContent}
      </TextContent>
    </div>
  );
});

const TextContent = memo(styled.p<{ color: string }>`
  position: absolute;
  left: 50%;
  bottom: 6%;
  margin: 0;
  color: ${({ color }) => color};
  font-size: min(max(1vw, 13px), 15px);
  font-weight: 600;
  line-height: 150%;
  transform: translateX(-50%);
  text-align: center;
  white-space: pre;
`);
