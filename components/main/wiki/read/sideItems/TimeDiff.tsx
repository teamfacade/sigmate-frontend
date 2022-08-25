import { memo } from 'react';
import styled from 'styled-components';
import { getPrettyTimeDiff } from 'hooks/calcTimeDiff';
import styles from 'styles/styleLib';

type PropsType = {
  index: number;
  timestamp: string;
};

export default memo(function TimeDiff({ index, timestamp }: PropsType) {
  return <Wrapper index={index}>{getPrettyTimeDiff(timestamp)}</Wrapper>;
});

const Wrapper = styled.div<{ index: number }>`
  height: 18px;
  padding: 1px 10px;
  margin: 3px 0 0 0;
  border-radius: 3px;
  text-align: center;
  font-size: 10px;
  font-weight: 900;
  line-height: 16px;

  ${({ index }) => {
    switch (index % 3) {
      case 0:
        return `
                background-color: ${styles.colors.metamaskBackgroundColor};
                color: ${styles.colors.metamaskNameColor};
              `;
      case 1:
        return `
                background-color: ${styles.colors.discordBackgroundColor};
                color: ${styles.colors.discordNameColor};
              `;
      case 2:
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
