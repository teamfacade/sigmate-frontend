import Image from 'next/image';
import { ImageWrapper } from 'components/global';
import StakingComingSoon from 'public/Icons/user/staking/StakingComingSoon.png';

export default function Staking() {
  return (
    <ImageWrapper width="80%" height="80%">
      <Image src={StakingComingSoon} alt="Comming soon" layout="fill" />
    </ImageWrapper>
  );
}
