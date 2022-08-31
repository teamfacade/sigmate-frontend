import { memo } from 'react';
import styled from 'styled-components';
import {
  ScheduleThumbnail,
  Links,
  ScheduleInfos,
  ScheduleUtilBtns,
} from 'components/main/upcoming';
import styles from 'styles/styleLib';

type PropsType = {
  event: string;
  collection: string;
  price: string;
  symbol: string;
  tier: number;
  wikiPageUrl?: string;
  twitterUrl?: string;
  telegramUrl?: string;
  discordUrl?: string;
  mintPageUrl: string;
  imageUrl: string;
};

export default memo(function Schedule({
  event,
  collection,
  price,
  symbol,
  tier,
  wikiPageUrl,
  twitterUrl,
  telegramUrl,
  discordUrl,
  mintPageUrl,
  imageUrl,
}: PropsType) {
  return (
    <Wrapper>
      <ScheduleThumbnail event={event} imageUrl={imageUrl} />
      <InnerWrapper>
        <Links
          collection={collection}
          wikiPageUrl={wikiPageUrl}
          twitterUrl={twitterUrl}
          telegramUrl={telegramUrl}
          discordUrl={discordUrl}
        />
        <ScheduleInfos
          event={event}
          collection={collection}
          price={price}
          symbol={symbol}
          tier={tier}
        />
        <ScheduleUtilBtns mintPageUrl={mintPageUrl} />
      </InnerWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 340px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: ${styles.shadows.containerShadow};
`;

const InnerWrapper = styled.div`
  padding: 0 25px 25px 25px;
`;
