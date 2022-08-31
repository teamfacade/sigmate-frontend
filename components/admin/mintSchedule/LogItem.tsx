import { useMemo, memo, MouseEventHandler } from 'react';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  id: number;
  name: string;
  date: string;
  tier: number;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function LogItem({
  id,
  name,
  date,
  tier,
  onClick,
}: PropsType) {
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
            <button
              type="button"
              data-id={id}
              data-name={name}
              data-time={date}
              data-tier={tier}
              name="edit"
              onClick={onClick}
            >
              Edit
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
});
