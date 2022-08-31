import { MouseEventHandler, useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import {
  BasicWrapper,
  SectionWrapper,
  Search,
  LogTable,
  PageMoveBtns,
  Modal,
} from 'components/global';
import { LogHead, LogItem, EditSchedule } from 'components/admin/mintSchedule';
import convertDate from 'lib/global/convertDate';
import { BlueBtnStyle } from 'styles/styleLib';

type ModalDataType = {
  type: 'New' | 'Edit';
  data?: Admin.MintScheduleType;
};

const tiers = Array.from({ length: 5 }, (_, i) => i + 1);

const EXSchedule: Admin.MintScheduleType = {
  id: 1,
  name: 'Bellygom Whitelist',
  tier: 2,
  date: convertDate(new Date(Date.now()), 'dateInput', '-'),
};
const ExSchedules = [
  EXSchedule,
  { ...EXSchedule, id: 2 },
  { ...EXSchedule, id: 3 },
  { ...EXSchedule, id: 4 },
  { ...EXSchedule, id: 5 },
  { ...EXSchedule, id: 6 },
  { ...EXSchedule, id: 7 },
  { ...EXSchedule, id: 8 },
  { ...EXSchedule, id: 9 },
  { ...EXSchedule, id: 0 },
];
const total = 4242;

export default function MintingSchedule() {
  const [showModal, setShowModal] = useState<ModalDataType>({ type: 'New' });
  const [curPage, setCurPage] = useState(1);
  const ModalRef = useRef<HTMLDivElement>(null);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    const { name, dataset } = e.currentTarget;

    switch (name) {
      case 'new':
        setShowModal({
          type: 'New',
          data: {
            id: 0,
            name: '',
            tier: 0,
            date: convertDate(new Date(Date.now()), 'dateInput', '-'),
          },
        });
        break;
      case 'edit':
        setShowModal({
          type: 'Edit',
          data: {
            id: Number.parseInt(dataset?.id || '0', 10),
            name: dataset?.name || '',
            tier: Number.parseInt(dataset?.tier || '0', 10),
            date:
              dataset?.date ||
              convertDate(new Date(Date.now()), 'dateInput', '-'),
          },
        });
        break;
      default:
        break;
    }
  }, []);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = useCallback(
    () => setShowModal({ type: 'New' }),
    []
  );

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 referral logs from ${
          (parseInt(e.currentTarget.value, 10) - 1) * 10
        }th log`
      );
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(`Fetch 10 referral logs from ${(curPage - 1 - 1) * 10}th log`);
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(`Fetch 10 referral logs from ((total / 10) * 10)th log`);
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
  );

  return (
    <>
      <Wrapper>
        <BasicWrapper>
          <SectionWrapper header="Minting schedule">
            <div>
              <input type="date" />
              <span>Tier</span>
              <select name="tier">
                {tiers.map((tier) => (
                  <option key={tier} value={tier}>
                    {tier}
                  </option>
                ))}
              </select>
            </div>
            <Search />
            <CreateNewBtn name="new" onClick={onClick}>
              Add new
            </CreateNewBtn>
          </SectionWrapper>
        </BasicWrapper>
        <BasicWrapper>
          <SectionWrapper header="Search result">
            <LogTable gap="8vw">
              <LogHead />
              {ExSchedules.map((schedule) => (
                <LogItem
                  key={schedule.id}
                  id={schedule.id}
                  name={schedule.name}
                  date={schedule.date}
                  tier={schedule.tier}
                  onClick={onClick}
                />
              ))}
            </LogTable>
            <PageMoveBtns
              onClickPageNumBtn={onClickPageNumBtn}
              onClickPageMoveBtn={onClickPageMoveBtn}
              totalPage={total}
              curPage={curPage}
            />
          </SectionWrapper>
        </BasicWrapper>
      </Wrapper>
      <CSSTransition
        in={!!showModal.data}
        timeout={300}
        classNames="show-modal"
        unmountOnExit
        nodeRef={ModalRef}
      >
        <Modal onMouseDown={onMouseDown} ref={ModalRef}>
          <EditSchedule
            type={showModal.type}
            id={showModal.data?.id}
            name={showModal.data?.name}
            date={showModal.data?.date}
            tier={showModal.data?.tier}
          />
        </Modal>
      </CSSTransition>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  div + div {
    margin-top: 20px;
  }
`;

const CreateNewBtn = styled.button`
  ${BlueBtnStyle};
  position: absolute;
  top: -10px;
  right: 0;
`;
