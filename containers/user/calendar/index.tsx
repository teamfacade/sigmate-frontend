import {
  useState,
  useCallback,
  useEffect,
  useRef,
  MouseEventHandler,
} from 'react';
// eslint-disable-next-line import/no-named-default
import { default as MyCalendar, OnChangeDateCallback } from 'react-calendar';
import { CSSTransition } from 'react-transition-group';
import convertDate from 'hooks/convertDate';
import CalendarModal from 'containers/user/calendar/CalendarModal';
import { BasicWrapper, SectionWrapper } from 'components/global';
import { ScheduleThumbnail } from 'components/user/calendar';

type ScheduleType = { [index: string]: MintingType[] };

const ExSchedules: ScheduleType = {
  '08.25.2022': [
    {
      name: '#56382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768852,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#34382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768853,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#19',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768854,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#2382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768855,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#655',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768856,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#56383',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768857,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#56384',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768858,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
      discordUrl: 'https://www.tradingview.com',
    },
  ],
  '08.02.2022': [
    {
      name: '#56382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768852,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      discordUrl: 'https://www.tradingview.com',
    },
    {
      name: '#34382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768853,
      price: '10ETH',
      twitterUrl: 'https://www.twitter.com/elonmusk',
      telegramUrl: 'https://www.naver.com',
    },
  ],
  '08.15.2022': [
    {
      name: '#56382',
      publisher: 'Neon District Statistics One Team',
      thumbnailURL: '',
      date: 1660722768852,
      price: '10ETH',
    },
  ],
};

export default function Calendar() {
  const [schedules, setSchedules] = useState<ScheduleType>({});
  const [showModal, setShowModal] = useState(false);
  const [calDate, setCalDate] = useState('');
  const [mintingKey, setMintingKey] = useState('');
  const ModalRef = useRef<HTMLDivElement>(null);

  const onChange: OnChangeDateCallback = useCallback((value: Date) => {
    setShowModal(true);
    setCalDate(convertDate(value, 'MonthDDYYYY', '.'));
    setMintingKey(convertDate(value, 'key', '.'));
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setShowModal(false);
  }, []);

  // @todo 해당 월 민팅 일정 데이터 가져오기 -> CalendarModal에 해당 날짜 민팅 일정만 넣어주기
  useEffect(() => {
    setSchedules(ExSchedules);
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
              const formattedDate = convertDate(date, 'key', '.');
              if (
                Object.keys(schedules).find((when) => when === formattedDate)
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
          mintings={schedules[mintingKey]}
          onClick={onClick}
          ref={ModalRef}
        />
      </CSSTransition>
    </>
  );
}
