import { memo } from 'react';
import styled from 'styled-components';
import { getPrettyTimeDiff } from 'lib/global/calcTimeDiff';
import styles from 'styles/styleLib';

type PropsType = {
  platform: string;
  timestamp: string;
};

export default memo(function TimeDiff({ platform, timestamp }: PropsType) {
  return <Wrapper platform={platform}>{getPrettyTimeDiff(timestamp)}</Wrapper>;
});

const Wrapper = styled.div<{ platform: string }>`
  height: 18px;
  padding: 1px 10px;
  margin: 3px 0 0 0;
  border-radius: 3px;
  text-align: center;
  font-size: 10px;
  font-weight: 900;
  line-height: 16px;

  ${({ platform }) => {
    switch (platform) {
      case 'Else':
        return `
                background-color: ${styles.colors.metamaskBackgroundColor};
                color: ${styles.colors.metamaskNameColor};
              `;
      case 'd':
        return `
                background-color: ${styles.colors.discordBackgroundColor};
                color: ${styles.colors.discordNameColor};
              `;
      case 't':
        return `
                background-color: ${styles.colors.twitterBackgroundColor};
                color: ${styles.colors.twitterNameColor};
              `;
      default:
        return `
                background-color: transparent;
                color: #686868;
                `;
    }
  }}
`;
