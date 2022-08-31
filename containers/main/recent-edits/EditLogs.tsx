import { memo } from 'react';
import { LogTable } from 'components/global';
import { LogHead, LogItem } from 'components/main/recent-edits';

type PropsType = {
  editLogs: EditType[];
};

export default memo(function EditLogs({ editLogs }: PropsType) {
  return (
    <LogTable gap="130px">
      <LogHead />
      {editLogs.map((edit) => {
        return (
          <LogItem
            key={edit.timestamp}
            name={edit.name}
            editor={edit.editor}
            timestamp={edit.timestamp}
          />
        );
      })}
    </LogTable>
  );
});
