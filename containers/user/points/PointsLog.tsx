import { memo } from 'react';
import styled from 'styled-components';
import type { LogType } from 'containers/user/points';
import { LogHead, LogItem } from 'components/user/points';
import styles from 'styles/styleLib';

type PropsType = {
  logs: LogType[];
};

export default function PointsLog({ logs }: PropsType) {
  return (
    <Table>
      <LogHead />
      {logs.map((log) => {
        return (
          <LogItem
            key={log.timestamp}
            timestamp={log.timestamp}
            source={log.source}
            amount={log.amount}
          />
        );
      })}
    </Table>
  );
}

const Table = memo(styled.table`
  border-spacing: 0 10px;

  thead {
    font-size: 15px;
    font-weight: bold;

    th {
      padding: 0 200px 0 0;
      color: ${styles.colors.dimTextColor};
      font-size: 15px;
      text-align: start;

      :first-child {
        padding-left: 40px;
      }
    }
  }

  td {
    padding: 10px 200px 10px 0;
    color: ${styles.colors.logColor};
    font-size: 15px;
    text-align: start;
    white-space: nowrap;

    :first-child {
      padding-left: 40px;
    }
  }
`);
