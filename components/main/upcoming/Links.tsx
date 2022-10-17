import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Discord, Telegram, Twitter, Wiki } from 'public/Icons/main/upcoming';

type PropsType = {
  wikiPageUrl: string;
  twitterUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;
};

export default memo(function Links({
  wikiPageUrl,
  twitterUrl,
  telegramUrl,
  discordUrl,
}: PropsType) {
  return (
    <OutlinkWrapper>
      <Link href={wikiPageUrl}>
        <a onClick={(e) => e.stopPropagation()}>
          <Wiki />
        </a>
      </Link>
      {discordUrl && (
        <Link href={discordUrl}>
          <a onClick={(e) => e.stopPropagation()}>
            <Discord />
          </a>
        </Link>
      )}
      {twitterUrl && (
        <Link href={`https://www.twitter.com/${twitterUrl}`}>
          <a onClick={(e) => e.stopPropagation()}>
            <Twitter />
          </a>
        </Link>
      )}
      {telegramUrl && (
        <Link href={telegramUrl}>
          <a onClick={(e) => e.stopPropagation()}>
            <Telegram />
          </a>
        </Link>
      )}
    </OutlinkWrapper>
  );
});

const OutlinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 12px 0 0 0;

  a + a {
    margin-left: 18px;
  }
`;
