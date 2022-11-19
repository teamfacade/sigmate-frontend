import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>id</th>
        <th>Username</th>
        <th>time (UTC)</th>
      </tr>
    </thead>
  );
});
