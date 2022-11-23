/*
import {
  FormEventHandler,
  MouseEventHandler,
  useCallback,
  useState,
  // useEffect,
} from 'react';

import { CSSTransition } from 'react-transition-group';
import PointsLog from 'containers/user/points/PointsLog';
import TokensLog from 'containers/user/points/TokensLog';
import {
  BasicWrapper,
  SectionWrapper,
  //  Search,
  // PageMoveBtns,
} from 'components/global';
// import { LogSelect } from 'components/user/points';
import styled from 'styled-components';
import styles from 'styles/styleLib';
 */

export type LogType = {
  timestamp: number;
  source: string;
  amount: string;
};

export default function Logs() {
  /*
  const [selected, setSelected] = useState('Point');
  const [logs, setLogs] = useState<LogType[]>(ExLogs);

  const [curPage, setCurPage] = useState(1);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setSelected(e.currentTarget.name);
  }, []);

  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('Search!');
  }, []);

  const onClickConvert: MouseEventHandler<HTMLButtonElement> =
      useCallback(() => {
        // eslint-disable-next-line no-alert
        alert('Coming soon');
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
            <Search white placeholder="Search..." onSubmit={onSubmit} />
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
*/
  return <div>Preparing</div>;
}

/*
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
  padding: 0 10px;
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
*/
