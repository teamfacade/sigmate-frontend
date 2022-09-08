import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import {
  ScheduleThumbnail,
  Links,
  ScheduleInfos,
  ScheduleUtilBtns,
} from 'components/main/upcoming';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  name: string;
  category: string;
  tier: number;
  mintingUrl?: string;
  mintingPrice?: string;
  mintingPriceSymbol?: string; // ETH/KLAYTN/SOL/Matic
  wikiPageUrl: string;
  twitterUrl?: string;
  discordUrl?: string;
  websiteUrl?: string;
  telegramUrl?: string;
  imageUrl?: string;
  onClickSchedule: MouseEventHandler<HTMLDivElement>;
};

export default memo(function Schedule({
  id,
  name,
  category,
  tier,
  mintingUrl,
  mintingPrice,
  mintingPriceSymbol,
  wikiPageUrl,
  twitterUrl,
  telegramUrl,
  discordUrl,
  imageUrl,
  onClickSchedule,
}: PropsType) {
  return (
    <Wrapper data-id={id} onClick={onClickSchedule}>
      <ScheduleThumbnail name={name} imageUrl={imageUrl || ''} />
      <InnerWrapper>
        <Links
          wikiPageUrl={wikiPageUrl}
          twitterUrl={twitterUrl}
          telegramUrl={telegramUrl}
          discordUrl={discordUrl}
        />
        <ScheduleInfos
          name={name}
          category={category}
          price={mintingPrice}
          symbol={mintingPriceSymbol}
          tier={tier}
        />
        <ScheduleUtilBtns mintPageUrl={mintingUrl} />
      </InnerWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  width: 340px;
  border-radius: 8px;
  background-color: #ffffff;
  overflow: hidden;
  box-shadow: ${styles.shadows.containerShadow};
  cursor: pointer;

  :hover,
  :active {
    filter: brightness(0.7);
  }
`;

const InnerWrapper = styled.div`
  padding: 0 25px 25px 25px;
`;
