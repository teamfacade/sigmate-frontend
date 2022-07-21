import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>Date</th>
        <th>Task</th>
        <th>Entity</th>
        <th>Point</th>
      </tr>
    </thead>
  );
});
