import { memo } from 'react';
import { LogTable } from 'components/global';
import { LogHead, LogItem } from 'components/main/recent-edits';

type PropsType = {
  editLogs: Wiki.EditLogType[];
};

export default memo(function EditLogs({ editLogs }: PropsType) {
  return (
    <LogTable gap="24px">
      <LogHead />
      {editLogs.map((edit) => {
        return (
          <LogItem
            key={edit.id}
            name={edit.document.title}
            documentId={edit.document.id}
            editorUsername={edit.createdBy.userName}
            editorDisplayName={edit.createdBy.primaryProfile.displayName}
            timelog={edit.approvedAt}
          />
        );
      })}
    </LogTable>
  );
});
