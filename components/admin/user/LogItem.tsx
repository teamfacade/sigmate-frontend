import { useMemo, memo, useState } from 'react';
import Link from 'next/link';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  name: string;
  level: string;
  status: string;
  walletID: string;
  signupDate: string;
};

const statusOptions = ['0', '1', '3', '7', '30', '60', '90', '365', 'INF'];

export default memo(function LogItem({
  name,
  level,
  status,
  walletID,
  signupDate,
}: PropsType) {
  const [edit, setEdit] = useState(false);
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
        <td>
          {edit ? (
            <select name="status" value={status}>
              {statusOptions.map((current) => (
                <option key={current} value={current}>
                  {`ban ${current} days`}
                </option>
              ))}
            </select>
          ) : (
            'status'
          )}
        </td>
        <td>{walletID}</td>
        <td>{time}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <button type="button">Delete</button>
            <button
              type="button"
              onClick={() => setEdit((current) => !current)}
            >
              {edit ? 'Save' : 'Edit'}
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
});
