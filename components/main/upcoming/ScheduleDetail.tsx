import { SectionWrapper } from 'components/global';
import { MintDetail } from 'components/user/calendar';

type PropsType = {
  schedule: Minting.ScheduleType;
};

export default function ScheduleDetail({ schedule }: PropsType) {
  return (
    <SectionWrapper header={schedule.name} marginBottom="16px">
      <MintDetail mint={schedule} />
    </SectionWrapper>
  );
}
