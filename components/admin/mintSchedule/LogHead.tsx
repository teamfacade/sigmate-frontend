import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>name</th>
        <th>date</th>
        <th>tier</th>
        <th>manage</th>
      </tr>
    </thead>
  );
});
