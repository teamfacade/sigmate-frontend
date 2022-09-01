import { useMemo, memo } from 'react';
import Link from 'next/link';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  name: string;
  views: string;
  editedUsers: string;
  lastEdit: string;
};

export default memo(function LogItem({
  name,
  views,
  editedUsers,
  lastEdit,
}: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(lastEdit), 'time', undefined),
    [lastEdit]
  );

  return (
    <tbody>
      <tr>
        <td>
          <Link href={`/main/wiki/${name}`}>
            <a>{name}</a>
          </Link>
        </td>
        <td>{views}</td>
        <td>{editedUsers}</td>
        <td>{time}</td>
        <td>
          <button type="button">Delete</button>
        </td>
      </tr>
    </tbody>
  );
});
