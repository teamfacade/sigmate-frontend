import { useMemo, memo } from 'react';
import Link from 'next/link';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  name: string;
  level: string;
  status: string;
  walletID: string;
  signupDate: string;
};

export default memo(function LogItem({
  name,
  level,
  status,
  walletID,
  signupDate,
}: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(signupDate), 'time', undefined),
    [signupDate]
  );

  return (
    <tbody>
      <tr>
        <td>
          <Link href={`/main/profile/${name}`}>
            <a>{name}</a>
          </Link>
        </td>
        <td>{level}</td>
        <td>{status}</td>
        <td>{walletID}</td>
        <td>{time}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <button type="button">Delete</button>
            <button type="button">Edit</button>
          </div>
        </td>
      </tr>
    </tbody>
  );
});
