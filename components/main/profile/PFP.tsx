import Image from 'next/image';
import { ImageWrapper } from 'components/global';

import UserImgEx from 'public/Icons/user/account/UserImageEx.png';

type PropsType = {
  PFPUrl: string;
};

export default function PFP({ PFPUrl }: PropsType) {
  return (
    <ImageWrapper width="170px" height="170px">
      <Image src={PFPUrl || UserImgEx} alt="profile pic" layout="fill" />
    </ImageWrapper>
  );
}
