import { memo } from 'react';
import styled from 'styled-components';

type PropsType = {
  article: string;
  editor: string;
  timestamp: number;
};

export default memo(function TableRow({
  article,
  editor,
  timestamp,
}: PropsType) {
  const date = new Date(timestamp);

  return (
    <tr>
      <td>{article}</td>
      <td>{editor}</td>
      <td>{`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}</td>
    </tr>
  );
});
