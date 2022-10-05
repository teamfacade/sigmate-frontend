import { memo } from 'react';
import styled from 'styled-components';
import {
  PFP,
  TimeDiff,
  EllipsisText,
} from 'components/main/wiki/read/sideItems';
import styles from 'styles/styleLib';
import Link from 'next/link';

type PropsType = {
  index: number;
  PFPUrl: string;
  author: string;
  timestamp: string;
  content: string;
};

export default memo(function DebateItem({
  PFPUrl,
  author,
  timestamp,
  content,
}: PropsType) {
  return (
    <Wrapper>
      <InfoWrapper>
        <PFP PFPUrl={PFPUrl} />
        <InfoInnerWrapper>
          <Link href={`/main/profile/${author}`} passHref>
            <Author>{author}</Author>
          </Link>
          <TimeDiff platform="" timestamp={timestamp} />
        </InfoInnerWrapper>
      </InfoWrapper>
      <EllipsisText height="63px" content={content} />
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

const Author = styled.a`
  margin: 0;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 700;
  line-height: 160%;
`;
