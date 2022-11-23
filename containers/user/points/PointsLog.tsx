import type { LogType } from 'containers/user/points';
import { LogTable } from 'components/global';
import { LogHead, LogItem } from 'components/user/points';

type PropsType = {
  logs: LogType[];
};

export default function PointsLog({ logs }: PropsType) {
  return (
    <LogTable gap="11.5vw">
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
    </LogTable>
  );
}
