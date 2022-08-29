import { useMemo, memo } from 'react';
import Link from 'next/link';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  name: string;
  editor: string;
  timestamp: number;
};

export default memo(function LogItem({ name, editor, timestamp }: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'time', undefined),
    [timestamp]
  );

  return (
    <tbody>
      <tr>
        <td>
          <Link href={`/main/wiki/${name}`}>
            <a>{name}</a>
          </Link>
        </td>
        <td>
          <Link href={`/main/profile/${editor}`}>
            <a>{editor}</a>
          </Link>
        </td>
        <td>{time}</td>
      </tr>
    </tbody>
  );
});