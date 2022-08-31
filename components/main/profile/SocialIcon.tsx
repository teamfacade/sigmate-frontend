import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Discord, Twitter } from 'public/Icons/main/profile';

type PropsType = {
  platform: string;
};

const Icons: StringKeyObj<typeof Discord> = {
  Discord,
  Twitter,
};

export default function SocialIcon({ platform }: PropsType) {
  const Icon = Icons[platform];

  return (
    <Background platform={platform}>
      <Icon />
    </Background>
  );
}

const Background = styled.div<{ platform: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 8px;
  background-color: ${({ platform }) => {
    switch (platform) {
      case 'Discord':
        return styles.colors.discordBackgroundColor;
      case 'Twitter':
        return '#48B5FF';
      default:
        return 'transparent';
    }
  }};
`;
