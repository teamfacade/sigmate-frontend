import { memo, useState } from 'react';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import { EditLogs } from 'containers/main/recent-edits';
import {
  SectionWrapper,
  PageMoveBtns,
  initialSWRData,
} from 'components/global';
// import { LogSelect } from 'components/main/recent-edits';

const editlogFetcher: Fetcher<
  PagedSWRDataType<Wiki.EditLogType[]>,
  string
> = async (url: string) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      return { data: data.data, total: data.page.total };
    }
    alert(`Error while fetching edit logs: ${status}`);
    return initialSWRData;
  } catch (e) {
    alert(`Error while fetching edit logs: ${e}`);
    return initialSWRData;
  }
};

export default memo(function RecentEdits() {
  // const [selected, setSelected] = useState('All');
  const [curPage, setCurPage] = useState(1);

  const { data: editLogs = initialSWRData } = useSWR(
    `/wiki/activity/edits?page=${curPage}&limit=10`,
    editlogFetcher
  );
  /*
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    setSelected(e.currentTarget.name);
  }, []);
   */

  return (
    <SectionWrapper header="Recent edits">
      <EditLogs editLogs={editLogs.data} />
      <PageMoveBtns
        curPage={curPage}
        totalPage={editLogs.total}
        setCurPage={setCurPage}
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
