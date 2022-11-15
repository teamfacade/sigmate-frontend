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
  onClickLink: MouseEventHandler<HTMLAnchorElement>;
  PFPUrl?: string;
  name: string;
  description?: string;
};

export default memo(function Profile({
  signedIn,
  onClickSignOut,
  onClickLink,
  PFPUrl = '',
  name,
  description,
}: PropsType) {
  if (!signedIn)
    return (
      <Wrapper>
        <Link href="/auth" passHref>
          <a>
            <ImageWrapper width="50px" height="50px" borderRadius="50px">
              <Image
                src={PFPUrl || DefaultProfile}
                alt="Profile image"
                layout="fill"
              />
            </ImageWrapper>
          </a>
        </Link>
        <Link href="/auth" passHref>
          <a>
            <TextWrapper signedIn={signedIn}>
              <Name>Sign in</Name>
              <Description />
            </TextWrapper>
          </a>
        </Link>
        <Link href="/auth" passHref>
          <a>
            <TransparentBtn>
              <SettingsIcon />
            </TransparentBtn>
          </a>
        </Link>
      </Wrapper>
    );
  return (
    <Wrapper>
      <Link href="/user" passHref>
        <a onClick={onClickLink}>
          <ImageWrapper width="50px" height="50px" borderRadius="50px">
            <Image
              src={PFPUrl || DefaultProfile}
              alt="Profile image"
              layout="fill"
            />
          </ImageWrapper>
        </a>
      </Link>
      <Link href="/user" passHref>
        <a onClick={onClickLink}>
          <TextWrapper signedIn={signedIn}>
            <Name>{name}</Name>
            <Description>{description}</Description>
          </TextWrapper>
        </a>
      </Link>
      <TransparentBtn onClick={onClickSignOut}>
        <SignOut />
      </TransparentBtn>
      <Link href="/user" passHref>
        <a onClick={onClickLink}>
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

  @media (max-width: 1280px) {
    margin-left: 0;
  }
`;

const TextWrapper = styled.div<{ signedIn: boolean }>`
  flex: 0 0 auto;
  min-width: ${({ signedIn }) => (signedIn ? '80px' : '116px')};
  margin: 0 20px 0 20px;
`;

const Name = styled.p`
  max-width: 85px;
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

  & + & {
    padding-right: 0;
  }
`;
