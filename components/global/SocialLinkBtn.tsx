import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import { Twitter, Discord, Telegram, Medium } from 'public/Icons/global';
import styles from 'styles/styleLib';

type PropsType = {
  platform: string;
  iconWidth?: string;
};

type LinkDetailType = {
  icon: typeof Twitter;
  bgColor: string;
  href: string;
};

const Links: StringKeyObj<LinkDetailType> = {
  Twitter: {
    icon: Twitter,
    bgColor: styles.colors.twitterLogoColor,
    href: 'https://twitter.com/OfficialSigmate',
  },
  Discord: {
    icon: Discord,
    bgColor: '#6175C3',
    href: 'https://discord.gg/jzwrEkbmwZ',
  },
  Telegram: {
    icon: Telegram,
    bgColor: '#03AFE5',
    href: 'https://t.me/officialsigmate',
  },
  Medium: {
    icon: Medium,
    bgColor: '#12100E',
    href: 'https://medium.com/@officialsigmate',
  },
};

export default memo(function SocialLinkBtn({
  platform,
  iconWidth = '36px',
}: PropsType) {
  return (
    <Link href={Links[platform].href} passHref>
      <a target="_blank">
        <Div bgColor={Links[platform].bgColor}>
          <ImageWrapper width={iconWidth} height={iconWidth}>
            <Image src={Links[platform].icon} layout="responsive" priority />
          </ImageWrapper>
        </Div>
      </a>
    </Link>
  );
});

const Div = styled.button<{ bgColor: string }>`
  background-color: ${({ bgColor }) => bgColor};
`;
