import { memo } from 'react';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { EllipsisText, PFP, Platform, TimeDiff } from '../index';

type PropsType = {
  index?: number;
  platform: string;
  PFPUrl: string;
  author: string;
  timestamp: string;
  content: string;
};

export default memo(function Content({
  index = -1,
  platform,
  PFPUrl,
  author,
  timestamp,
  content,
}: PropsType) {
  return (
    <Wrapper>
      <InfoWrapper>
        {PFPUrl ? <PFP PFPUrl={PFPUrl} /> : <Platform platform={platform} />}
        <InfoInnerWrapper>
          <Author>{author}</Author>
          <TimeDiff index={index} timestamp={timestamp} />
        </InfoInnerWrapper>
      </InfoWrapper>
      <EllipsisText height="42px" maxWord={160} content={content} />
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
  font-size: 14px;
  font-weight: 700;
  line-height: 160%;
`;
