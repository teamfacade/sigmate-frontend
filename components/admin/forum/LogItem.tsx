import { useMemo, memo } from 'react';
import convertDate from 'lib/global/convertDate';
import Link from 'next/link';

type PropsType = {
  id: number;
  title: string;
  category: string;
  author: string;
  tags: string[];
  date: string;
  comments: number;
};

export default memo(function LogItem({
  id,
  title,
  category,
  author,
  tags,
  date,
  comments,
}: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(date), 'time', undefined),
    [date]
  );

  return (
    <tbody>
      <tr>
        <td>{title}</td>
        <td>{category}</td>
        <td>
          <Link href={`/main/profile/${author}`}>
            <a>{author}</a>
          </Link>
        </td>
        <td>
          <div style={{ overflow: 'auto', maxWidth: '8vw' }}>
            <p>{tags.toString()}</p>
          </div>
        </td>
        <td>{time}</td>
        <td>{comments}</td>
        <td>
          <Link href={`/main/forum/${category}/${id}`}>
            <a>
              <button type="button">Go to article</button>
            </a>
          </Link>
        </td>
      </tr>
    </tbody>
  );
});
