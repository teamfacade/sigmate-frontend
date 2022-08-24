import { memo } from 'react';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import Image from 'next/image';
import { DefaultPFP } from 'public/Icons/main/forum';

type PropsType = {
  PFPUrl: string;
};

export default memo(function CommentPFP({ PFPUrl }: PropsType) {
  return (
    <PFPWrapper>
      <ImageWrapper width="48px" height="48px">
        <Image src={PFPUrl || DefaultPFP} alt="PFP" layout="fill" />
      </ImageWrapper>
    </PFPWrapper>
  );
});

const PFPWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 48px;
  overflow: hidden;
  transform: translateY(-50%);
`;
