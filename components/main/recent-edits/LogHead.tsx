import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Editor</th>
        <th>Edited Time</th>
      </tr>
    </thead>
  );
});
