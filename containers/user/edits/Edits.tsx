import { useEffect, useState } from 'react';
import EditLogs from 'containers/user/edits/EditLogs';
import { BasicWrapper, SectionWrapper } from 'components/global';

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

export default function Edits({ header }: PropsType) {
  const [editLogs, setEditLogs] = useState<EditLogType[]>([]);

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

  return (
    <BasicWrapper>
      <SectionWrapper header={`${header} Edits`} marginBottom="20px">
        <EditLogs editLogs={editLogs} />
        {/*
        <PageMoveBtns
          curPage={curPage}
          totalPage={Math.floor(total / 10) + 1}
          onClickPageMoveBtn={onClickPageMoveBtn}
          onClickPageNumBtn={onClickPageNumBtn}
        />
        */}
      </SectionWrapper>
    </BasicWrapper>
  );
}
