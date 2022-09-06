import { memo, MouseEventHandler, useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { darken } from 'polished';
import styles from 'styles/styleLib';
import {
  EllipsisText,
  PFP,
  Platform,
  TimeDiff,
} from 'components/main/wiki/read/sideItems';
import { FullText } from 'components/main/wiki/read/sideItems/modal';

type PropsType = {
  index?: number;
  header: string;
  platform: string;
  PFPUrl: string;
  author: string;
  timestamp: string;
  content: string;
};

const maxWord = 190;

export default memo(function Content({
  index = -1,
  header,
  platform,
  PFPUrl,
  author,
  timestamp,
  content,
}: PropsType) {
  const [showMore, setShowMore] = useState(false);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    () => setShowMore((current) => !current),
    []
  );

  return (
    <Wrapper>
      <InfoWrapper>
        {header === 'Debate' ? (
          <PFP PFPUrl={PFPUrl} />
        ) : (
          <Platform platform={platform} />
        )}
        <InfoInnerWrapper>
          {header === 'Debate' ? (
            <Link href={`/main/profile/${author}`} passHref>
              <Author>{author}</Author>
            </Link>
          ) : (
            <NoLinkAuthor>{author}</NoLinkAuthor>
          )}
          <TimeDiff index={index} timestamp={timestamp} />
        </InfoInnerWrapper>
      </InfoWrapper>
      {content.length < maxWord || showMore ? (
        <FullText
          content={content}
          onClick={onClick}
          showHide={maxWord < content.length}
        />
      ) : (
        <EllipsisText height="42px" maxWord={maxWord} content={content}>
          <UnfoldBtn onClick={onClick}>See more</UnfoldBtn>
        </EllipsisText>
      )}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 14px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};

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

const NoLinkAuthor = styled(Author)`
  cursor: initial;
`;

const UnfoldBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: -2px;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: ${styles.colors.emphColor};
  font-size: 14px;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  :hover,
  :active {
    color: ${darken(0.3, styles.colors.emphColor)};
  }
`;
