import { memo, MouseEventHandler, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ScheduleThumbnail,
  Links,
  ScheduleInfos,
  ScheduleUtilBtns,
} from 'components/main/upcoming';
import { getTimeDiff } from 'lib/global/calcTimeDiff';
import styles from 'styles/styleLib';

type PropsType = {
  id: number;
  name: string;
  category: string;
  tier: number;
  mintingTime: Date;
  mintingUrl?: string;
  mintingPrice?: string;
  mintingPriceSymbol?: string; // ETH/KLAYTN/SOL/Matic
  wikiPageUrl: string;
  twitterHandle?: string;
  discordUrl?: string;
  websiteUrl?: string;
  telegramUrl?: string;
  imageUrl?: string;
  onClickSchedule: MouseEventHandler<HTMLDivElement>;
  AddToCalendar: (id: string, subscribed: boolean) => void;
};

let intervalId: ReturnType<typeof setInterval>;

export default memo(function Schedule({
  id,
  name,
  category,
  tier,
  mintingTime,
  mintingUrl,
  mintingPrice,
  mintingPriceSymbol,
  wikiPageUrl,
  twitterHandle,
  telegramUrl,
  discordUrl,
  imageUrl,
  onClickSchedule,
  AddToCalendar,
}: PropsType) {
  const [timeDiff, setTimeDiff] = useState<string>('');

  useEffect(() => {
    const diff = getTimeDiff(mintingTime);
    if (diff !== '0h 0m 0s')
      intervalId = setInterval(
        () => setTimeDiff(getTimeDiff(mintingTime)),
        1000
      );
    return () => clearInterval(intervalId);
  }, [mintingTime, intervalId]);
  return (
    <Wrapper data-id={id} onClick={onClickSchedule}>
      <TimeLeft>
        <p>{timeDiff}</p>
      </TimeLeft>
      <ScheduleThumbnail name={name} imageUrl={imageUrl || ''} />
      <InnerWrapper>
        <Links
          wikiPageUrl={wikiPageUrl}
          twitterUrl={`https://www.twitter.com/${twitterHandle}`}
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
        <ScheduleUtilBtns
          id={id}
          mintPageUrl={mintingUrl}
          AddToCalendar={AddToCalendar}
        />
      </InnerWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;
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

const TimeLeft = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 7px 16px;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 4px;
  backdrop-filter: blur(4px);
  z-index: 1;

  p {
    margin: 0;
    color: #595959;
    font-size: 12px;
    font-weight: 700;
    line-height: 150%;
  }
`;

const InnerWrapper = styled.div`
  padding: 0 25px 25px 25px;
`;
