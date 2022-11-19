import { useMemo, memo } from 'react';
import Link from 'next/link';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  name: string;
  documentId: number;
  editorUsername: string;
  editorDisplayName: string;
  timelog: string;
};

export default memo(function LogItem({
  name,
  documentId,
  editorUsername,
  editorDisplayName,
  timelog,
}: PropsType) {
  const time = useMemo(() => convertDate(new Date(timelog), 'time', ' '), []);

  return (
    <tbody>
      <tr>
        <td>
          <Link href={`/main/wiki/${documentId}`}>
            <a>{name}</a>
          </Link>
        </td>
        <td>
          <Link href={`/main/profile/${editorUsername}`}>
            <a>{editorDisplayName || editorUsername}</a>
          </Link>
        </td>
        <td>{time}</td>
      </tr>
    </tbody>
  );
});
