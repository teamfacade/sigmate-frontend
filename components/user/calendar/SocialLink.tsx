import Link from 'next/link';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Twitter, Discord, Telegram } from 'public/Icons/user/calender';

const Icons: StringKeyObj<typeof Twitter> = {
  Twitter,
  Discord,
  Telegram,
};

type PropsType = {
  platform: string;
  url: string;
};

export default function SocialLink({ platform, url }: PropsType) {
  const Icon = Icons[platform];

  return (
    <Link href={url}>
      <a>
        <Btn platform={platform}>
          <Icon />
        </Btn>
      </a>
    </Link>
  );
}

const Btn = styled.button<{ platform: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  border: none;
  background-color: ${({ platform }) => {
    switch (platform) {
      case 'Twitter':
        return styles.colors.twitterLogoColor;
      case 'Telegram':
        return styles.colors.telegramBgColor;
      case 'Discord':
        return styles.colors.discordBackgroundColor;
      default:
        return 'transparent';
    }
  }};
`;
