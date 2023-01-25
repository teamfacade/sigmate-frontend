import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { ImageWrapper } from 'components/global';
import {
  TwitterUrl,
  DiscordUrl,
  TelegramUrl,
  MediumUrl,
} from 'lib/global/ExternalLinks';
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
    href: TwitterUrl,
  },
  Discord: {
    icon: Discord,
    bgColor: '#6175C3',
    href: DiscordUrl,
  },
  Telegram: {
    icon: Telegram,
    bgColor: '#03AFE5',
    href: TelegramUrl,
  },
  Medium: {
    icon: Medium,
    bgColor: '#12100E',
    href: MediumUrl,
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
