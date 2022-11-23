import { memo } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { EditDate } from 'components/main/Layout';
import styles from 'styles/styleLib';

type PropsType = {
  timestamp: string;
  specificDocument: boolean;
  documentId: number;
  title: string;
  editorUsername: string;
  editorDisplayName: string;
};

export default memo(function RecentEdit({
  timestamp,
  specificDocument,
  documentId,
  title,
  editorUsername,
  editorDisplayName,
}: PropsType) {
  return (
    <Edit>
      {specificDocument ? (
        <Link href={`/main/profile/${editorUsername}`}>
          <a>
            <p>{editorDisplayName || editorUsername}</p>
          </a>
        </Link>
      ) : (
        <Link href={`/main/wiki/${documentId}`}>
          <a>
            <p>{title}</p>
          </a>
        </Link>
      )}

      <EditDate timestamp={timestamp} />
    </Edit>
  );
});

const Edit = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 9px 14px 10px;
  background-color: #fafbfc;
  border-radius: 8px;

  :not(:first-child) {
    margin-top: 7px;
  }

  p {
    display: inline-block;
    margin: 0;
    color: ${styles.colors.logColor};
    font-size: 14px;
    font-family: 'Inter', sans-serif;
  }

  a p {
    width: 64px;
    margin-right: 35px;
    color: ${styles.colors.emphColor};
    white-space: pre;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
