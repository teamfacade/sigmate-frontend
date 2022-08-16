import { memo } from 'react';
import Image from 'next/image';
import { ImageWrapper } from 'components/global';
import TokenComingSoon from 'public/Icons/user/points/TokenComingSoon.png';

export default memo(function TokensLog() {
  return (
    <ImageWrapper width="947px" height="947px">
      <Image src={TokenComingSoon} alt="Coming soon" priority />
    </ImageWrapper>
  );
});
