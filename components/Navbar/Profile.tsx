import { memo } from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { DefaultProfile, SettingsIcon } from 'public/Icons/navbar';
import styles from 'styles/styleLib';

type PropsType = {
  PFPUrl?: string;
  name: string;
  description?: string;
};

export default memo(function Profile({
  PFPUrl = '',
  name,
  description,
}: PropsType) {
  return (
    <Wrapper>
      <ImageWrapper width="50px" height="50px" borderRadius="50px">
        <Image
          src={PFPUrl || DefaultProfile}
          alt="Profile image"
          layout="fill"
        />
      </ImageWrapper>
      <TextWrapper>
        <Name>{name}</Name>
        <Description>{description}</Description>
      </TextWrapper>
      <SettingsIcon />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  margin-left: 40px;
  cursor: pointer;
`;

const TextWrapper = styled.div`
  flex: 0 0 auto;
  margin: 0 40px 0 20px;
`;

const Name = styled.p`
  margin: 0;
  color: ${styles.colors.profileNameColor};
  font-size: 12px;
  font-weight: bolder;
  font-family: 'Inter', sans-serif;
`;

const Description = styled.p`
  margin: 0;
  color: ${styles.colors.profileDescriptionColor};
  font-size: 10px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;
