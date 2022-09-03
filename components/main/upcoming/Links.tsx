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
        <a>
          <Wiki />
        </a>
      </Link>
      {discordUrl && (
        <Link href={discordUrl}>
          <a>
            <Discord />
          </a>
        </Link>
      )}
      {twitterUrl && (
        <Link href={twitterUrl}>
          <a>
            <Twitter />
          </a>
        </Link>
      )}
      {telegramUrl && (
        <Link href={telegramUrl}>
          <a>
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
