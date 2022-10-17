import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { Discord, Twitter } from 'public/Icons/main/wiki/read/SideItems';

type PropsType = {
  platform: 't' | 'd';
};

const PlatformIcons: StringKeyObj<typeof Discord> = {
  d: Discord,
  t: Twitter,
};

export default memo(function Platform({ platform }: PropsType) {
  const Icon = PlatformIcons[platform];

  return (
    <Wrapper platform={platform}>
      <Icon />
    </Wrapper>
  );
});

const Wrapper = styled.div<{ platform: 't' | 'd' }>`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  border: 1px solid;

  ${({ platform }) => {
    switch (platform) {
      case 'd':
        return `
            border-color: ${styles.colors.discordBorderColor};
            background-color: ${styles.colors.discordBackgroundColor};
          `;
      case 't':
        return `
            border-color: ${styles.colors.twitterBorderColor};
            background-color: ${styles.colors.twitterBackgroundColor};
          `;
      default:
        return ``;
    }
  }}

  svg {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;
