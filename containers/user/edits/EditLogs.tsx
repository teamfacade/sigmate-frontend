import type { EditLogType } from 'containers/user/edits/Edits';
import { LogTable } from 'components/global';
import { LogHead, LogItem } from 'components/user/edits';

type PropsType = {
  editLogs: EditLogType[];
};

export default function EditLogs({ editLogs }: PropsType) {
  return (
    <LogTable gap="40px">
      <LogHead />
      {editLogs.map((editLog) => {
        return (
          <LogItem
            key={editLog.id}
            name={editLog.name}
            revisionID={editLog.revisionID}
            editLength={editLog.editLength}
            editDetailUrl={editLog.editDetailUrl}
            timestamp={editLog.timestamp}
            approved={editLog.approved}
          />
        );
      })}
    </LogTable>
  );
}
