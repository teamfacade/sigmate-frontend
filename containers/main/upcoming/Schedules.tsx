import { memo } from 'react';
import styled from 'styled-components';
import { Schedule } from 'components/main/upcoming';

type ScheduleType = {
  id: number;
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

type PropsType = {
  schedules: ScheduleType[];
};

export default memo(function Schedules({ schedules }: PropsType) {
  return (
    <Wrapper>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.id}
          event={schedule.event}
          collection={schedule.collection}
          price={schedule.price}
          symbol={schedule.symbol}
          tier={schedule.tier}
          wikiPageUrl={schedule.wikiPageUrl}
          twitterUrl={schedule.twitterUrl}
          telegramUrl={schedule.telegramUrl}
          discordUrl={schedule.discordUrl}
          mintPageUrl={schedule.mintPageUrl}
          imageUrl={schedule.imageUrl}
        />
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: grid;
  gap: 18px;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: 370px;
`;
