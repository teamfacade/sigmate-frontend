// eslint-disable-next-line import/no-named-default
import { default as MyCalendar } from 'react-calendar';
import { BasicWrapper, SectionWrapper } from 'components/global';

export default function Calendar() {
  return (
    <BasicWrapper maxWidth="880px">
      <SectionWrapper header="Calendar" marginBottom="25px">
        <MyCalendar locale="en-US" maxDetail="month" minDetail="month" />
      </SectionWrapper>
    </BasicWrapper>
  );
}
