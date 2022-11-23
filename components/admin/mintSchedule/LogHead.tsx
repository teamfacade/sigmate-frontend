import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>name</th>
        <th>date (UTC)</th>
        <th>category</th>
        <th>manage</th>
      </tr>
    </thead>
  );
});
