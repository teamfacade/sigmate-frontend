import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Schedule } from 'components/main/upcoming';

type PropsType = {
  schedules: Minting.ScheduleType[];
  onClickSchedule: MouseEventHandler<HTMLDivElement>;
};

export default memo(function Schedules({
  schedules,
  onClickSchedule,
}: PropsType) {
  return (
    <GriddyWrapper>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.id}
          id={schedule.id}
          name={schedule.name}
          category={schedule.category || 'PFP'}
          tier={schedule.tier}
          mintingUrl={schedule.mintingUrl}
          mintingPrice={schedule.mintingPrice}
          mintingPriceSymbol={schedule.mintingPriceSymbol}
          wikiPageUrl={`/main/wiki/${schedule.name}`}
          twitterHandle={schedule.collection.twitterHandle}
          telegramUrl={schedule.collection.telegramUrl}
          discordUrl={schedule.collection.discordUrl}
          imageUrl={schedule.collection.imageUrl}
          onClickSchedule={onClickSchedule}
        />
      ))}
    </GriddyWrapper>
  );
});

const GriddyWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    margin: 20px 10px 0 10px;
  }
`;
