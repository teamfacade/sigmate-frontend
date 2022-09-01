import { memo } from 'react';

export default memo(function LogHead() {
  return (
    <thead>
      <tr>
        <th>Name</th>
        <th>Views</th>
        <th>Edited users</th>
        <th>Last edit</th>
        <th>manage</th>
      </tr>
    </thead>
  );
});
