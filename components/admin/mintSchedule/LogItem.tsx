import { useMemo, memo } from 'react';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  name: string;
  date: string;
  tier: number;
};

export default memo(function LogItem({ name, date, tier }: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(date), 'time', undefined),
    [date]
  );

  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{time}</td>
        <td>{tier}</td>
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
