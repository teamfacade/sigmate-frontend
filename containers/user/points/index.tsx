import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
  useEffect,
} from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import PointsLog from 'containers/user/points/PointsLog';
import TokensLog from 'containers/user/points/TokensLog';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  PageMoveBtns,
} from 'components/global';
import { LogSelect } from 'components/user/points';
import styles from 'styles/styleLib';

export type LogType = {
  timestamp: number;
  source: string;
  amount: string;
};

// @todo total값 역시 데이터로 받아온 것을 쓰기
const total = 482;

export default function Logs() {
  const [selected, setSelected] = useState('Point');
  const [logs, setLogs] = useState<LogType[]>([]);
  const [curPage, setCurPage] = useState(1);

  useEffect(
    () =>
      // @todo 초기 데이터 긁어오기
      setLogs([
        {
          timestamp: 1658389880695,
          source: 'Daily login',
          amount: '10',
        },
        {
          timestamp: 1658389880696,
          source: 'Daily login',
          amount: '10',
        },
        {
          timestamp: 1658389880697,
          source: 'Token buy',
          amount: '-10',
        },
        {
          timestamp: 1658389880698,
          source: 'Daily login',
          amount: '10',
        },
      ]),
    []
  );

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setSelected(e.currentTarget.name);
  }, []);

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 ${selected} logs from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 10
        }th log`
      );
    },
    [selected]
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 ${selected} logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(
            `Fetch 10 ${selected} logs from ${(curPage - 1 - 1) * 10}th log`
          );
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 ${selected} logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 10 ${selected} logs from ((total / 10) * 10)th log`);
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [selected, curPage]
  );

  const onClickConvert: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      // eslint-disable-next-line no-alert
      alert('Coming soon');
    }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Search!');
  }, []);

  return (
    <BasicWrapper>
      <SectionWrapper header={`${selected} Log`} marginBottom="25px">
        <CSSTransition
          in={selected === 'Point'}
          timeout={300}
          unmountOnExit
          classNames="fade"
        >
          <PointsLog logs={logs} />
        </CSSTransition>
        <CSSTransition
          in={selected !== 'Point'}
          timeout={300}
          unmountOnExit
          classNames="fade"
        >
          <TokensLog />
        </CSSTransition>
        <UtilsWrapper>
          <div style={{ width: '180px' }}>
            <Search
              transparentBg
              placeholder="Search Sources..."
              onSubmit={onSubmit}
            />
          </div>
          <LogSelect selected={selected} onClick={onClick} />
        </UtilsWrapper>
      </SectionWrapper>
      {selected === 'Point' && (
        <OtherUtilsWrapper>
          <PageMoveBtns
            curPage={curPage}
            totalPage={Math.floor(total / 10) + 1}
            onClickPageMoveBtn={onClickPageMoveBtn}
            onClickPageNumBtn={onClickPageNumBtn}
          />
          <ConvertBtn onClick={onClickConvert}>
            <p>{`Convert ${selected} to ${
              selected === 'Point' ? 'Tokens' : 'Points'
            }`}</p>
          </ConvertBtn>
        </OtherUtilsWrapper>
      )}
    </BasicWrapper>
  );
}

const UtilsWrapper = styled.div`
  display: flex;
  position: absolute;
  top: -5px;
  right: 0;
`;

const OtherUtilsWrapper = styled.div`
  position: relative;
`;

const ConvertBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 34px;
  border: none;
  border-radius: 8px;
  background-color: ${styles.colors.emphColor};
  color: #ffffff;
  font-size: 15px;
  font-family: 'Inter', sans-serif;
  cursor: pointer;

  p {
    position: relative;
    top: -1px;
    margin: 0;
  }
`;
