import { useMemo, memo, MouseEventHandler } from 'react';
import convertDate from 'lib/global/convertDate';

type PropsType = {
  id: number;
  name: string;
  mintingTime: string;
  tier: number;
  category: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

export default memo(function LogItem({
  id,
  name,
  mintingTime,
  tier,
  category,
  onClick,
}: PropsType) {
  return (
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{mintingTime}</td>
        <td>{category}</td>
        <td>
          <div style={{ display: 'flex' }}>
            <button type="button" data-id={id} name="delete" onClick={onClick}>
              Delete
            </button>
            <button
              type="button"
              data-id={id}
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
