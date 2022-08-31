import { memo, MouseEventHandler } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { DefaultProfile, SettingsIcon, SignOut } from 'public/Icons/navbar';
import styles from 'styles/styleLib';

type PropsType = {
  signedIn: boolean;
  onClickSignOut?: MouseEventHandler<HTMLButtonElement>;
  PFPUrl?: string;
  name: string;
  description?: string;
};

export default memo(function Profile({
  signedIn,
  onClickSignOut,
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
      {signedIn && (
        <TransparentBtn onClick={onClickSignOut}>
          <SignOut />
        </TransparentBtn>
      )}
      <Link href={`${signedIn ? '/user' : '/auth'}`} passHref>
        <a>
          <TransparentBtn>
            <SettingsIcon />
          </TransparentBtn>
        </a>
      </Link>
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
  max-width: 110px;
  margin: 0;
  color: ${styles.colors.profileNameColor};
  font-size: 16px;
  font-weight: 900;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Description = styled.p`
  margin: 0;
  color: ${styles.colors.profileDescriptionColor};
  font-size: 12px;
  font-weight: 700;
`;

const TransparentBtn = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: none;
`;
