import { MouseEventHandler, useCallback, useEffect, useState } from 'react';
import EditLogs from 'containers/user/edits/EditLogs';
import { BasicWrapper, SectionWrapper, PageMoveBtns } from 'components/global';

export type EditLogType = {
  id: number;
  name: string;
  revisionID: string;
  editLength: string;
  editDetailUrl: string;
  timestamp: string;
  approved: boolean;
};

type PropsType = {
  header: string;
};

// @todo total값 역시 데이터로 받아온 것을 쓰기
const total = 482;

export default function Edits({ header }: PropsType) {
  const [editLogs, setEditLogs] = useState<EditLogType[]>([]);
  const [curPage, setCurPage] = useState(1);

  useEffect(
    () =>
      // @todo 초기 데이터 긁어오기. header에 따라 요구 데이터가 달라짐.
      setEditLogs([
        {
          id: 1,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '3050',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: true,
        },
        {
          id: 2,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '-2714',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: false,
        },
        {
          id: 3,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '-3050',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: false,
        },
        {
          id: 4,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '3050',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: true,
        },
        {
          id: 5,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '3050',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: true,
        },
        {
          id: 6,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '3050',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: true,
        },
        {
          id: 7,
          name: 'Bellygom',
          revisionID: '2',
          editLength: '3050',
          editDetailUrl: '',
          timestamp: new Date(Date.now()).toISOString(),
          approved: true,
        },
      ]),
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
    <BasicWrapper>
      <SectionWrapper header={`${header} Edits`} marginBottom="20px">
        <EditLogs editLogs={editLogs} />
        <PageMoveBtns
          curPage={curPage}
          totalPage={Math.floor(total / 10) + 1}
          onClickPageMoveBtn={onClickPageMoveBtn}
          onClickPageNumBtn={onClickPageNumBtn}
        />
      </SectionWrapper>
    </BasicWrapper>
  );
}
