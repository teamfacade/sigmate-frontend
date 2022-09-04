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
    <Wrapper>
      {schedules.map((schedule) => (
        <Schedule
          key={schedule.id}
          id={schedule.id}
          name={schedule.name}
          category={schedule.category}
          tier={schedule.tier}
          mintingUrl={schedule.mintingUrl}
          mintingPrice={schedule.mintingPrice}
          mintingPriceSymbol={schedule.mintingPriceSymbol}
          wikiPageUrl={`/main/wiki/${schedule.name}`}
          twitterUrl={schedule.collectionInfo.twitterUrl}
          telegramUrl={schedule.collectionInfo.telegramUrl}
          discordUrl={schedule.collectionInfo.discordUrl}
          imageUrl={schedule.collectionInfo.imageUrl}
          onClickSchedule={onClickSchedule}
        />
      ))}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: grid;
  gap: 18px;
  // grid-template-columns: 1fr 1fr 1fr;
  grid-template-columns: repeat(auto-fill, 340px);
  grid-auto-rows: 370px;
`;
