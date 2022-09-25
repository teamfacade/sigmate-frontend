import { useState, useCallback, useRef, MouseEventHandler } from 'react';
import useSWR, { Fetcher } from 'swr';
// eslint-disable-next-line import/no-named-default
import { default as MyCalendar, OnChangeDateCallback } from 'react-calendar';
import { CSSTransition } from 'react-transition-group';
import convertDate from 'lib/global/convertDate';
import { AppDispatch } from 'store/store';
import { AuthRequiredAxios } from 'store/modules/authSlice';
import { useAppDispatch } from 'hooks/reduxStoreHooks';
import CalendarModal from 'containers/user/calendar/CalendarModal';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { ScheduleThumbnail } from 'components/user/calendar';

const fetcher: Fetcher<
  Minting.SchedulesType,
  { dispatch: AppDispatch; url: string }
> = async ({ dispatch, url }) => {
  const action: any = await dispatch(AuthRequiredAxios({ method: 'GET', url }));
  if (action.payload.status === 200) {
    return action.payload.data.data;
  }
  return null;
};

export default function Calendar() {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [calDate, setCalDate] = useState<string>(
    convertDate(new Date(Date.now()), 'MonthDDYYYY', '.')
  );
  const [mintingKey, setMintingKey] = useState<string>('');
  const ModalRef = useRef<HTMLDivElement>(null);

  const { data: schedules } = useSWR(
    {
      url: `/calendar/my/minting?start=${new Date(
        convertDate(new Date(calDate), 'MonthYear', '.')
      ).getTime()}`,
      dispatch,
    },
    fetcher
  );

  const onChange: OnChangeDateCallback = useCallback((value: Date) => {
    setShowModal(true);
    setCalDate(convertDate(value, 'MonthDDYYYY', '.'));
    setMintingKey(value.getTime().toString());
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <>
      <BasicWrapper maxWidth="880px">
        <SectionWrapper header="Calendar" marginBottom="25px">
          <MyCalendar
            onChange={onChange}
            locale="en-US"
            maxDetail="month"
            minDetail="month"
            className="my-calendar"
            // eslint-disable-next-line react/no-unstable-nested-components
            tileContent={({ date }) => {
              const formattedDate = (
                date.getTime() -
                date.getTimezoneOffset() * 60 * 1000
              ).toString();
              if (
                schedules &&
                Object.keys(schedules).find(
                  (utcTimeVal) => utcTimeVal === formattedDate
                )
              ) {
                return (
                  <ScheduleThumbnail
                    length={schedules[formattedDate].length}
                    firstName={schedules[formattedDate][0].name}
                  />
                );
              }
              return <div />;
            }}
          />
        </SectionWrapper>
      </BasicWrapper>
      <CSSTransition
        in={showModal}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <CalendarModal
          date={calDate}
          mintings={schedules ? schedules[mintingKey] : []}
          onClick={onClick}
          ref={ModalRef}
        />
      </CSSTransition>
    </>
  );
}
