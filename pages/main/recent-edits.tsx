import { memo, MouseEventHandler, useCallback, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import { EditLogs } from 'containers/main/recent-edits';
import { SectionWrapper, PageMoveBtns } from 'components/global';
// import { LogSelect } from 'components/main/recent-edits';

let total = 1;

const editlogFetcher: Fetcher<Wiki.EditLogType[], string> = async (
  url: string
) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      total = data.page.total;
      return data.data;
    }
    alert(`Error while fetching edit logs: ${status}`);
    return [];
  } catch (e) {
    alert(`Error while fetching edit logs: ${e}`);
    return [];
  }
};

export default memo(function RecentEdits() {
  // const [selected, setSelected] = useState('All');
  const [curPage, setCurPage] = useState(1);

  const { data: editLogs = [] } = useSWR(
    `/wiki/activity/edits?page=${curPage}&limit=10`,
    editlogFetcher
  );

  /*
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setSelected(e.currentTarget.name);
  }, []);
   */

  const onClickPageNumBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      setCurPage(parseInt(e.currentTarget.value, 10));
    },
    []
  );

  const onClickPageMoveBtn: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      switch (e.currentTarget.name) {
        case 'ToFirst':
          setCurPage(1);
          break;
        case 'Prev':
          setCurPage((cur) => cur - 1);
          break;
        case 'Next':
          setCurPage((cur) => cur + 1);
          break;
        case 'ToLast':
          setCurPage(Math.floor(total / 10) + 1);
          break;
        default:
          break;
      }
    },
    [curPage]
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
      {/*
      <UtilWrapper>
        <LogSelect selected={selected} onClick={onClick} />
      </UtilWrapper>
      */}
    </SectionWrapper>
  );
});

/*
const UtilWrapper = styled.div`
  position: absolute;
  top: -5px;
  right: 0;
`;
*/
