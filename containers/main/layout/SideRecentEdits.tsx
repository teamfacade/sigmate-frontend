import { memo } from 'react';
import useSWR, { Fetcher } from 'swr';
import Axios from 'lib/global/axiosInstance';
import styled from 'styled-components';
import styles from 'styles/styleLib';
import { RecentEdit } from 'components/main/Layout';

type PropsType = {
  documentId?: string;
};

const editlogFetcher: Fetcher<Wiki.EditLogType[], string> = async (
  url: string
) => {
  try {
    const { status, data } = await Axios.get(url);
    if (status === 200) {
      return data.data;
    }
    alert(`Error while fetching edit logs: ${status}`);
    return [];
  } catch (e) {
    alert(`Error while fetching edit logs: ${e}`);
    return [];
  }
};

export default memo(function SideRecentEdits({ documentId }: PropsType) {
  const { data: recentEdits = [] } = useSWR(
    `/wiki/activity/edits?${
      documentId ? `document=${documentId}&` : ''
    }limit=5`,
    editlogFetcher
  );

  return (
    <Wrapper>
      <Header>{documentId ? 'Edit Logs' : 'Recent Edits'}</Header>
      <EditsWrapper>
        {recentEdits.map((edit) => {
          return (
            <RecentEdit
              key={edit.id}
              specificDocument={documentId !== undefined}
              documentId={edit.document.id}
              title={edit.document.title}
              timestamp={edit.approvedAt}
              editorUsername={
                edit.createdBy ? edit.createdBy.userName || '' : 'Deleted user'
              }
              editorDisplayName={
                edit.createdBy ? edit.createdBy.primaryProfile.displayName : ''
              }
            />
          );
        })}
      </EditsWrapper>
    </Wrapper>
  );
});

const Wrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: ${styles.shadows.containerShadow};
`;

const Header = styled.h2`
  margin: 0;
  padding-bottom: 20px;
  color: ${styles.colors.headerColor};
  font-size: 16px;
  font-weight: bold;
  font-family: 'Inter', sans-serif;
`;

const EditsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
