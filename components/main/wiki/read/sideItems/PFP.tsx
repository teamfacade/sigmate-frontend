import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { DefaultPFP } from 'public/Icons/main/forum';

type PropsType = {
  PFPUrl: string;
};

export default memo(function PFP({ PFPUrl }: PropsType) {
  return (
    <Wrapper>
      <ImageWrapper width="42px" height="42px">
        <Image src={PFPUrl || DefaultPFP} alt="Profile pic" layout="fill" />
      </ImageWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid;
`;
