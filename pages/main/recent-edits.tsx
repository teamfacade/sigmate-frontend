import {
  memo,
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { EditLogs } from 'containers/main/recent-edits';
import { SectionWrapper, PageMoveBtns } from 'components/global';
import { LogSelect } from 'components/main/recent-edits';

const total = 482;
const ExEditLogs: EditType[] = [
  {
    name: 'Superwalk Genesis',
    editor: 'Limeahn',
    timestamp: 1660719274403,
  },
  {
    name: 'The Meta Kongz',
    editor: 'WKSeo',
    timestamp: 1660719274404,
  },
  {
    name: 'Klaycity District',
    editor: 'jmyung',
    timestamp: 1660719274405,
  },
  {
    name: 'Metatoy Dragonz',
    editor: 'Sigmate',
    timestamp: 1660719274406,
  },
  {
    name: 'G.rilla OFFICIAL',
    editor: 'Limeahn',
    timestamp: 1660719274407,
  },
  {
    name: 'Syltare',
    editor: 'Limeahn',
    timestamp: 1660719274408,
  },
  {
    name: 'KLAYDICE GENESIS',
    editor: 'Limeahn',
    timestamp: 1660719274409,
  },
  {
    name: 'THE SNKRZ NFT',
    editor: 'jmyung',
    timestamp: 1660719274400,
  },
  {
    name: 'Sunmiya Club',
    editor: 'mung3477',
    timestamp: 1660719274401,
  },
  {
    name: 'Puuvilla Society',
    editor: 'Sigmate',
    timestamp: 1660719274402,
  },
];

export default memo(function RecentEdits() {
  const [selected, setSelected] = useState('All');
  const [curPage, setCurPage] = useState(1);
  const [editLogs, setEditLogs] = useState<EditType[]>([]);

  useEffect(() => {
    setEditLogs(ExEditLogs);
  }, []);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setSelected(e.currentTarget.name);
  }, []);

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
      // eslint-disable-next-line no-alert
      alert(
        `Fetch 10 ${selected} edit logs from ${
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
          alert(`Fetch 10 ${selected} edit logs from 0th log`);
          setCurPage(1);
          break;
        case 'Prev':
          // eslint-disable-next-line no-alert
          alert(
            `Fetch 10 ${selected} edit logs from ${
              (curPage - 1 - 1) * 10
            }th log`
          );
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          // eslint-disable-next-line
          alert(`Fetch 10 ${selected} edit logs from ${curPage * 10}th log`);
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          // eslint-disable-next-line
          alert(
            `Fetch 10 ${selected} edit logs from ((total / 10) * 10)th log`
          );
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [selected, curPage]
  );

  return (
    <SectionWrapper header="Recent edits">
      <EditLogs editLogs={editLogs} />
      <PageMoveBtns
        curPage={curPage}
        totalPage={total}
        onClickPageMoveBtn={onClickPageMoveBtn}
        onClickPageNumBtn={onClickPageNumBtn}
      />
      <UtilWrapper>
        <LogSelect selected={selected} onClick={onClick} />
      </UtilWrapper>
    </SectionWrapper>
  );
});

const UtilWrapper = styled.div`
  position: absolute;
  top: -5px;
  right: 0;
`;
