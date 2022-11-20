import { SectionWrapper, ModalClose } from 'components/global';
import { MintDetail } from 'components/user/calendar';
import { MouseEventHandler } from 'react';

type PropsType = {
  schedule: Minting.ScheduleType;
  onClickClose: MouseEventHandler<HTMLButtonElement>;
};

export default function ScheduleDetail({ schedule, onClickClose }: PropsType) {
  return (
    <SectionWrapper header={schedule.name} marginBottom="16px">
      <ModalClose onClick={onClickClose} />
      <MintDetail mint={schedule} />
    </SectionWrapper>
  );
}
