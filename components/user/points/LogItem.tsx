import { useMemo, memo } from 'react';
import styled from 'styled-components';
import convertDate from 'hooks/convertDate';
import styles from 'styles/styleLib';

type PropsType = {
  timestamp: number;
  source: string;
  amount: string;
};

export default memo(function LogItem({ timestamp, source, amount }: PropsType) {
  const time = useMemo(
    () => convertDate(new Date(timestamp), 'log', undefined),
    [timestamp]
  );

  return (
    <tbody>
      <tr>
        <td>{time}</td>
        <td>{source}</td>
        <ColorfulTd
          positive={parseInt(amount, 10) > 0}
        >{`${amount} points`}</ColorfulTd>
      </tr>
    </tbody>
  );
});

const ColorfulTd = memo(styled.td<{ positive: boolean }>`
  color: ${({ positive }) =>
    positive ? styles.colors.emphColor : '#FF276B'} !important;
`);
