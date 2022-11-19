import type { RefLogType } from 'containers/user/referrals';
import { LogTable } from 'components/global';
import { LogHead, LogItem } from 'components/user/referrals';

type PropsType = {
  refLogs: RefLogType[];
};

export default function ReferralLogs({ refLogs }: PropsType) {
  return (
    <LogTable>
      <LogHead />
      {refLogs.map((refLog) => {
        return (
          <LogItem
            key={refLog.id}
            id={refLog.id}
            username={refLog.userName}
            displayName={refLog.primaryProfile.displayName}
            createdAt={refLog.createdAt}
          />
        );
      })}
    </LogTable>
  );
}
