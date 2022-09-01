import { useMemo, memo, MouseEventHandler } from 'react';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  id: number;
  name: string;
  date: string;
  tier: number;
  category: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function LogItem({
  id,
  name,
  date,
  tier,
  category,
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
        <td>{category}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <button type="button">Delete</button>
            <button
              type="button"
              data-id={id}
              data-name={name}
              data-time={date}
              data-tier={tier}
              data-category={category}
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
