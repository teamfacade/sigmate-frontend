import { memo } from 'react';
import styled from 'styled-components';
import {
  Platform,
  TimeDiff,
  EllipsisText,
} from 'components/main/wiki/read/sideItems';
import styles from 'styles/styleLib';

type PropsType = {
  index: number;
  platform: string;
  author: string;
  timestamp: string;
  content: string;
};

export default memo(function Happened({
  index,
  platform,
  author,
  timestamp,
  content,
}: PropsType) {
  return (
    <Wrapper>
      <InfoWrapper>
        <Platform platform={platform} />
        <InfoInnerWrapper>
          <Author>{author}</Author>
          <TimeDiff index={index} timestamp={timestamp} />
        </InfoInnerWrapper>
      </InfoWrapper>
      <EllipsisText height="63px" maxWord={95} content={content} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  & + & {
    margin-top: 15px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  padding-bottom: 9px;
  border-bottom: 1px solid ${styles.colors.hrColor};
`;

const InfoInnerWrapper = styled.div`
  position: relative;
  top: -2px;
  height: 42px;
  margin-left: 9px;
`;

const Author = styled.p`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 16px;
  font-weight: 700;
  line-height: 160%;
`;
