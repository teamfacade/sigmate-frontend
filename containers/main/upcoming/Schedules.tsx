import { memo, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Schedule } from 'components/main/upcoming';

type PropsType = {
  schedules: Minting.ScheduleType[];
  onClickSchedule: MouseEventHandler<HTMLDivElement>;
  AddToCalendar: (id: string, subscribed: boolean) => void;
};

export default memo(function Schedules({
  schedules,
  onClickSchedule,
  AddToCalendar,
}: PropsType) {
  return (
    <GriddyWrapper>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.id}
          id={schedule.id}
          name={schedule.name}
          category={schedule.collection.category?.name || 'TBA'}
          tier={schedule.tier}
          mintingTime={schedule.mintingTime}
          mintingUrl={schedule.mintingUrl}
          mintingPrice={schedule.mintingPrice}
          mintingPriceSymbol={schedule.mintingPriceSymbol}
          wikiPageUrl={`/main/wiki/${schedule.collection.document?.id}`}
          twitterHandle={schedule.collection.twitterHandle}
          telegramUrl={schedule.collection.telegramUrl}
          discordUrl={schedule.collection.discordUrl}
          imageUrl={schedule.collection.imageUrl}
          onClickSchedule={onClickSchedule}
          AddToCalendar={AddToCalendar}
        />
      ))}
    </GriddyWrapper>
  );
});

const GriddyWrapper = styled.div`
  position: relative;
  top: -20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  > div {
    margin: 20px 10px 0 10px;
  }
`;
