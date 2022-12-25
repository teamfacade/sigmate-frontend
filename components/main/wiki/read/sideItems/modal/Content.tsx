import { memo, MouseEventHandler, useCallback, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { MultiLineEllipsis } from 'components/global';
import { PFP, Platform, TimeDiff } from 'components/main/wiki/read/sideItems';
import { FullText } from 'components/main/wiki/read/sideItems/modal';
import dynamic from 'next/dynamic';

type PropsType = {
  header: string;
  platform: string;
  PFPUrl: string | null;
  author: string | null;
  timestamp: string;
  content: string;
};

const maxWord = 190;

const DynamicMarkdown = dynamic(
  () => import('components/main/wiki/read/MarkdownRendered'),
  {
    ssr: false,
  }
);

export default memo(function Content({
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
          <PFP PFPUrl={PFPUrl || ''} />
        ) : (
          <Platform platform={platform} />
        )}
        <InfoInnerWrapper>
          {header === 'Debate' ? (
            <Link href={`/main/profile/${author}`} passHref>
              <Author>{author}</Author>
            </Link>
          ) : (
            <NoLinkAuthor>
              {platform === 't' ? 'Twitter' : 'Discord'}
            </NoLinkAuthor>
          )}
          <TimeDiff platform={platform} timestamp={timestamp} />
        </InfoInnerWrapper>
      </InfoWrapper>
      {content.length < maxWord || showMore ? (
        <FullText
          content={content}
          onClick={onClick}
          showHide={maxWord < content.length}
        />
      ) : (
        <>
          <EllipsisText line={2} lineHeight="130%">
            <DynamicMarkdown content={content} />
          </EllipsisText>
          <BtnWrapper>
            <UnfoldBtn onClick={onClick}>
              <strong>See more</strong>
            </UnfoldBtn>
          </BtnWrapper>
        </>
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

  :hover,
  :active {
    filter: none;
  }
`;

const BtnWrapper = styled.div`
  position: relative;
  height: 17px;
`;

const UnfoldBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: fit-content;
  padding: 0;
  margin: 0;
  border: none;
  background: #ffffff;
  color: ${styles.colors.logColor};
  font-size: 14px;
  font-weight: 300;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  white-space: pre;

  :hover,
  :active {
    filter: none;
  }

  strong {
    font-weight: inherit;
    color: ${styles.colors.emphColor};

    :hover,
    :active {
      filter: brightness(0.7);
    }
  }
`;

const EllipsisText = styled(MultiLineEllipsis)`
  width: 100%;
  margin: 5px 0 0 0;
  color: ${styles.colors.logColor};
  font-size: 16px;
  font-weight: 300;
`;
