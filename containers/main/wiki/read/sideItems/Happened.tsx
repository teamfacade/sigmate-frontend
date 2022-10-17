import { memo } from 'react';
import styled from 'styled-components';
import { MultiLineEllipsis } from 'components/global';
import { Platform, TimeDiff } from 'components/main/wiki/read/sideItems';
import styles from 'styles/styleLib';

type PropsType = {
  platform: 't' | 'd';
  timestamp: string;
  content: string;
};

export default memo(function Happened({
  platform,
  timestamp,
  content,
}: PropsType) {
  return (
    <Wrapper>
      <InfoWrapper>
        <Platform platform={platform} />
        <InfoInnerWrapper>
          <Author>{platform === 't' ? 'Twitter' : 'Discord'}</Author>
          <TimeDiff platform={platform} timestamp={timestamp} />
        </InfoInnerWrapper>
      </InfoWrapper>
      <EllipsisText line={4} lineHeight="17px">
        {content}
      </EllipsisText>
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

const EllipsisText = styled(MultiLineEllipsis)`
  width: 100%;
  margin: 5px 0 0 0;
  color: ${styles.colors.logColor};
  font-size: 13px;
  font-weight: 300;
`;
